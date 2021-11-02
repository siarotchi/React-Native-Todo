import React from "react";
import { StyleSheet, View } from "react-native";

export const AppCard = (props) => {
  return (
    <View
      // style={{ ...styles.default, ...props.style }} //combine styles inside and out
      style={styles.default}
    >
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    padding: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //shadows in Native ios
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    //android elev
    elevation: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
});
