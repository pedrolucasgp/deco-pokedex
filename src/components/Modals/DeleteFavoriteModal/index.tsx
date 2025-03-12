import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pokemon } from "../../../@types/pokemon";
import { Audio } from "expo-av";

interface DeleteFavoriteModalProps {
  visibleDelete: boolean;
  onClose: () => void;
  selectedPokemon: { name: string };
  favPokemons: Pokemon[];
  setFavPokemons: (favPokemons: Pokemon[]) => void;
}

const DeleteFavoriteModal = ({
  visibleDelete,
  onClose,
  selectedPokemon,
  favPokemons,
  setFavPokemons,
}: DeleteFavoriteModalProps) => {
  const [audioSelect, setAudioSelect] = useState(null);

  async function handleDelete(selectedPokemon) {
    if (!selectedPokemon) return;

    const newFavList = favPokemons.filter(
      (favPokemon) => favPokemon.id != selectedPokemon.id
    );
    setFavPokemons(newFavList);
    saveFavListOnStorage(newFavList);
    await audioSelect.replayAsync();
    onClose();
  }

  const saveFavListOnStorage = async (favPokemons: Pokemon[]) => {
    await AsyncStorage.setItem("favPokemons", JSON.stringify(favPokemons));
  };

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/remove.mp3")
    );
    setAudioSelect(sound);
  }

  useEffect(() => {
    loadSound();
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibleDelete}
      onRequestClose={onClose}
    >
      <View style={style.centeredModal}>
        <View style={style.modalView}>
          <Text style={style.modalTitle}>
            {" "}
            Deseja remover{" "}
            {selectedPokemon?.name.charAt(0).toUpperCase() +
              selectedPokemon?.name.slice(1)}
            ?{" "}
          </Text>
          <Text style={style.modalText}>
            {" "}
            Isso não poderá ser desfeito. Confirma?{" "}
          </Text>
          <View style={style.modalButtonGroup}>
            <TouchableOpacity
              style={style.modalButton}
              onPress={() => handleDelete(selectedPokemon)}
            >
              <Text style={{ color: "#9597F4", fontWeight: "bold" }}>Sim</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.modalButton} onPress={onClose}>
              <Text style={{ color: "#d11507", fontWeight: "bold" }}>Não</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteFavoriteModal;
