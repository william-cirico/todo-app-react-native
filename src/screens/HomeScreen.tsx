import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, IconButton, Provider, useTheme } from "react-native-paper";
import { TodoList } from "../components/lists/TodoList";
import { AddTodoModal } from "../components/modals/AddTodoModal";
import { useTodo } from "../contexts/TodoContext";

export function HomeScreen() {
    const { todos } = useTodo();
    const [showAddTodoModal, setShowAddTodoModal] = useState(false);
    const theme = useTheme();

    return (
        <Provider>
            <AddTodoModal visible={showAddTodoModal} onDismiss={() => setShowAddTodoModal(false)} />
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Lista de Tarefas</Text>
                    <IconButton
                        icon="logout-variant"
                        size={32}
                        containerColor={theme.colors.primaryContainer}
                        iconColor={theme.colors.primary}
                    />
                </View>
                <TodoList todos={todos} />
                <Button onPress={() => setShowAddTodoModal(true)} icon={"plus"} mode="contained">Adicionar tarefa</Button>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
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