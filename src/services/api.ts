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

export const fetchPokemons = async (limit = 1025, offset = 0) => {
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

        const image =
          pokemonDetails.sprites?.other?.["official-artwork"]?.front_default ||
          pokemonDetails.sprites?.front_default;

        evolutions.push({
          name: pokemonName,
          id: pokemonDetails.id,
          image: image,
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

export const starterPokemons = [
  {
    gen: 1,
    name: "Kanto",
    pokemons: [
      { name: "bulbasaur", id: 1 },
      { name: "charmander", id: 4 },
      { name: "squirtle", id: 7 },
    ],
  },
  {
    gen: 2,
    name: "Johto",
    pokemons: [
      { name: "chikorita", id: 152 },
      { name: "cyndaquil", id: 155 },
      { name: "totodile", id: 158 },
    ],
  },
  {
    gen: 3,
    name: "Hoenn",
    pokemons: [
      { name: "treecko", id: 252 },
      { name: "torchic", id: 255 },
      { name: "mudkip", id: 258 },
    ],
  },
  {
    gen: 4,
    name: "Sinnoh",
    pokemons: [
      { name: "turtwig", id: 387 },
      { name: "chimchar", id: 390 },
      { name: "piplup", id: 393 },
    ],
  },
  {
    gen: 5,
    name: "Unova",
    pokemons: [
      { name: "snivy", id: 495 },
      { name: "tepig", id: 498 },
      { name: "oshawott", id: 501 },
    ],
  },
  {
    gen: 6,
    name: "Kalos",
    pokemons: [
      { name: "chespin", id: 650 },
      { name: "fennekin", id: 653 },
      { name: "froakie", id: 656 },
    ],
  },
  {
    gen: 7,
    name: "Alola",
    pokemons: [
      { name: "rowlet", id: 722 },
      { name: "litten", id: 725 },
      { name: "popplio", id: 728 },
    ],
  },
  {
    gen: 8,
    name: "Galar",
    pokemons: [
      { name: "grookey", id: 810 },
      { name: "scorbunny", id: 813 },
      { name: "sobble", id: 816 },
    ],
  },
  {
    gen: 9,
    name: "Paldea",
    pokemons: [
      { name: "sprigatito", id: 906 },
      { name: "Fuecoco", id: 909 },
      { name: "quaxly", id: 912 },
    ],
  },
  {
    gen: 0,
    name: "Todas",
    pokemons: [
      { name: "umbreon", id: 197 },
      { name: "leafeon", id: 470 },
      { name: "glaceon", id: 471 },
    ],
  },
];

export const fetchStarterPokemonsImages = async () => {
  const startersImage: { [key: number]: string[] } = {};

  for (const gen of starterPokemons) {
    const urls = await Promise.all(
      gen.pokemons.map(async (pokemon) => {
        try {
          const response = await api.get(`/pokemon/${pokemon.id}`);
          const details = response.data;
          return details.sprites.front_default;
        } catch (error) {
          console.error(`Erro ao buscar imagem de ${pokemon.name}:`, error);
          return null;
        }
      })
    );

    startersImage[gen.gen] = urls.filter((url) => url !== null);
  }

  return startersImage;
};

export const fetchRandomPokemon = async (randomNumber: number) => {
  try {
    const response = await api.get(`/pokemon/${randomNumber}`);
    const guessPokemonData = {
      ...response.data,
      image:
        response.data.sprites?.other?.["official-artwork"]?.front_default ||
        response.data.sprites?.front_default,
    };

    return guessPokemonData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
