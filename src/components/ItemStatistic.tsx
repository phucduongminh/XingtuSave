import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../theme/GlobalStyles";

const ItemStatistic: React.FC<{
  category:string;
  series:string;
  color:any;
}> = ({ category,series,color }) => {
  return (
    <View style={[styles.itemHistoryExpenses, styles.rectangleLayout]}>
      <View style={[styles.rectangle, styles.rectanglePosition]} />
      <View style={styles.info}>
        <Text style={[styles.expensesreason, styles.valuePosition]}>
          {category}
        </Text>
        <Text style={[styles.value, styles.valuePosition]}>{series} đ</Text>
      </View>
      <View style={[styles.icon, styles.iconLayout]}>
        <View style={[styles.rectangle1, styles.iconLayout,{backgroundColor:color}]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangleLayout: {
    height: 74,
    width: 386,
  },
  rectanglePosition: {
    borderRadius: Border.br_7xs,
    left: 0,
    top: 0,
  },
  valuePosition: {
    letterSpacing: 1,
    top: "50%",
    position: "absolute",
  },
  iconLayout: {
    height: 46,
    width: 46,
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
    height: 74,
    width: 386,
    position: "absolute",
  },
  expensesreason: {
    marginTop: -18,
    left: "0%",
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.aBeeZeeRegular,
    color: Color.colorDarkslategray,
    textAlign: "left",
  },
  value: {
    marginTop: -21,
    left: "72.15%",
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.abelRegular,
    color: Color.colorTomato_100,
    textAlign: "right",
  },
  info: {
    top: 23,
    left: 74,
    width: 298,
    height: 36,
    overflow: "hidden",
    position: "absolute",
  },
  rectangle1: {
    borderRadius: Border.br_7xs,
    left: 0,
    top: 0,
  },
  icon: {
    top: 12,
    left: 16,
  },
  itemHistoryExpenses: {
    left: 0,
    top:-52,
    width: 386,
    marginBottom:10
  },
});

export default ItemStatistic;
