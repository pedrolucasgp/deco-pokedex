import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { PlatformPressable } from "@react-navigation/elements";
import { style } from "./styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Audio } from "expo-av";
export default function CustomTabBar({ state, descriptors, navigation }) {
  const [audioSelect, setAudioSelect] = useState(null);

  const icons = {
    Pokedex: "format-list-bulleted",
    Favorites: "favorite",
  };

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/select.mp3")
    );
    setAudioSelect(sound);
  }

  useEffect(() => {
    loadSound();
  }, []);

  return (
    <View style={style.tabGroup}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = async () => {
          await audioSelect.replayAsync();
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
        return (
          <PlatformPressable
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
          >
            <MaterialIcons
              name={icons[route.name]}
              size={30}
              color={isFocused ? "#9597F4" : "gray"}
            />
          </PlatformPressable>
        );
      })}
    </View>
  );
}
