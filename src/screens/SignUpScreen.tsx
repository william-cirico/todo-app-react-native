import { StyleSheet, View } from "react-native";
import Lottie from "lottie-react-native";
import { theme } from "../themes";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";

export function SignUpScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Lottie
                    style={styles.logo}
                    resizeMode="cover"
                    source={require("../assets/register.json")}
                    autoPlay
                    loop={false}
                    colorFilters={[
                        { keypath: "User Outlines 2", color: theme.colors.primary },
                    ]}
                />
            </View>
            <View style={styles.form}>
                <TextInput label={"Nome"} value={name} onChangeText={setName} mode="outlined" />
                <TextInput label={"E-mail"} value={email} onChangeText={setEmail} mode="outlined" />
                <TextInput label={"Senha"} value={password} onChangeText={setPassword} mode="outlined" />
                <TextInput label={"Confirmar senha"} value={confirmPassword} onChangeText={setConfirmPassword} mode="outlined" />
                <Button style={styles.button} icon={"plus"} mode="contained">Cadastrar</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    logo: {
        height: 100
    },
    logoContainer: {
        alignItems: "center",
        paddingTop: 30
    },
    button: {
        marginVertical: 10
    },
    form: {
        flex: 1,
        justifyContent: "center"
    }
});