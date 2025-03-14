import axios from "axios";
import { Pokemon } from "../@types/pokemon";

export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

// Kanto: 1 - 151
// Johto: 152 - 251
// Hoenn: 252 - 386
// Sinnoh: 387 - 493
// Unova: 494 - 649
// Kalos: 650 - 721
// Alola: 722 - 809
// Galar: 810 - 905
// Paldea: 906 - 1025

export const fetchPokemons = async (limit = 151, offset = 0) => {
  try {
    const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
    return response.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchPokemonsData = async (
  data: { name: string; url: string }[]
): Promise<Pokemon[]> => {
  const getEvolutionChain = async (chain: any): Promise<any[]> => {
    const visitedPokemons = new Set<string>();
    let evolutions: any[] = [];
    let current = chain;

    while (current) {
      const pokemonName = current.species.name;

      if (!visitedPokemons.has(pokemonName)) {
        visitedPokemons.add(pokemonName);

        const pokemonResponse = await api.get(`/pokemon/${pokemonName}`);
        const pokemonDetails = await pokemonResponse.data;

        evolutions.push({
          name: pokemonName,
          id: pokemonDetails.id,
          image: pokemonDetails.sprites.other["official-artwork"].front_default,
          types: pokemonDetails.types.map(
            (t: { type: { name: string } }) => t.type.name
          ),
        });
      }

      current = current.evolves_to.length > 0 ? current.evolves_to[0] : null;
    }

    return evolutions;
  };

  return await Promise.all(
    data.map(async (item) => {
      try {
        const response = await fetch(item.url);
        const details = await response.json();

        const speciesResponse = await fetch(details.species.url);
        const speciesDetails = await speciesResponse.json();
        const evolutionResponse = await fetch(
          speciesDetails.evolution_chain.url
        );
        const evolutionData = await evolutionResponse.json();

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
          url: item.url,
        };
      } catch (error) {
        console.log(`Erro ao buscar dados para ${item.name}:`, error);
        return null;
      }
    })
  ).then((pokemons) => pokemons.filter((pokemon) => pokemon !== null));
};
