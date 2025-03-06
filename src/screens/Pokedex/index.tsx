import React, { useEffect, useState } from "react";
import { style } from "./styles";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { fetchPokemons } from "../../services/api";
import { Pokemon, getTypeColor } from "../../@types/pokemon";
import pokeballLoading from "../../assets/pokeballLoading.json";
import LottieView from "lottie-react-native";
import { BlurView } from "expo-blur";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchValue, setSearchValue] = useState("");
  const [list, setList] = useState(pokemons);

  const [visible, setVisible] = useState(false);

  const [existingFavs, setExistingFavs] = useState([]);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const [audioSelect, setAudioSelect] = useState(null);

  async function handleModal(item) {
    setSelectedPokemon(item);
    const favorites = await getFavsFromStorage();
    setExistingFavs(favorites);
    setVisible(true);
    await audioSelect.replayAsync();
  }

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

  const sendFavsToStorage = async (favPokemons: Pokemon[]) => {
    await AsyncStorage.setItem("favPokemons", JSON.stringify(favPokemons));
  };

  const getFavsFromStorage = async () => {
    const result = await AsyncStorage.getItem("favPokemons");
    return result ? JSON.parse(result) : [];
  };

  useEffect(() => {
    const loadPokemons = async () => {
      const data = await fetchPokemons();

      const fetchPokemonsData: Pokemon[] = await Promise.all(
        data.map(async (item: { name: string; url: string }) => {
          const response = await fetch(item.url);
          const details = await response.json();

          const speciesResponse = await fetch(details.species.url);
          const speciesDetails = await speciesResponse.json();

          const evolutionResponse = await fetch(
            speciesDetails.evolution_chain.url
          );
          const evolutionData = await evolutionResponse.json();

          const getEvolutionChain = async (
            chain: any,
            visited: Set<string> = new Set()
          ) => {
            let evolutions = [];
            let current = chain;

            while (current) {
              const pokemonName = current.species.name;

              // verifica se o Pokémon já foi visitado
              if (!visited.has(pokemonName)) {
                visited.add(pokemonName); // marca ele como visitado

                const pokemonResponse = await fetch(
                  `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
                );
                const pokemonDetails = await pokemonResponse.json();

                // add o Pokémon as evoluções
                evolutions.push({
                  name: pokemonName,
                  image:
                    pokemonDetails.sprites.other["official-artwork"]
                      .front_default,
                  types: pokemonDetails.types.map(
                    (t: { type: { name: string } }) => t.type.name
                  ),
                });
              }

              // Processa as evoluções (ramificações)
              if (current.evolves_to.length > 0) {
                for (let evolve of current.evolves_to) {
                  // concatena as evoluções e evita duplicação
                  evolutions = evolutions.concat(
                    await getEvolutionChain(evolve, visited)
                  );
                }
              }

              // passa para a próxima caso ela exista
              current =
                current.evolves_to.length > 0 ? current.evolves_to[0] : null;
            }

            return evolutions;
          };

          const evolutionLine = await getEvolutionChain(evolutionData.chain);

          return {
            id: details.id,
            name: item.name,
            image: details.sprites.other["official-artwork"].front_default,
            types: details.types.map(
              (t: { type: { name: string } }) => t.type.name
            ),
            species:
              speciesDetails.genera.find((g: any) => g.language.name === "en")
                ?.genus || "Unknown",
            evolutionLine,
          };
        })
      );

      setPokemons(fetchPokemonsData);
      setList(fetchPokemonsData);
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

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/openDetails.mp3")
    );
    setAudioSelect(sound);
  }

  useEffect(() => {
    loadSound();
  }, []);

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

      <View>
        <Modal animationType="slide" transparent={true} visible={visible}>
          <View style={style.modalWrapper}>
            <View style={style.modalView}>
              <View style={style.modalButtonWrapper}>
                <TouchableOpacity
                  style={style.modalButton}
                  onPress={() => setVisible(!visible)}
                >
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
                        backgroundColor: getTypeColor(
                          selectedPokemon?.types[1]
                        ),
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
              {selectedPokemon?.evolutionLine && (
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
                          {item.name.charAt(0).toUpperCase() +
                            item.name.slice(1)}
                        </Text>
                      </LinearGradient>
                    )}
                  />
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>

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
