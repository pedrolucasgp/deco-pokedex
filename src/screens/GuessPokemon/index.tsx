import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { style } from "./styles";
import { fetchRandomPokemon } from "../../services/api";
import { Pokemon } from "../../@types/pokemon";
import AntDesign from "@expo/vector-icons/AntDesign";
import LottieView from "lottie-react-native";
import fireworks from "../../assets/fireworks.json";
import { Audio } from "expo-av";

export default function GuessPokemon() {
  const [guessPokemon, setGuessPokemon] = useState<Pokemon | null>(null);
  const [randomNumber, setRandomNumber] = useState<number>(0);

  const [inputValue, setInputValue] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const [wrongMessage, setWrongMessage] = useState("");

  const [audioSelect, setAudioSelect] = useState(null);

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/caughtPokemon.mp3")
    );
    setAudioSelect(sound);
  }

  useEffect(() => {
    loadSound();
  }, []);

  const generateRandomNumber = () => {
    const min = 1;
    const max = 1025;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;

    setRandomNumber(random);
    setIsCorrect(false);
    setWrongMessage("");
  };

  const handleSubmit = async () => {
    if (inputValue.trim()) {
      setInputValue("");

      if (guessPokemon?.name == inputValue.toLowerCase()) {
        setIsCorrect(true);
        setWrongMessage("");
        await audioSelect.replayAsync();
      } else {
        setWrongMessage("Errado! Tente novamente");
      }
    } else {
      alert("Por favor, insira um valor!");
    }
  };

  useEffect(() => {
    const loadPokemon = async () => {
      const data = await fetchRandomPokemon(randomNumber);
      setGuessPokemon(data);
    };

    if (randomNumber > 0) loadPokemon();
  }, [randomNumber]);
  return (
    <View style={style.container}>
      <Text style={style.title}>Quem é esse Pokémon?</Text>
      {isCorrect && (
        <LottieView
          style={[style.animation, { position: "absolute", zIndex: 1 }]}
          source={fireworks}
          autoPlay
          loop={true}
        />
      )}
      {guessPokemon == null ? (
        <>
          <Text style={style.description}>
            Prove seu conhecimento sobre o mundo Pokémon! {`\n`} Clique no botão
            para começar a jogar!
          </Text>

          <TouchableOpacity style={style.button} onPress={generateRandomNumber}>
            <Text style={style.buttonText}>Começar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={style.imageWrapper}>
            {guessPokemon?.name == userGuess && (
              <>
                <Text style={style.pokemonName}>
                  {guessPokemon?.name.charAt(0).toUpperCase() +
                    guessPokemon?.name.slice(1)}
                </Text>
              </>
            )}

            <Image
              source={{ uri: guessPokemon?.image }}
              style={[
                style.image,
                { tintColor: isCorrect ? undefined : "black" },
              ]}
              blurRadius={isCorrect ? 0 : 20}
            />
          </View>

          <View style={style.inputWrapper}>
            <TextInput
              placeholder="Digite seu palpite. Ex. Gengar..."
              value={inputValue}
              onChangeText={setInputValue}
              style={style.inputText}
            />
            <TouchableOpacity
              style={style.reloadButton}
              onPress={generateRandomNumber}
            >
              <AntDesign name="reload1" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={style.button} onPress={handleSubmit}>
            <Text style={style.buttonText}>Enviar</Text>
          </TouchableOpacity>
          {isCorrect == false && (
            <Text style={style.wrongMessage}>{wrongMessage}</Text>
          )}
          {/* <Text>{guessPokemon?.name}</Text> */}
        </>
      )}
    </View>
  );
}
