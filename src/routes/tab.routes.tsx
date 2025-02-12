
import CustomTabBar from "../components/CustomTabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Pokedex from "../screens/Pokedex";
import Favorites from "../screens/Favorites";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
    // id={undefined}
      initialRouteName="Pokedex"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Pokedex" component={Pokedex} />

      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
}
