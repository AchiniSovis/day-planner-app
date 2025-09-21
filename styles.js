import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 4, // adds shadow effect
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  hourText: {
    width: 60,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  clearButton: {
    marginTop: 20,
  },
});

export default styles;