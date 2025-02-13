import React from "react";
import { Text, View } from "react-native";
import { style } from "./styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Favorites() {
  return (
    <View style={style.container}>
      <Text style={style.title}>Fav Screen</Text>
      <MaterialCommunityIcons
        style={{}}
        name="pokeball"
        size={100}
        color="red"
      />
    </View>
  );
}
