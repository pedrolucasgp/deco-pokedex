import React, { useCallback, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { style } from "./styles";
import pokeballLoading from "../../assets/pokeballLoading.json";
import psyduckAnimation from "../../assets/psyduckAnimation.json";
import LottieView from "lottie-react-native";
import { getTypeColor, Pokemon } from "../../@types/pokemon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { BlurView } from "expo-blur";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { LinearGradient } from "expo-linear-gradient";
import DeleteFavoriteModal from "../../components/Modals/DeleteFavoriteModal";
import ClearAllModal from "../../components/Modals/ClearAllModal";

export default function Favorites() {
  const [favPokemons, setFavPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const [loading, setLoading] = useState(true);

  const [visibleClearAll, setVisibleClearAll] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);

  const closeClearModal = () => setVisibleClearAll(false);
  const closeDeleteModal = () => setVisibleDelete(false);

  const getFavPokemons = async () => {
    const storageContent = await getFavsFromStorage();

    setFavPokemons(JSON.parse(storageContent));
    setLoading(false);
  };

  const getFavsFromStorage = async () => {
    const result = await AsyncStorage.getItem("favPokemons");
    return result;
  };

  const renderRightActions = (item: Pokemon) => (
    <View style={style.deleteWrapper}>
      <TouchableOpacity
        onPress={() => {
          setSelectedPokemon(item);
          setVisibleDelete(true);
        }}
        style={style.deleteButton}
      >
        <MaterialCommunityIcons name="trash-can" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );

  useFocusEffect(
    useCallback(() => {
      getFavPokemons();
    }, [])
  );

  return (
    <View style={style.container}>
      {visibleClearAll && <BlurView style={style.blur} />}
      {visibleDelete && <BlurView style={style.blur} />}

      <View style={style.header}>
        <Text style={style.title}>Favoritos</Text>
        <TouchableOpacity
          onPress={() => {
            setVisibleClearAll(true);
          }}
        >
          <MaterialCommunityIcons name="broom" size={24} color="#d11507" />
        </TouchableOpacity>
      </View>

      {loading ? (
        // Exibe a animação de carregamento se loading for true
        <View style={style.loadingWrapper}>
          <LottieView
            style={style.animation}
            source={pokeballLoading}
            autoPlay
            loop
          />
          <Text style={style.loadingText}>Carregando...</Text>
        </View>
      ) : favPokemons == null || favPokemons.length == 0 ? (
        // Exibe a animação do Psyduck se não houver favoritos
        <View style={style.loadingWrapper}>
          <LottieView
            style={style.animation}
            source={psyduckAnimation}
            autoPlay
            loop
          />
          <Text style={style.loadingText}>
            Você não tem nenhum Pokémon adicionado como favorito!
          </Text>
        </View>
      ) : (
        // Renderiza o conteúdo principal se não estiver carregando e houver favoritos
        <>
          <View>
            <ClearAllModal
              visibleClearAll={visibleClearAll}
              onClose={closeClearModal}
              favPokemons={favPokemons}
              setFavPokemons={setFavPokemons}
            />
            <DeleteFavoriteModal
              visibleDelete={visibleDelete}
              onClose={closeDeleteModal}
              selectedPokemon={selectedPokemon}
              favPokemons={favPokemons}
              setFavPokemons={setFavPokemons}
            />
          </View>

          <View style={style.cardWrapper}>
            <FlatList
              data={favPokemons}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <Swipeable renderRightActions={() => renderRightActions(item)}>
                  <LinearGradient
                    colors={[
                      getTypeColor(item.types[0]),
                      item.types[1] != null
                        ? getTypeColor(item.types[1])
                        : getTypeColor(item.types[0]),
                    ]}
                    start={{ x: 0.1, y: 1 }}
                    end={{ x: 0.7, y: 0 }}
                    locations={[0.45, 0.9]}
                    style={style.cardContent}
                  >
                    <Text style={style.pokemonNumber}>#{item.id}</Text>
                    <Text style={style.pokemonName}>
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </Text>
                    <Image source={{ uri: item.image }} style={style.image} />
                  </LinearGradient>
                </Swipeable>
              )}
            />
          </View>
        </>
      )}
    </View>
  );
}
