import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Color, FontFamily, FontSize, Padding } from "../GlobalStyles";

const MoneyCalulate = () => {
  return (
    <View style={styles.moneycalulate}>
      <View style={[styles.income, styles.incomeLayout]}>
        <Text style={[styles.incometext, styles.incometextPosition]}>
          4.008.000 đ
        </Text>
        <Text style={[styles.income1, styles.income1Typo]}>{`Thu nhập `}</Text>
      </View>
      <View style={[styles.spending, styles.incomeLayout]}>
        <Text style={[styles.expensetext, styles.incometextPosition]}>
          320.000 đ
        </Text>
        <Text style={[styles.expense, styles.income1Typo]}>{`Chi tiêu `}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  incomeLayout: {
    overflow: "hidden",
    height: 42,
  },
  incometextPosition: {
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    fontSize: FontSize.size_lg,
    top: "50%",
    marginTop: -21,
    position: "absolute",
  },
  income1Typo: {
    textAlign: "center",
    color: Color.colorLightslategray,
    fontSize: FontSize.size_xs,
    marginTop: 7,
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    top: "50%",
    position: "absolute",
  },
  incometext: {
    width: "129.35%",
    left: "0%",
    textAlign: "left",
  },
  income1: {
    width: "55.97%",
    left: "22.02%",
  },
  income: {
    width: 124,
    zIndex: 0,
  },
  expensetext: {
    left: "15.93%",
    textAlign: "right",
  },
  expense: {
    left: "35.4%",
  },
  spending: {
    right: 0,
    bottom: 11,
    width: 113,
    zIndex: 1,
    position: "absolute",
  },
  moneycalulate: {
    top: 178,
    left: 9,
    width: 396,
    height: 63,
    padding: Padding.p_3xs,
    position: "absolute",
  },
});

export default MoneyCalulate;
