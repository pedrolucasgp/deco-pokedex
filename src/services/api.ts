import axios from "axios";

export const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
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

export const fetchPokemons = async(limit = 151, offset = 0) => {
    try{
        const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
        return response.data.results;
    } catch (error) {
        console.log(error);
        return [];
    }
}