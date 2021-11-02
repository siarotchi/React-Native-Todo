import React from "react";
import { StyleSheet, View } from "react-native";
import { THEME } from "../theme";
import { AppTextBold } from "./ui/AppTextBold";

export const Navbar = ({ title }) => {
  return (
    <View style={styles.navbar}>
      <AppTextBold style={styles.text}>{title}</AppTextBold>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    backgroundColor: THEME.MAIN_COLOR,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});
