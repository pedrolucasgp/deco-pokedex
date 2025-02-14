export interface Pokemon {
  id: string;
  name: string;
  url: string;
  image: string;
  types: string[];
}

export const typesColors = {
  normal: "#A8A77A",
  fighting: "#D3425F",
  flying: "#A98FF3",
  poison: "#A33EA1",
  ground: "#E2BF65",
  rock: "#B6A136",
  bug: "#A6B91A",
  ghost: "#735797",
  steel: "#B7B7D6",
  fire: "#EE8130",
  water: "#6390F0",
  grass: "#7AC74C",
  electric: "#F7D02C",
  psychic: "#F95587",
  ice: "#96D9D6",
  dragon: "#6F35FC",
  dark: "#705746",
  fairy: "#D685AD",
  unknown: "#B0B0B0",
};

export const getTypeColor = (type: string) => {
    return typesColors[type as keyof typeof typesColors] || '#B0B0B0';
};
