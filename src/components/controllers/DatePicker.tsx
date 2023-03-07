import { useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

export function DatePicker() {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState<"date" | "time">("date");
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);

        if (mode === "date") {
            showTimepicker();
        }
    };

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(false);
        }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    }

    return (
        <>
            <TouchableOpacity style={styles.dateViewer} onPress={showDatepicker}>
                <Text style={styles.dateViewerText}>{dayjs(date).format("D [de] MMMM - HH:mm")}</Text>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    dateViewer: {
        backgroundColor: "#f5f5f5",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#666",
        borderRadius: 4,
        marginVertical: 20
    },
    dateViewerText: {
        color: "#fff"
    }
});