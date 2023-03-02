import { ScrollView, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { TodoList } from "../components/lists/TodoList";
import { theme } from "../themes";
import { Todo } from "../types/todo";

export function HomeScreen() {
    const todos: Todo[] = [
        { id: "1", name: "Estudar React", doneAt: "", dueDate: "2023-02-28T20:00:00" },
        { id: "2", name: "Estudar React Native", doneAt: "2023-02-28T20:00:00", dueDate: "2023-02-29T20:00:00" },
        { id: "3", name: "Estudar Golang", doneAt: "", dueDate: "2023-02-06T20:00:00" },
    ];

    return (
        <View>
            <View>
                <Text>Lista de Tarefas</Text>
                <IconButton 
                    icon="logout-variant"
                    size={40}
                    containerColor={theme.colors.primaryContainer}
                    iconColor={theme.colors.primary}
                />
            </View>
            <TodoList todos={todos} />
            {/* <TodoForm /> */}
        </View>
    );
}