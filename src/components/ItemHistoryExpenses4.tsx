import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const ItemHistoryExpenses4 = () => {
  return (
    <View style={[styles.itemHistoryExpenses, styles.rectangleLayout]}>
      <View style={[styles.rectangle, styles.rectanglePosition]} />
      <View style={[styles.icon, styles.iconLayout]}>
        <View style={[styles.rectangle1, styles.iconLayout]} />
      </View>
      <View style={styles.info}>
        <Text style={[styles.expensesreason, styles.valuePosition]}>
          Category 2
        </Text>
        <Text style={[styles.value, styles.valuePosition]}>300.490 đ</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangleLayout: {
    height: 74,
    width: 386,
    position: "absolute",
  },
  rectanglePosition: {
    top: 0,
    left: 0,
  },
  iconLayout: {
    height: 46,
    width: 46,
    position: "absolute",
  },
  valuePosition: {
    letterSpacing: 1,
    top: "50%",
    marginTop: -10,
    position: "absolute",
  },
  rectangle: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorWhite,
    shadowColor: "rgba(0, 0, 0, 0.04)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 48,
    elevation: 48,
    shadowOpacity: 1,
    height: 74,
    width: 386,
    position: "absolute",
  },
  rectangle1: {
    borderRadius: Border.br_7xs,
    backgroundColor: Color.colorLightskyblue,
    top: 0,
    left: 0,
  },
  icon: {
    top: 14,
    left: 14,
  },
  expensesreason: {
    width: "32.21%",
    left: "0%",
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.aBeeZeeRegular,
    color: Color.colorDarkslategray,
    textAlign: "left",
  },
  value: {
    left: "72.82%",
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.abelRegular,
    color: Color.colorTomato_100,
    textAlign: "right",
  },
  info: {
    top: 17,
    left: 74,
    width: 298,
    height: 36,
    overflow: "hidden",
    position: "absolute",
  },
  itemHistoryExpenses: {
    top: 107,
    zIndex: 1,
    left: 0,
    width: 386,
  },
});

export default ItemHistoryExpenses4;
