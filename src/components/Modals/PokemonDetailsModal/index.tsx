import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { style } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTypeColor, Pokemon } from "../../../@types/pokemon";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

interface PokemonDetailsModalProps {
  visibleDetails: boolean;
  onClose: () => void;
  selectedPokemon: Pokemon;
}

const PokemonDetailsModal = ({
  visibleDetails,
  onClose,
  selectedPokemon,
}: PokemonDetailsModalProps) => {
  const [existingFavs, setExistingFavs] = useState([]);

  const sendFavsToStorage = async (favPokemons: Pokemon[]) => {
    await AsyncStorage.setItem("favPokemons", JSON.stringify(favPokemons));
  };

  const handleFavorite = async () => {
    const isFavorited = existingFavs.some(
      (fav) => fav.id == selectedPokemon.id
    );

    if (isFavorited == false) {
      const updatedFavs = [...existingFavs, selectedPokemon];

      await sendFavsToStorage(updatedFavs);

      Alert.alert(
        selectedPokemon?.name.charAt(0).toUpperCase() +
          selectedPokemon?.name.slice(1) +
          " adicionado aos favoritos."
      );

      setExistingFavs(updatedFavs);
      return;
    }

    Alert.alert(
      selectedPokemon?.name.charAt(0).toUpperCase() +
        selectedPokemon?.name.slice(1) +
        " já é um de seus favoritos."
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visibleDetails}>
      <View style={style.modalWrapper}>
        <View style={style.modalView}>
          <View style={style.modalButtonWrapper}>
            <TouchableOpacity style={style.modalButton} onPress={onClose}>
              <MaterialCommunityIcons name="close" size={24} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity
              style={style.modalButton}
              onPress={handleFavorite}
            >
              <MaterialCommunityIcons
                name="heart"
                size={24}
                style={
                  existingFavs.some((fav) => fav.id == selectedPokemon.id)
                    ? { color: "red" }
                    : { color: "gray" }
                }
              />
            </TouchableOpacity>
          </View>
          <Text style={style.modalTitle}>
            {selectedPokemon?.name.charAt(0).toUpperCase() +
              selectedPokemon?.name.slice(1)}
          </Text>
          <Text style={style.modalText}>#{selectedPokemon?.id}</Text>

          <View style={style.pokemonTypesWrapper}>
            <Text
              style={[
                style.pokemonTypes,
                {
                  backgroundColor: getTypeColor(selectedPokemon?.types[0]),
                },
              ]}
            >
              {selectedPokemon?.types[0].charAt(0).toUpperCase() +
                selectedPokemon?.types[0].slice(1)}
            </Text>
            {selectedPokemon?.types[1] != null && (
              <Text
                style={[
                  style.pokemonTypes,
                  {
                    backgroundColor: getTypeColor(selectedPokemon?.types[1]),
                  },
                ]}
              >
                {selectedPokemon?.types[1].charAt(0).toUpperCase() +
                  selectedPokemon?.types[1].slice(1)}
              </Text>
            )}
          </View>
          <LinearGradient
            colors={[
              getTypeColor(selectedPokemon?.types[0]),
              selectedPokemon?.types[1] != null
                ? getTypeColor(selectedPokemon?.types[1])
                : getTypeColor(selectedPokemon?.types[0]),
            ]}
            locations={[0.45, 0.9]}
            style={style.pokemonModal}
          >
            <Image
              source={{ uri: selectedPokemon?.image }}
              style={style.image}
            />
          </LinearGradient>

          <View style={style.pokemonSpecies}>
            <Text style={style.pokemonDetailsTitle}>Espécie</Text>
            <Text style={style.pokemonDetailsText}>
              {selectedPokemon?.species}
            </Text>
          </View>
          <Text style={style.pokemonDetailsTitle}>Linha de Evolução</Text>
          {selectedPokemon && selectedPokemon.evolutionLine ? (
            selectedPokemon.evolutionLine.length > 1 ? (
              <View style={style.evolutionContainer}>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={selectedPokemon.evolutionLine}
                  keyExtractor={(evo) => evo.name}
                  renderItem={({ item }) => (
                    <LinearGradient
                      colors={[
                        getTypeColor(item.types[0]),
                        item.types[1] != null
                          ? getTypeColor(item.types[1])
                          : getTypeColor(item.types[0]),
                      ]}
                      locations={[0.45, 0.9]}
                      style={style.evolutionCard}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={style.evolutionImage}
                      />
                      <Text style={style.evolutionText}>
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </Text>
                    </LinearGradient>
                  )}
                />
              </View>
            ) : (
              <View>
                <Text style={style.pokemonDetailsText}>
                  Este Pokémon não tem evoluções.
                </Text>
              </View>
            )
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default PokemonDetailsModal;
