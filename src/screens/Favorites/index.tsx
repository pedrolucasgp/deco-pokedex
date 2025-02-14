import React from "react";
import { Text, View } from "react-native";
import { style } from "./styles";
import pokeballLoading from "../../assets/pokeballLoading.json";
import LottieView from "lottie-react-native";

export default function Favorites() {
  return (
    <View style={style.container}>
      <Text style={style.title}>Fav Screen</Text>
      <View style={style.loadingWrapper}>
        <LottieView
          style={style.animation}
          source={pokeballLoading}
          autoPlay
          loop
        />
        <Text style={style.loadingText}>Desenvolvendo...</Text>
      </View>
    </View>
  );
}
