import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
} from "react-native";
import { style } from "./styles";
import pokeballLoading from "../../assets/pokeballLoading.json";
import psyduckAnimation from "../../assets/psyduckAnimation.json";
import LottieView from "lottie-react-native";
import { getTypeColor, Pokemon } from "../../@types/pokemon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { BlurView } from "expo-blur";

export default function Favorites() {
  const [favPokemons, setFavPokemons] = useState<Pokemon[]>([]);

  const [loading, setLoading] = useState(true);

  const [visible, setVisible] = useState(false);

  const getFavPokemons = async () => {
    const storageContent = await getFavsFromStorage();

    setFavPokemons(JSON.parse(storageContent));
    setLoading(false);
  };

  const getFavsFromStorage = async () => {
    const result = await AsyncStorage.getItem("favPokemons");
    return result;
  };

  function clearFavs() {
    if (favPokemons == null) {
      Alert.alert("Você não tem nenhum Pokémon favorito.");
      return;
    }

    AsyncStorage.setItem("favPokemons", "");
    setFavPokemons([]);
    setVisible(false);
  }

  useFocusEffect(
    useCallback(() => {
      getFavPokemons();
    }, [favPokemons])
  );

  return (
    <View style={style.container}>
      {visible && <BlurView style={style.blur} />}
      <View style={style.header}>
        <Text style={style.title}>Favoritos</Text>
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}
        >
          <MaterialCommunityIcons name="broom" size={24} color="#d11507" />
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={style.loadingWrapper}>
          <LottieView
            style={style.animation}
            source={pokeballLoading}
            autoPlay
            loop
          />
          <Text style={style.loadingText}>Carregando...</Text>
        </View>
      )}

      {favPokemons == null && (
        <View style={style.loadingWrapper}>
          <LottieView
            style={style.animation}
            source={psyduckAnimation}
            autoPlay
            loop
          />
          <Text style={style.loadingText}>
            Você não tem nenhum Pokémon adicionado como favorito!
          </Text>
        </View>
      )}

      <View>
        <Modal animationType="fade" transparent={true} visible={visible}>
          <View style={style.centeredModal}>
            <View style={style.modalView}>
              <Text style={style.modalTitle}>
                {" "}
                Excluir todos os favoritos?{" "}
              </Text>
              <Text style={style.modalText}>
                {" "}
                Isso não poderá ser desfeito. Confirma?{" "}
              </Text>
              <View style={style.modalButtonGroup}>
                <TouchableOpacity style={style.modalButton} onPress={clearFavs}>
                  <Text style={{ color: "#9597F4", fontWeight: "bold" }}>
                    Sim
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={style.modalButton}
                  onPress={() => setVisible(!visible)}
                >
                  <Text style={{ color: "#d11507", fontWeight: "bold" }}>
                    Não
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={style.cardWrapper}>
        <FlatList
          data={favPokemons}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
              <View
                style={[
                  style.cardContent,
                  { backgroundColor: getTypeColor(item.types[0]) },
                ]}
              >
                <Text style={style.pokemonNumber}>#{item.id}</Text>
                <Text style={style.pokemonName}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Text>
                <Image source={{ uri: item.image }} style={style.image} />
              </View>
          )}
        />
      </View>
    </View>
  );
}
