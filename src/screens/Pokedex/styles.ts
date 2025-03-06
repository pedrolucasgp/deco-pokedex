import { StyleSheet } from "react-native";
import { createNativeWrapper } from "react-native-gesture-handler";

export const style = StyleSheet.create({
  container: {
    gap: 10,
    padding: 20,
    paddingTop: 60,
    width: "100%",
    height: "100%",
    backgroundColor: "#fffafa",
    justifyContent: "space-around",
  },
  searchBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    gap: 5,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    padding: 10,
  },
  cardContent: {
    borderRadius: 10,
    borderWidth: 0.5,
    flex: 1,
    alignItems: "center",
    padding: 15,
  },
  pokemonNumber: {
    fontSize: 15,
    marginRight: "70%",
  },
  pokemonName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 150,
    height: 150,
  },
  loadingWrapper: {
    marginTop: "50%",
    alignItems: "center",
    gap: 90,
  },
  animation: {
    width: 200,
    height: 200,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalWrapper: {
    marginTop: "15%",
  },
  modalView: {
    width: "90%",
    height: "95%",
    margin: 20,
    backgroundColor: "#fffafa",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    borderColor: "#333333",
    borderWidth: 0.5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "10%",
  },
  modalText: {
    fontSize: 15,
    marginBottom: "5%",
  },
  modalButtonWrapper: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: "40%",
  },
  modalButton: {
    width: "30%",
    alignItems: "center",
  },
  blur: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  pokemonModal: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "30%",
    marginTop: "5%",
    borderRadius: 15,
    padding: 20,
    gap: 20,
  },
  pokemonTypesWrapper: {
    alignItems: "center",
    flexDirection: "row",
    gap: 30,
  },
  pokemonTypes: {
    textAlign: "center",
    fontSize: 15,
    width: "30%",
    maxHeight: "auto",
    borderRadius: 5,
    borderWidth: 0.5,
    padding: 10,
    fontWeight: "bold",
  },
  pokemonSpecies: {
    borderBottomWidth: 1,
    width: "100%",
  },
  pokemonDetailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  pokemonDetailsText: {
    fontSize: 20,
    padding: 10,
    width: "100%",
  },
  evolutionContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "22%",
    width: "100%",
    marginTop: 10,
  },

  evolutionCard: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },

  evolutionImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  evolutionText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
});
