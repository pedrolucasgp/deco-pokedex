import React, { useEffect, useState } from "react";
import { style } from "./styles";
import { FlatList, Image, Text, TextInput, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { fetchPokemons } from "../../services/api";
import { Pokemon, getTypeColor } from "../../@types/pokemon";
import pokeballLoading from "../../assets/pokeballLoading.json";
import LottieView from "lottie-react-native";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const [searchValue, setSearchValue] = useState("");
  const [list, setList] = useState(pokemons);

  useEffect(() => {
    const loadPokemons = async () => {
      const data = await fetchPokemons();

      const fetchPokemonsData: Pokemon[] = await Promise.all(
        data.map(async (item: { name: string; url: string }) => {
          const response = await fetch(item.url);
          const details = await response.json();

          return {
            id: details.id,
            name: item.name,
            image: details.sprites.other["official-artwork"].front_default,
            types: details.types.map(
              (t: { type: { name: string } }) => t.type.name
            ),
          };
        })
      );

      setPokemons(fetchPokemonsData);
      setList(fetchPokemonsData);
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
      <View style={style.searchBar}>
        <MaterialCommunityIcons name="text-search" size={24} color="gray" />
        <TextInput
          placeholder="Busque um Pokémon. Ex. Mew ou 151..."
          value={searchValue}
          onChangeText={setSearchValue}
          style={{ flex: 1 }}
        />
      </View>

      {list.length == 0 && (
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

      <FlatList
        numColumns={2}
        data={list}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={style.card}>
            <View
              style={[
                style.cardContent,
                { backgroundColor: getTypeColor(item.types[0]) },
              ]}
            >
              <Text style={style.pokemonNumber}>#{item.id}</Text>
              <Image source={{ uri: item.image }} style={style.image} />
              <Text style={style.pokemonName}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Text>

              {/* <Text style={style.pokemonNumber}>{item.types[0]}</Text>
                {item.types[1] && <Text style={style.pokemonNumber}>{item.types[1]}</Text>} */}
            </View>
          </View>
        )}
      />
    </View>
  );
}
