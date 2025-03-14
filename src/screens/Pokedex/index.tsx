import React, { useEffect, useState } from "react";
import { style } from "./styles";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { fetchPokemons, fetchPokemonsData } from "../../services/api";
import { Pokemon, getTypeColor } from "../../@types/pokemon";
import pokeballLoading from "../../assets/pokeballLoading.json";
import LottieView from "lottie-react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import PokemonDetailsModal from "../../components/Modals/PokemonDetailsModal";
import { Audio } from "expo-av";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchValue, setSearchValue] = useState("");
  const [list, setList] = useState(pokemons);

  const [visible, setVisible] = useState(false);

  const [audioSelect, setAudioSelect] = useState(null);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const closeModal = () => setVisible(false);

  async function handleModal(item) {
    setVisible(true);
    setSelectedPokemon(item);
    await audioSelect.replayAsync();
  }

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/openDetails.mp3")
    );
    setAudioSelect(sound);
  }

  useEffect(() => {
    loadSound();
  }, []);

  useEffect(() => {
    const loadPokemons = async () => {
      const data = await fetchPokemons();
      const evolveData = await fetchPokemonsData(data);

      setPokemons(evolveData);
      setList(evolveData);
      setLoading(false);
    };

    loadPokemons();
  }, []);

  useEffect(() => {
    if (!searchValue) {
      setList(pokemons);
    } else {
      setList(
        pokemons.filter(
          (item) =>
            item.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
            item.id == searchValue
        )
      );
    }
  }, [searchValue]);

  return (
    <View style={style.container}>
      {visible && <BlurView style={style.blur} />}
      <View style={style.searchBar}>
        <MaterialCommunityIcons name="text-search" size={24} color="gray" />
        <TextInput
          placeholder="Busque um Pokémon. Ex. Mew ou 151..."
          value={searchValue}
          onChangeText={setSearchValue}
          style={{ flex: 1 }}
        />
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
      <PokemonDetailsModal
        visible={visible}
        onClose={closeModal}
        selectedPokemon={selectedPokemon}
      />
      <FlatList
        numColumns={2}
        data={list}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={style.card}
            onPress={() => {
              handleModal(item);
            }}
          >
            <LinearGradient
              colors={[
                getTypeColor(item.types[0]),
                item.types[1] != null
                  ? getTypeColor(item.types[1])
                  : getTypeColor(item.types[0]),
              ]}
              locations={[0.45, 0.9]}
              style={style.cardContent}
            >
              <Text style={style.pokemonNumber}>#{item.id}</Text>
              <Image source={{ uri: item.image }} style={style.image} />
              <Text style={style.pokemonName}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
