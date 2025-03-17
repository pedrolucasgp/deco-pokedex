import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  centeredModal: {
    alignItems: "center",
    marginTop: "28%",
    flex: 1,
  },
  modalView: {
    width: "90%",
    height: "90%",
    backgroundColor: "#fffafa",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    borderColor: "#333333",
    borderWidth: 0.5,
    gap: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "5%",
  },
  modalText: {
    fontSize: 15,
  },
  modalButtonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: "auto",
    padding: 10,
  },
  modalButton: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "auto",
    height: "auto",
    borderRadius: 10,
    borderWidth: 0.5,
    padding: 10,
  },
  closeButton: {
    position: "absolute",
    left: "10%",
    padding: 20,
  },
  selectedButton: {
    backgroundColor: "red",
  },
  pokemonImagesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pokemonImage: {
    width: 40,
    height: 40,
    marginHorizontal: 2,
  },
});
