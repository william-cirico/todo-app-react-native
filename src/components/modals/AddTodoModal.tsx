import { StyleSheet, Text, View } from "react-native";
import { IconButton, Modal, Portal } from "react-native-paper";
import { useTodo } from "../../contexts/TodoContext";
import { TodoForm } from "../forms/TodoForm";

type Props = {
    onDismiss: VoidFunction;
    visible: boolean;
}

export function AddTodoModal(props: Props) {
    const { addTodo } = useTodo();

    return <Portal>
        <Modal {...props} contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Adicionar tarefa</Text>
                <IconButton icon="close" onPress={props.onDismiss} />
            </View>
            <TodoForm onSubmit={({ name, dueDate}) => {
                addTodo(name, dueDate);
                props.onDismiss();
            }} />
        </Modal>
    </Portal>
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginHorizontal: 16,
        backgroundColor: "#fff"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 22,
        fontWeight: "bold"
    }
});