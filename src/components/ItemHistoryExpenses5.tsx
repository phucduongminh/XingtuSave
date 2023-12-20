import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Border, FontFamily, Color, FontSize } from "../GlobalStyles";

const ItemHistoryExpenses5 = () => {
  return (
    <View style={[styles.itemHistoryExpenses, styles.rectangleLayout]}>
      <View style={[styles.rectangle, styles.rectanglePosition]} />
      <View style={[styles.icon, styles.iconLayout]}>
        <View style={[styles.rectangle1, styles.iconLayout]} />
      </View>
      <View style={styles.info}>
        <Text style={[styles.expensesreason, styles.valuePosition]}>
          Category 3
        </Text>
        <Text style={[styles.value, styles.valuePosition]}>4.500.000 đ</Text>
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
    borderRadius: Border.br_7xs,
    top: 0,
    left: 0,
  },
  iconLayout: {
    height: 46,
    width: 46,
    position: "absolute",
  },
  valuePosition: {
    fontFamily: FontFamily.abelRegular,
    letterSpacing: 1,
    top: "50%",
    position: "absolute",
  },
  rectangle: {
    backgroundColor: Color.colorWhite,
    shadowColor: "rgba(0, 0, 0, 0.06)",
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
    backgroundColor: Color.colorPaleturquoise,
    borderRadius: Border.br_7xs,
    top: 0,
    left: 0,
  },
  icon: {
    top: 14,
    left: 14,
  },
  expensesreason: {
    marginTop: -10,
    left: "0%",
    fontSize: FontSize.size_sm,
    color: Color.colorDarkslategray,
    textAlign: "left",
  },
  value: {
    marginTop: -13,
    left: "67.79%",
    fontSize: FontSize.size_lg,
    color: Color.colorTomato_200,
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
    top: 214,
    zIndex: 2,
    left: 0,
    width: 386,
  },
});

export default ItemHistoryExpenses5;
