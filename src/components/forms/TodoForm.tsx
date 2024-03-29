import dayjs from "dayjs";
import { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { DatePicker } from "../controllers/DatePicker";
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

type NewTodo = {
    name: string;
    dueDate: FirebaseFirestoreTypes.Timestamp;
}

type Props = {
    onSubmit: (values: NewTodo) => void;
};

export function TodoForm({ onSubmit }: Props) {
    const [name, setName] = useState("");
    const [dueDate, setDueDate] = useState(new Date());

    return (
        <>
            <TextInput value={name} onChangeText={setName} mode="outlined" label="Nome" />
            <DatePicker value={dueDate} onChange={setDueDate} />
            <Button 
                mode="contained" 
                icon={"content-save"}
                onPress={() => onSubmit({ name, dueDate: firestore.Timestamp.fromDate(dueDate) })}
            >Salvar</Button>
        </>
    );
}