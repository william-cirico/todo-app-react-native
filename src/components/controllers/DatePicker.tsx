import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export function DatePicker() {
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [date, setDate] = useState(new Date());

    return (
        <>
            <TouchableOpacity onPress={() => setShowDate(true)}>
                <Text>Abrir DatePicker</Text>
            </TouchableOpacity>
            {
                showDate &&
                <DateTimePicker
                    onChange={() => setShowTime(true)}
                    mode="date"
                    display="default"
                    value={new Date()}
                />
            }
        </>
    );
}