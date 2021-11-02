import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import { Navbar } from "./src/components/Navbar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";

export default function App() {
  const [todoId, setTodoId] = useState("2");
  const [todos, setTodos] = useState([
    {
      id: "1",
      title: "React Native",
    },
    {
      id: "2",
      title: "React JS",
    },
  ]);

  const addTodo = (title) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
      },
    ]);
  };

  const removeTodo = (id) => {
    const todo = todos.find((i) => i.id === id);
    Alert.alert(
      "Delete todo",
      `Are you sure you want to delete ${todo.title} ?`,
      [
        {
          text: "Cancel",
          // onPress: () => Alert.alert("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setTodoId(null);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
          },
          style: "distructive",
        },
      ],
      {
        cancelable: false, //area around can close modal
      }
    );
  };

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={setTodoId}
    />
  );

  if (todoId) {
    const selectedTodo = todos.find((todo) => todo.id === todoId);
    content = (
      <TodoScreen
        goBack={() => setTodoId(null)}
        todo={selectedTodo}
        onRemove={removeTodo}
      />
    );
  }

  return (
    <View>
      <Navbar title="Todo App" />
      <View style={styles.container}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
