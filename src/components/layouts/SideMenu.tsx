import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Switch, useTheme } from "react-native-paper";
import { DrawerItem } from "@react-navigation/drawer";

export function SideMenu(props: DrawerContentComponentProps) {
    const theme = useTheme();

    return (
        <View>
            <View style={[styles.imageContainer, { backgroundColor: theme.colors.primaryContainer }]}>
                <Avatar.Image
                    source={{ uri: "https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg" }}
                    size={200}
                />
                <Text style={styles.nameText}>William Círico</Text>
            </View>
            <DrawerItem
                label={() => <View style={styles.menuItem}>
                    <Text>Tema escuro</Text>
                    <Switch />
                </View>}
                onPress={() => { }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: "center",
        paddingVertical: 20,
    },
    nameText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    menuItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});