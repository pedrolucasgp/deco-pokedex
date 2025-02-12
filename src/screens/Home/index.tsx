import React, { useEffect, useState } from "react";
import { style } from "./styles";
import { FlatList, Image, Text, TextInput, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { fetchPokemons } from "../../services/api";
import { Pokemon } from "../../@types/pokemon";

export default function Home() {
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
            image: details.sprites.front_default,
            type: details.types.type,
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
          placeholder="Search a Pokémon by name or dex number..."
          value={searchValue}
          onChangeText={setSearchValue}
          style={{ flex: 1 }}
        />
      </View>

      <FlatList
        numColumns={2}
        data={list}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={style.card}>
            <View style={style.cardContent}>
              <Text style={style.pokemonNumber}>#{item.id}</Text>
              <Image source={{ uri: item.image }} style={style.image} />
              <Text style={style.pokemonName}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Text>
              {/* <Text style={style.pokemonNumber}>{item.type}</Text> */}
            </View>
          </View>
        )}
      />
    </View>
  );
}
