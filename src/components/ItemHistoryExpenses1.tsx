import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";

const ItemHistoryExpenses1 = () => {
  return (
    <View style={styles.itemHistoryExpenses}>
      <View style={styles.rectangle} />
      <View style={styles.info}>
        <Text style={[styles.expensesreason, styles.datePosition]}>
          Mua thịt
        </Text>
        <Text style={[styles.date, styles.datePosition]}>12 July 2021</Text>
        <Text style={styles.value}>-100.000 đ</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  datePosition: {
    textAlign: "left",
    left: "0%",
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    top: "50%",
    position: "absolute",
  },
  rectangle: {
    backgroundColor: Color.colorWhite,
    shadowColor: "rgba(0, 0, 0, 0.7)",
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
    borderRadius: Border.br_7xs,
  },
  expensesreason: {
    marginTop: -20,
    fontSize: FontSize.size_sm,
    color: Color.colorDarkslategray,
  },
  date: {
    marginTop: 2,
    fontSize: FontSize.size_xs,
    color: Color.colorLightslategray,
  },
  value: {
    marginTop: -10,
    left: "64.09%",
    fontSize: FontSize.size_lg,
    color: Color.colorRed,
    textAlign: "right",
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    top: "50%",
    position: "absolute",
  },
  info: {
    top: 19,
    left: 41,
    width: 298,
    height: 36,
    overflow: "hidden",
    zIndex: 1,
    position: "absolute",
  },
  itemHistoryExpenses: {
    marginTop: 16,
    borderRadius: Border.br_7xs,
  },
});

export default ItemHistoryExpenses1;
