import React, { useEffect, useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { style } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pokemon } from "../../../@types/pokemon";
import { Audio } from "expo-av";

interface ClearAllModalProps {
  visibleClearAll: boolean;
  onClose: () => void;
  favPokemons: Pokemon[];
  setFavPokemons: (favPokemons: Pokemon[]) => void;
}

const ClearAllModal = ({
  visibleClearAll,
  onClose,
  favPokemons,
  setFavPokemons,
}: ClearAllModalProps) => {
  const [audioSelect, setAudioSelect] = useState(null);

  async function clearFavs() {
    if (favPokemons == null || favPokemons.length == 0) {
      Alert.alert("Você não tem nenhum Pokémon favorito.");
      onClose();
      return;
    }

    AsyncStorage.setItem("favPokemons", "");
    await audioSelect.replayAsync();
    setFavPokemons([]);
    onClose();
  }

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
      visible={visibleClearAll}
      onRequestClose={onClose}
    >
      <View style={style.centeredModal}>
        <View style={style.modalView}>
          <Text style={style.modalTitle}> Excluir todos os favoritos? </Text>
          <Text style={style.modalText}>
            {" "}
            Isso não poderá ser desfeito. Confirma?{" "}
          </Text>
          <View style={style.modalButtonGroup}>
            <TouchableOpacity style={style.modalButton} onPress={clearFavs}>
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

export default ClearAllModal;
