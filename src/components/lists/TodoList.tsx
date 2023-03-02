import { ScrollView, Text } from "react-native";
import { Todo } from "../../types/todo";
import Animated from "react-native-reanimated";
import { Checkbox, IconButton } from "react-native-paper";

type Props = {
    todos: Todo[];
}

function TodoItem({ todo }: { todo: Todo }) {
    return (
        <Animated.View>
            <Checkbox status="checked" />
            <Text>{todo.name}</Text>
            <IconButton icon="delete" />
        </Animated.View>
    );
}

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