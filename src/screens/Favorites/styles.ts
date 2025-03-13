import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
    height: "100%",
    backgroundColor: "#fffafa",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  loadingWrapper: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    gap: 30,
  },
  animation: {
    width: 200,
    height: 200,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  cardWrapper: {
    marginTop: "15%",
    marginBottom: "15%",
  },
  cardContent: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
    width: "100%",
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  pokemonNumber: {
    fontSize: 15,
  },
  pokemonName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  header: {
    position: "absolute",
    marginTop: "30%",
    flexDirection: "row",
    gap: "65%",
  },
  blur: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 2,
  },
  deleteWrapper: {
    width: "20%",
    height: "100%",
    marginLeft: 5,
  },
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "80%",
    backgroundColor: "#ff474c",
    borderRadius: 10,
    marginTop: 12,
  },
});
