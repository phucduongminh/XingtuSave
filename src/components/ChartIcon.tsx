import * as React from "react";
import { Image, StyleSheet } from "react-native";

const ChartIcon = () => {
  return (
    <Image
      style={styles.chartIcon}
      resizeMode="cover"
      source={require("../assets/chart.png")}
    />
  );
};

const styles = StyleSheet.create({
  chartIcon: {
    position: "absolute",
    marginLeft: -127,
    bottom: 0,
    left: "50%",
    width: 254,
    height: 251,
    zIndex: 1,
  },
});

export default ChartIcon;
