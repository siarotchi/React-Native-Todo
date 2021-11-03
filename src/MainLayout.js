import React, { useState, useContext } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { THEME } from "./theme";
import { Navbar } from "./components/Navbar";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { TodoContext } from "./context/todo/todoContext";
import { ScreenContext } from "./context/screen/screenContext";

export const MainLayout = () => {
  const { todos, addTodo, removeTodo, updateTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);

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

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={changeScreen}
    />
  );

  if (todoId) {
    const selectedTodo = todos.find((todo) => todo.id === todoId);
    content = (
      <TodoScreen
        goBack={() => changeScreen(null)}
        todo={selectedTodo}
        onRemove={removeTodo}
        onSave={updateTodo}
      />
    );
  }
  return (
    <View>
      <Navbar title="Todo App" />
      <View style={styles.container}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
});
