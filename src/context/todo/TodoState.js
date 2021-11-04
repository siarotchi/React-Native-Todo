import React, { useReducer, useContext } from "react";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from "../types";
import { ScreenContext } from "../screen/screenContext";
import { Alert } from "react-native";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async (title) => {
    //Work with database from Firebase
    const response = await fetch(
      "https://react-native-todo-4207b-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      }
    );
    const data = await response.json();
    dispatch({ type: ADD_TODO, title, id: data.name });
  };
  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id);

    //TODO Alert dosent popup in Chrome
    Alert.alert(
      "Delete todo",
      `Are you sure you want to delete ${todo.title} ?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            changeScreen(null);
            await fetch(
              `https://react-native-todo-4207b-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`,
              {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
              }
            );
            dispatch({ type: REMOVE_TODO, id });
          },
        },
      ],
      {
        cancelable: false, //area around can close modal
      }
    );
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const response = await fetch(
        "https://react-native-todo-4207b-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      const todos = Object.keys(data).map((key) => ({
        ...data[key],
        id: key,
      }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch (error) {
      showError("OOPS! Smth goes wrong...");
      console.log("OOPS! Smth goes wrong...:", error);
    } finally {
      hideLoader();
    }
  };
  const updateTodo = async (id, title) => {
    clearError();
    try {
      await fetch(
        `https://react-native-todo-4207b-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title }),
        }
      );
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (error) {
      showError("OOPS! Smth goes wrong...");
      console.log("OOPS! Smth goes wrong...:", error);
    }
  };
  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
