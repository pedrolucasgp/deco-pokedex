import React, { useEffect, useState } from "react";
import { style } from "./styles";
import { FlatList, Image, Text, TextInput, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { fetchPokemons } from "../../services/api";
import { PokemonListItem } from "../../@types/pokemon";

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);

  useEffect(() => {
    const loadPokemons = async () => {
      const data = await fetchPokemons();

      const fetchPokemonsData: PokemonListItem[] = await Promise.all(
        data.map(async (item: { name: string; url: string }) => {
          const response = await fetch(item.url);
          const details = await response.json();

          return {
            id: details.id,
            name: item.name,
            image: details.sprites.front_default,
            type: details.types.type,
          };
        })
      );

      setPokemons(fetchPokemonsData);
    };

    loadPokemons();
  }, []);

  return (
    <View style={style.container}>
      <View style={style.titleWrapper}>
        <Text style={style.title}>Deco Pokédex</Text>
        <MaterialCommunityIcons
          style={{ marginLeft: 10 }}
          name="pokeball"
          size={40}
          color="red"
        />
      </View>

      <View style={style.searchBar}>
        <MaterialCommunityIcons name="text-search" size={24} color="gray" />
        <TextInput
          placeholder="Search a pokémon by name..."
          //   value={searchValue}
          //   onChangeText={setSearchValue}
        />
      </View>

      <FlatList
        numColumns={2}
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={style.card}>
            <View style={style.cardContent}>
              <Text style={style.pokemonNumber}>#{item.id}</Text>
              <Image source={{ uri: item.image }} style={style.image} />
              <Text style={style.pokemonName}>{item.name.toUpperCase()}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
