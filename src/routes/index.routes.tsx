import Home from "../screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import TabRoutes from "./tab.routes";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
    //   id={undefined}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TabRoutes" component={TabRoutes} />
    </Stack.Navigator>
  );
}
