import { createDrawerNavigator } from "@react-navigation/drawer";
import { SideMenu } from "../components/layouts/SideMenu";
import { HomeScreen } from "../screens/HomeScreen";

const Drawer = createDrawerNavigator();

export function ProtectedRoutes() {
    return (
        <Drawer.Navigator 
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
            drawerContent={props => <SideMenu {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
    );
}