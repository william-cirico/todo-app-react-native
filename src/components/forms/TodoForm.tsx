import { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { DatePicker } from "../controllers/DatePicker";

type NewTodo = {
    name: string;
    dueDate: string;
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
                onPress={() => onSubmit({ name, dueDate: dueDate.toISOString() })}
            >Salvar</Button>
        </>
    );
}