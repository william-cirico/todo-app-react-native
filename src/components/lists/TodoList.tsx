import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Todo } from "../../types/todo";
import Animated from "react-native-reanimated";
import { Checkbox, IconButton } from "react-native-paper";
import dayjs from "dayjs";
import { theme } from "../../themes";

type Props = {
    todos: Todo[];
}

function TodoItem({ todo }: { todo: Todo }) {
    const dueDate = dayjs(todo.dueDate).format("DD/MM/YYYY HH:mm");

    return (
        <Animated.View style={stylesTodoItem.container}>
            <Checkbox status="checked" />
            <View style={stylesTodoItem.textContainer}>
                <Text style={stylesTodoItem.todoName}>{todo.name}</Text>
                <Text>{dueDate}</Text>
            </View>
            <IconButton icon="delete" iconColor="#fff" containerColor={theme.colors.primary} />
        </Animated.View>
    );
}

const stylesTodoItem = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 70,
        backgroundColor: theme.colors.inversePrimary,
        marginVertical: 3,
        borderRadius: 8,
        alignItems: "center",
        padding: 10
    },
    textContainer: {
        flex: 1,
        paddingLeft: 5
    },
    todoName: {
        fontSize: 20,
        fontWeight: "bold"
    }
});

export function TodoList({ todos }: Props) {
    return (
        <ScrollView>
            {
                todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} />
                ))
            }
        </ScrollView>
    );
}