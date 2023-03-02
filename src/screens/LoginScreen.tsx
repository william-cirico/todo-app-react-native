import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Lottie from "lottie-react-native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { GuestStackParamList } from "../routes/GuestRoutes";
import { theme } from "../themes";

type LoginScreenProps = NativeStackScreenProps<GuestStackParamList, "Login">;

export function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Lottie resizeMode="cover" style={styles.logo} source={require("../assets/logo.json")} autoPlay loop={false} />
            </View>
            <View style={styles.form}>
                <TextInput
                    right={<TextInput.Icon icon="email" />}
                    label={"E-mail"}
                    value={email}
                    mode={"outlined"}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    right={<TextInput.Icon
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        icon={isPasswordVisible ? "eye" : "eye-off"}
                    />
                    }
                    secureTextEntry={isPasswordVisible}
                    label={"Senha"}
                    value={password}
                    mode={"outlined"}
                    onChangeText={setPassword}
                />
                <Button style={styles.button} icon={"login-variant"} onPress={() => { }} mode="contained">Entrar</Button>
                <Button 
                    style={{ backgroundColor: theme.colors.secondary }} 
                    icon={"plus"} 
                    onPress={() => navigation.push("SignUp", { email })} 
                    mode="contained"
                >Cadastrar-se</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    form: {
        flex: 1
    },
    logo: {
        height: 120,
    },
    button: {
        marginVertical: 10,
    },
    logoContainer: {
        alignItems: "center",
        height: 180,
        marginTop: 50
    }
});