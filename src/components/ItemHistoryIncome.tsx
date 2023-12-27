import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { FontFamily, Border, Color, FontSize } from "../GlobalStyles";

const ItemHistoryIncome = () => {
  return (
    <View style={[styles.itemHistoryIncome, styles.rectanglePosition]}>
      <View style={[styles.rectangle, styles.rectanglePosition]} />
      <View style={styles.info}>
        <Text style={[styles.incomereason, styles.datePosition]}>
          Bố mẹ cho
        </Text>
        <Text style={[styles.date, styles.datePosition]}>8 Oct 2020</Text>
        <Text style={styles.value}>4.008.000 đđ</Text>
      </View>
      <Image
        style={styles.icon}
        resizeMode="cover"
        source={require("../assets/icon6.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rectanglePosition: {
    height: 74,
    width: 384,
    left: -3,
    top: 0,
    position: "absolute",
  },
  datePosition: {
    textAlign: "left",
    left: "0%",
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    top: "50%",
    position: "absolute",
  },
  rectangle: {
    borderRadius: Border.br_7xs,
    backgroundColor: "lightgray",
    shadowColor: "rgba(0, 0, 0, 0.06)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 48,
    elevation: 48,
    shadowOpacity: 1,
  },
  incomereason: {
    marginTop: -18,
    width: "32.89%",
    fontSize: FontSize.size_sm,
    color: Color.colorDarkslategray,
  },
  date: {
    marginTop: 4,
    width: "28.19%",
    fontSize: FontSize.size_xs,
    color: Color.colorLightslategray,
  },
  value: {
    marginTop: -10,
    width: "53.02%",
    left: "51.34%",
    fontSize: FontSize.size_lg,
    color: Color.colorAquamarine,
    textAlign: "right",
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    top: "50%",
    position: "absolute",
  },
  info: {
    top: 17,
    left: 74,
    width: 298,
    height: 36,
    overflow: "hidden",
    position: "absolute",
  },
  icon: {
    top: 12,
    left: 16,
    width: 46,
    height: 46,
    position: "absolute",
  },
  itemHistoryIncome: {
    zIndex: 0,
  },
});

export default ItemHistoryIncome;
