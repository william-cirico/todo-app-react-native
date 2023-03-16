import { DrawerContentComponentProps, DrawerItem } from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Switch, useTheme } from "react-native-paper";
import { useTheme as useThemeContext } from "../../contexts/ThemeContext";
import { darkTheme } from "../../themes";

export function SideMenu(props: DrawerContentComponentProps) {
    const theme = useTheme();

    const { theme: currentTheme, toggleTheme } = useThemeContext();

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
                    <Switch value={currentTheme === darkTheme} onValueChange={toggleTheme} />
                </View>}
                onPress={toggleTheme}
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