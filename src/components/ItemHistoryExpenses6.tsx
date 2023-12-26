import * as React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { FontFamily, Border, Color, FontSize } from "../GlobalStyles";

const ItemHistoryExpenses6 = () => {
  return (
    <View style={[styles.itemHistoryExpenses, styles.iconPosition]}>
      <View style={styles.rectangle} />
      <Image
        style={[styles.icon, styles.iconPosition]}
        resizeMode="cover"
        source={require("../assets/icon7.png")}
      />
      <View style={styles.info}>
        <Text style={[styles.expensesreason, styles.datePosition]}>
          Phí đi lại
        </Text>
        <Text style={[styles.date, styles.datePosition]}>8 Oct 2020</Text>
        <Text style={styles.value}>-320.000 đ</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconPosition: {
    zIndex: 1,
    position: "absolute",
  },
  datePosition: {
    textAlign: "left",
    fontFamily: FontFamily.aBeeZeeRegular,
    left: "0%",
    letterSpacing: 1,
    top: "50%",
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
    width: 386,
    height: 74,
    zIndex: 0,
  },
  icon: {
    top: 14,
    left: 14,
    width: 46,
    height: 46,
  },
  expensesreason: {
    marginTop: -18,
    fontSize: FontSize.size_sm,
    color: Color.colorDarkslategray,
  },
  date: {
    marginTop: 4,
    fontSize: FontSize.size_xs,
    color: Color.colorLightslategray,
  },
  value: {
    marginTop: -10,
    left: "70.47%",
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.abelRegular,
    color: Color.colorTomato_100,
    textAlign: "right",
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
    zIndex: 2,
    position: "absolute",
  },
  itemHistoryExpenses: {
    top: 106,
    left: 0,
  },
});

export default ItemHistoryExpenses6;
