import { StyleSheet } from "react-native";

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
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  searchBar: {
    width: "90%",
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
    fontSize: 20,
    width: "100%",
    marginBottom: 15,
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
  blur: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
});
