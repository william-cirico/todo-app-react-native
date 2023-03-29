import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import Lottie from "lottie-react-native";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button, HelperText, TextInput, useTheme } from "react-native-paper";
import * as yup from "yup";
import { GuestStackParamList } from "../routes/GuestRoutes";
import { User } from "../types/user";
import auth from "@react-native-firebase/auth";

const validationSchema = yup.object().shape({
    email: yup.string().email("o e-mail precisa ser válido").required("o e-mail é obrigatório"),
    password: yup.string().required("a senha é obrigatória").min(8, "a senha precisa ter no mínimo 8 caracteres"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "as senhas não são iguais")
});

type SignUpScreenProps = NativeStackScreenProps<GuestStackParamList, "SignUp">;

export function SignUpScreen({ navigation, route }: SignUpScreenProps) {
    const initialValues = {
        email: route.params.email,
        password: "",
        confirmPassword: ""
    };

    const theme = useTheme();

    // const { mutate: createUser } = useMutation({
    //     mutationFn: (user: User) => createUser(user),
    //     onSuccess: () => Alert.alert("Sucesso!", "Usuário criado!"),
    //     onError: () => Alert.alert("Falha", "Ocorreu uma falha ao criar o usuário")
    // });

    function createUser({ email, password }: User) {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => Alert.alert("Sucesso!", "O usuário foi criado com sucesso!"))
            .catch(error => {
                if (error.code === "auth/email-already-in-use") {
                    Alert.alert("Falha", "Já existe um usuário cadastrado com esse e-mail")
                }

                if (error.code === "auth/invalid-email") {
                    Alert.alert("Falha", "E-mail é inválido")
                }
            })
    }

    return (
        <ScrollView style={styles.container}>
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
            <Formik
                initialValues={initialValues}
                onSubmit={values => createUser(values)}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleBlur, isValid, handleSubmit, errors, values, touched }) => (
                    <View style={styles.form}>
                        {/* <TextInput 
                            label={"Nome"} 
                            value={values.name} 
                            onChangeText={handleChange("name")} 
                            onBlur={handleBlur("name")}
                            error={touched.name && !!errors.name}
                            right={(touched.name && !errors.name) && <TextInput.Icon icon="check-circle" iconColor="green" />}
                            mode="outlined" 
                        /> */}
                        {/* <HelperText type="error" visible={touched.name && !!errors.name}>{errors.name}</HelperText> */}
                        <TextInput 
                            label={"E-mail"} 
                            value={values.email} 
                            onChangeText={handleChange("email")} 
                            onBlur={handleBlur("email")}
                            error={touched.email && !!errors.email}
                            right={(touched.email && !errors.email) && <TextInput.Icon icon="check-circle" iconColor="green" />}
                            mode="outlined" 
                        />
                        <HelperText type="error" visible={touched.email && !!errors.email}>{errors.email}</HelperText>
                        <TextInput 
                            secureTextEntry
                            label={"Senha"} 
                            value={values.password} 
                            onChangeText={handleChange("password")} 
                            onBlur={handleBlur("password")}
                            error={touched.password && !!errors.password}
                            right={(touched.password && !errors.password) && <TextInput.Icon icon="check-circle" iconColor="green" />}
                            mode="outlined" 
                        />
                        <HelperText type="error" visible={touched.password && !!errors.password}>{errors.password}</HelperText>
                        <TextInput 
                            secureTextEntry
                            label={"Confirmar senha"} 
                            value={values.confirmPassword} 
                            onChangeText={handleChange("confirmPassword")}
                            onBlur={handleBlur("confirmPassword")}
                            error={touched.confirmPassword && !!errors.confirmPassword} 
                            right={(touched.confirmPassword && !errors.confirmPassword) && <TextInput.Icon icon="check-circle" iconColor="green" />}
                            mode="outlined" 
                        />
                        <HelperText type="error" visible={touched.confirmPassword && !!errors.confirmPassword}>{errors.confirmPassword}</HelperText>
                        <Button onPress={() => handleSubmit()} disabled={!isValid} style={styles.button} icon={"plus"} mode="contained">Cadastrar</Button>
                        <Button onPress={() => navigation.goBack()}>Já possui uma conta? Faça o login.</Button>
                    </View>
                )}
            </Formik>
        </ScrollView>
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