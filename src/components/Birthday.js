import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const Birthday = ({ item, deleteBirthday }) => {
  const pasat = item.days > 0 ? true : false;
  const infoDate = () => {
    if (item.days === 0) {
      return <Text style={{ color: "#FFF" }}>Es su cumple</Text>;
    } else {
      const days = -item.days;
      console.log(days);
      return (
        <View style={styles.textCurrent}>
          <Text>{days}</Text>
          <Text>{days === 1 ? "Dia" : "Dias"}</Text>
        </View>
      );
    }
  };
  return (
    <TouchableOpacity
      style={[
        styles.card,
        pasat ? styles.past : item.days === 0 ? styles.actual : styles.current,
      ]}
      onPress={() => deleteBirthday(item)}
    >
      <Text style={styles.userName}>
        {item.name} {item.lastame}
      </Text>
      {pasat ? <Text style={{ color: "#FFF" }}>Pasado</Text> : infoDate()}
    </TouchableOpacity>
  );
};

export default Birthday;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    alignItems: "center",
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 15,
  },

  actual: {
    backgroundColor: "#559204",
  },
  current: {
    backgroundColor: "#1ae1f2",
  },
  past: {
    backgroundColor: "#820000",
  },

  userName: {
    color: "#fff",
    fontSize: 16,
  },

  textCurrent: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
