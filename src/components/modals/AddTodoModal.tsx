import { IconButton, Modal, ModalProps, Portal, Provider, TextInput } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    onDismiss: VoidFunction;
    visible: boolean;
}

export function AddTodoModal(props: Props) {
    return <Portal>
        <Modal {...props} contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Adicionar tarefa</Text>
                <IconButton icon="close" onPress={props.onDismiss} />
            </View>
            <TextInput mode="outlined" label="Nome" />
            
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