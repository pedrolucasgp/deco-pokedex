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
import { Audio } from "expo-av";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

export default function Favorites() {
  const [favPokemons, setFavPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const [loading, setLoading] = useState(true);

  const [visibleClearAll, setVisibleClearAll] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);

  const [audioSelect, setAudioSelect] = useState(null);

  const getFavPokemons = async () => {
    const storageContent = await getFavsFromStorage();

    setFavPokemons(JSON.parse(storageContent));
    setLoading(false);
  };

  const getFavsFromStorage = async () => {
    const result = await AsyncStorage.getItem("favPokemons");
    return result;
  };

  const saveFavListOnStorage = async (favPokemons: Pokemon[]) => {
    await AsyncStorage.setItem("favPokemons", JSON.stringify(favPokemons));
  }

  async function clearFavs() {
    if (favPokemons == null) {
      Alert.alert("Você não tem nenhum Pokémon favorito.");
      return;
    }

    AsyncStorage.setItem("favPokemons", "");
    await audioSelect.replayAsync();
    setFavPokemons([]);
    setVisibleClearAll(false);
  }

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/remove.mp3")
    );
    setAudioSelect(sound);
  }

  async function handleDelete(){
    if(!selectedPokemon) return;

    const newFavList = favPokemons.filter((favPokemon) => favPokemon.id != selectedPokemon.id);
    setFavPokemons(newFavList);
    saveFavListOnStorage(newFavList);
    await audioSelect.replayAsync();
    setVisibleDelete(false)
  }

  const renderRightActions = (item: Pokemon) => (
    <View style={style.deleteButton}>
        <TouchableOpacity
          onPress={() => {
            setSelectedPokemon(item);
            setVisibleDelete(true);
          }
          }
        >
          <MaterialCommunityIcons name="trash-can" size={30} color="white" />
        </TouchableOpacity>

    </View>
  );

  useEffect(() => {
    loadSound();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getFavPokemons();
    }, [])
  );

  return (
    <View style={style.container}>
      {visibleClearAll && <BlurView style={style.blur} />}
      {visibleDelete && <BlurView style={style.blur} />}
      <View style={style.header}>
        <Text style={style.title}>Favoritos</Text>
        <TouchableOpacity
          onPress={() => {
            setVisibleClearAll(true);
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

      {favPokemons.length == 0 && (
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
        {/* Modal do clear ALL */}
        <Modal animationType="fade" transparent={true} visible={visibleClearAll}>
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
                  onPress={() => setVisibleClearAll(!visibleClearAll)}
                >
                  <Text style={{ color: "#d11507", fontWeight: "bold" }}>
                    Não
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal delete */}
        <Modal animationType="fade" transparent={true} visible={visibleDelete}>
          <View style={style.centeredModal}>
            <View style={style.modalView}>
              <Text style={style.modalTitle}>
                {" "}
                Deseja remover {selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}?{" "}
              </Text>
              <Text style={style.modalText}>
                {" "}
                Isso não poderá ser desfeito. Confirma?{" "}
              </Text>
              <View style={style.modalButtonGroup}>
                <TouchableOpacity style={style.modalButton} onPress={handleDelete}>
                  <Text style={{ color: "#9597F4", fontWeight: "bold" }}>
                    Sim
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={style.modalButton}
                  onPress={() => setVisibleDelete(!visibleDelete)}
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
            <Swipeable renderRightActions={() => renderRightActions(item)}>
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
            </Swipeable>
          )}
        />
      </View>
    </View>
  );
}
