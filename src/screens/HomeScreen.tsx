import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, IconButton, Modal, Portal, Provider } from "react-native-paper";
import { TodoList } from "../components/lists/TodoList";
import { AddTodoModal } from "../components/modals/AddTodoModal";
import { useTodo } from "../contexts/TodoContext";
import { theme } from "../themes";
import { Todo } from "../types/todo";

export function HomeScreen() {
    // const todos: Todo[] = [
    //     { id: "2", name: "Estudar React Native", doneAt: "2023-02-28T20:00:00", dueDate: "2023-02-29T20:00:00" },
    //     { id: "3", name: "Estudar Golang", doneAt: "", dueDate: "2023-02-06T20:00:00" },
    // ];

    const { todos } = useTodo();
    const [showAddTodoModal, setShowAddTodoModal] = useState(false);

    return (
        <Provider>
            <AddTodoModal visible={showAddTodoModal} onDismiss={() => setShowAddTodoModal(false)} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Lista de Tarefas</Text>
                    <IconButton
                        icon="logout-variant"
                        size={40}
                        containerColor={theme.colors.primaryContainer}
                        iconColor={theme.colors.primary}
                    />
                </View>
                <TodoList todos={todos} />
                <Button onPress={() => setShowAddTodoModal(true)} icon={"plus"} mode="contained">Adicionar tarefa</Button>
                {/* <TodoForm /> */}
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        padding: 16,
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
    },
    headerText: {
        fontSize: 36
    },
});