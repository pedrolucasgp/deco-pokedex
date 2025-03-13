import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  centeredModal: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modalView: {
    margin: 20,
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
  },
  modalText: {
    fontSize: 15,
  },
  modalButtonGroup: {
    flexDirection: "row",
    gap: 50,
    display: "flex",
  },
  modalButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: 30,
    borderRadius: 10,
    borderWidth: 0.5,
  },
});
