import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { style } from "./styles";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import LottieView from 'lottie-react-native'
import bulbassaurAnimation from '../../assets/bulbassaurAnimation.json'
import { Audio } from "expo-av";


export default function Home() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [audioSelect, setAudioSelect] = useState(null);

  async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/select.mp3")
      );
  
      setAudioSelect(sound);
    }
  
    loadSound();

   async function redirect() {
    await audioSelect.replayAsync();
    
    navigation.navigate("TabRoutes");
  }

  return (
    <View style={style.container}>
        <LottieView
          style={style.animation}
          source={bulbassaurAnimation}
          autoPlay
          loop
        />

      <View style={style.titleWrapper}>
        <Text style={style.title}>Deco Pokedéx</Text>
        <MaterialCommunityIcons
          style={{ marginLeft: 10 }}
          name="pokeball"
          size={40}
          color="red"
        />
      </View>
      <Text style={style.text}>
        Explore todos os Pokémons e comece sua jornada!
      </Text>

      <TouchableOpacity style={style.button} onPress={() => redirect()}>
        <Text style={style.buttonText}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
}