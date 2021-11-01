import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export const Todo = ({ todo, onRemove }) => {
  // const longPressHandler = () => {
  //   onRemove(todo.id);
  // };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => console.log("pressed!!!!")}
      // onLongPress={longPressHandler}
      onLongPress={onRemove.bind(null, todo.id)} //alternative LongPress with bind
    >
      <View style={styles.todo}>
        <Text>{todo.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    marginBottom: 10,
  },
});
