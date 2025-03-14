import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { style } from "./styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
    null
  );

  const handleFilter = (gen: number) => {
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
  };

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
          <View style={style.modalButtonGroup}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
              <TouchableOpacity
                key={gen}
                style={[
                  style.modalButton,
                  selectedGeneration === gen && style.selectedButton,
                ]}
                onPress={() => handleFilter(gen)}
              >
                <Text
                  style={{
                    color: selectedGeneration === gen ? "#FFFFFF" : "#9597F4",
                    fontWeight: "bold",
                  }}
                >
                  Gen {gen}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
