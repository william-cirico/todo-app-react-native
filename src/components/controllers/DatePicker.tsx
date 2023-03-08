import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";

type Props = {
    value: Date;
    onChange: React.Dispatch<React.SetStateAction<Date>>;
}

export function DatePicker({ value, onChange }: Props) {
    const [mode, setMode] = useState<"date" | "time" | null>(null);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        onChange(currentDate);

        if (mode === "date") {
            showTimepicker();
        } else if (mode === "time") {
            setMode(null);
        }
    };

    const showMode = (currentMode) => {
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
                <Text>{dayjs(value).format("DD/MM - HH:mm")}</Text>
            </TouchableOpacity>
            {!!mode && (
                <DateTimePicker
                    value={value}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChangeDate}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    dateViewer: {
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
});