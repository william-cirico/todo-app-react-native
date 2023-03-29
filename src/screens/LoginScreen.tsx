import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Lottie from "lottie-react-native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { GuestStackParamList } from "../routes/GuestRoutes";

type LoginScreenProps = NativeStackScreenProps<GuestStackParamList, "Login">;

export function LoginScreen({ navigation }: LoginScreenProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const theme = useTheme();
    const { login } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Lottie
                    resizeMode="cover"
                    style={styles.logo}
                    source={require("../assets/logo.json")}
                    autoPlay
                    loop={false}
                    colorFilters={[
                        { keypath: "Sheet", color: theme.colors.primary }
                    ]}
                />
            </View>
            <View style={styles.form}>
                <TextInput
                    right={<TextInput.Icon icon="email" />}
                    label={"E-mail"}
                    value={username}
                    mode={"outlined"}
                    onChangeText={setUsername}
                    keyboardType="email-address"
                />
                <TextInput
                    right={<TextInput.Icon
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        icon={isPasswordVisible ? "eye" : "eye-off"}
                    />
                    }
                    secureTextEntry={!isPasswordVisible}
                    label={"Senha"}
                    value={password}
                    mode={"outlined"}
                    onChangeText={setPassword}
                />
                <Button
                    style={styles.button}
                    icon={"login-variant"}
                    onPress={() => login({username, password})}
                    mode="contained"
                >Entrar</Button>
                <Button
                    style={{ backgroundColor: theme.colors.secondary }}
                    icon={"plus"}
                    onPress={() => navigation.push("SignUp", { email: username })}
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