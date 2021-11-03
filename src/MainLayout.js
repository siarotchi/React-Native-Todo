import React, { useState, useContext } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { THEME } from "./theme";
import { Navbar } from "./components/Navbar";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { TodoContext } from "./context/todo/todoContext";
import { ScreenContext } from "./context/screen/screenContext";

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext);

  //Without Context:
  // const [todoId, setTodoId] = useState(null);
  //   const [todos, setTodos] = useState([]);

  //   const addTodo = (title) => {
  //     setTodos((prev) => [
  //       ...prev,
  //       {
  //         id: Date.now().toString(),
  //         title,
  //       },
  //     ]);
  //   };

  //   const removeTodo = (id) => {
  //     const todo = todos.find((i) => i.id === id);
  //     Alert.alert(
  //       "Delete todo",
  //       `Are you sure you want to delete ${todo.title} ?`,
  //       [
  //         {
  //           text: "Cancel",
  //           style: "cancel",
  //           // onPress: () => Alert.alert("Cancel Pressed"),
  //         },
  //         {
  //           text: "Delete",
  //           style: "destructive",
  //           onPress: () => {
  //             setTodoId(null);
  //             setTodos((prev) => prev.filter((todo) => todo.id !== id));
  //           },
  //         },
  //       ],
  //       {
  //         cancelable: false, //area around can close modal
  //       }
  //     );
  //   };

  //   const updateTodo = (id, title) => {
  //     setTodos((old) =>
  //       old.map((todo) => {
  //         if (todo.id === id) {
  //           todo.title = title;
  //         }
  //         return todo;
  //       })
  //     );
  //   };

  return (
    <View>
      <Navbar title="Todo App" />
      <View style={styles.container}>
        {todoId ? <TodoScreen /> : <MainScreen />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
});
