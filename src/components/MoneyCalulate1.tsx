import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Color, FontSize, FontFamily, Padding } from "../GlobalStyles";

const MoneyCalulate1 = () => {
  return (
    <View style={styles.moneycalulate}>
      <View style={styles.income}>
        <Text style={styles.incometext}>20.000.000 đ</Text>
        <Text style={[styles.income1, styles.income1Typo]}>{`Thu nhập `}</Text>
      </View>
      <View style={styles.spending}>
        <Text style={styles.expensetext}>15.000.0000 đ</Text>
        <Text style={[styles.expense, styles.income1Typo]}>{`Chi tiêu `}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  income1Typo: {
    textAlign: "center",
    color: Color.colorLightslategray,
    fontSize: FontSize.size_xs,
    marginTop: 7,
    top: "50%",
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    position: "absolute",
  },
  incometext: {
    top: 0,
    left: 0,
    textAlign: "left",
    width: 171,
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    fontSize: FontSize.size_lg,
    position: "absolute",
  },
  income1: {
    width: "55.99%",
    left: "5%",
  },
  income: {
    width: 137,
    zIndex: 0,
    height: 42,
  },
  expensetext: {
    marginTop: -21,
    width: "121.27%",
    left: "-21.27%",
    textAlign: "right",
    top: "50%",
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    fontSize: FontSize.size_lg,
    position: "absolute",
  },
  expense: {
    width: "45.14%",
    left: "30%",
  },
  spending: {
    right: 0,
    bottom: 11,
    width: 142,
    overflow: "hidden",
    zIndex: 1,
    height: 42,
    position: "absolute",
  },
  moneycalulate: {
    top: 30,
    left: 4,
    width: 396,
    padding: Padding.p_3xs,
    position: "absolute",
  },
});

export default MoneyCalulate1;
