import dayjs from "dayjs";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import Animated, { Layout, LightSpeedInLeft, LightSpeedOutRight } from "react-native-reanimated";
import { useTodo } from "../../contexts/TodoContext";
import { Todo } from "../../types/todo";
import { Checkbox } from "../controllers/Checkbox";

type Props = {
    todos: Todo[];
}

function TodoItem({ todo }: { todo: Todo }) {
    const dueDate = dayjs(todo.dueDate).format("DD/MM/YYYY HH:mm");
    const doneAt = dayjs(todo.doneAt).format("DD/MM/YYYY HH:mm");
    const theme = useTheme();

    const backgroundColor = !!todo.doneAt
        ? theme.colors.primaryContainer
        : theme.colors.inversePrimary;

    const { removeTodo, toggleTodo } = useTodo();

    return (
        <Animated.View
            style={[stylesTodoItem.container, { backgroundColor }]}
            entering={LightSpeedInLeft}
            exiting={LightSpeedOutRight}
            layout={Layout.springify()}
        >
            <Checkbox checked={!!todo.doneAt} onCheck={() => toggleTodo(todo.id)} />
            <View style={stylesTodoItem.textContainer}>
                <Text style={[
                    stylesTodoItem.todoName,
                    { textDecorationLine: !!todo.doneAt ? "line-through" : "none" }
                ]}>{todo.name}</Text>
                <Text>
                    {
                        !!todo.doneAt
                            ? `Feito em: ${doneAt}`
                            : dueDate
                    }
                </Text>
            </View>
            <IconButton onPress={() => removeTodo(todo.id)} icon="delete" iconColor="#fff" containerColor={theme.colors.primary} />
        </Animated.View>
    );
}

const stylesTodoItem = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 70,        
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