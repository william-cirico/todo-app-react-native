import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import { SignUpScreen } from "../screens/SignUpScreen";

export type GuestStackParamList = {
    Login: undefined;
    SignUp: { email: string };
}

const GuestStack = createNativeStackNavigator<GuestStackParamList>();

export function GuestRoutes() {
    return (
        <GuestStack.Navigator 
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
        >
            <GuestStack.Screen name="Login" component={LoginScreen} />
            <GuestStack.Screen name="SignUp" component={SignUpScreen} />
        </GuestStack.Navigator>
    );
}