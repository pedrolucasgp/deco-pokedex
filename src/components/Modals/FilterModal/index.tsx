import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { style } from "./styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  fetchStarterPokemonsImages,
  starterPokemons,
} from "../../../services/api";
import { Audio } from "expo-av";

interface FilterModalProps {
  visibleFilter: boolean;
  onClose: () => void;
  onFilter: (limit: number, offset: number) => void;
}

const FilterModal = ({
  visibleFilter,
  onClose,
  onFilter,
}: FilterModalProps) => {
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(
    0
  );

  const [starterImages, setStarterImages] = useState<{
    [key: number]: string[];
  }>({});

  const [audioSelect, setAudioSelect] = useState(null);

  useEffect(() => {
    const loadStarterImages = async () => {
      const images = await fetchStarterPokemonsImages();
      setStarterImages(images);
    };

    loadStarterImages();
  }, []);

  const handleFilter = async (gen: number) => {
    setSelectedGeneration(gen);
    let limit = 0;
    let offset = 0;

    switch (gen) {
      case 1: // Kanto (1-151)
        limit = 151;
        offset = 0;
        break;
      case 2: // Johto (152-251)
        limit = 100;
        offset = 151;
        break;
      case 3: // Hoenn (252-386)
        limit = 135;
        offset = 251;
        break;
      case 4: // Sinnoh (387-493)
        limit = 107;
        offset = 386;
        break;
      case 5: // Unova (494-649)
        limit = 155;
        offset = 494;
        break;
      case 6: // Kalos (650-721)
        limit = 72;
        offset = 649;
        break;
      case 7: // Alola (722-809)
        limit = 88;
        offset = 721;
        break;
      case 8: // Galar (810-905)
        limit = 96;
        offset = 809;
        break;
      case 9: // Paldea (906-1025)
        limit = 121;
        offset = 905;
        break;
      default:
        limit = 1025;
        offset = 0;
        break;
    }

    onFilter(limit, offset);
    onClose();
    await audioSelect.replayAsync();
  };

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/select.mp3")
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
      visible={visibleFilter}
      onRequestClose={onClose}
    >
      <View style={style.centeredModal}>
        <View style={style.modalView}>
          <TouchableOpacity style={style.closeButton} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="gray" />
          </TouchableOpacity>

          <Text style={style.modalTitle}>Filtrar por Geração</Text>
          <Text style={style.modalText}>
            Selecione uma geração para filtrar:
          </Text>

          <FlatList
            data={starterPokemons}
            keyExtractor={(item) => item.gen.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={style.modalButtonGroup}>
                <TouchableOpacity
                  style={style.modalButton}
                  onPress={() => handleFilter(item.gen)}
                >
                  <Text style={style.modalText}>{item.name}</Text>
                  <View style={style.pokemonImagesContainer}>
                    {starterImages[item.gen]?.map((imageUrl, index) => (
                      <Image
                        key={index}
                        source={{ uri: imageUrl }}
                        style={[
                          style.pokemonImage,
                          {
                            tintColor:
                              selectedGeneration === item.gen ? null : "black",
                          },
                        ]}
                      />
                    ))}
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
