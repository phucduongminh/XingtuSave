import * as React from "react";
import { StyleSheet, View, Image, Text, Button, TouchableOpacity } from "react-native";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";
import { Plans } from '../models/Plans';
import formatNumber from "./formatNumber";

export const ToDoPlanComponent: React.FC<{
  item: Plans;
  deleteItem: Function;
  toggleModal1: (category: string,money:number) => void;
}> = ({ item: {id, category,money}, deleteItem, toggleModal1 }) => {
  return (
    <View style={styles.planitem}>
      <View style={styles.rectangle} />
      <Image
        style={styles.icon}
        resizeMode="cover"
        source={require("../assets/icon6.png")}
      />
      <View style={[styles.info, styles.infoPosition]}>
        <Text
          style={[styles.category, styles.valuePosition]}
        >{category}</Text>
        <Text style={[styles.value, styles.valuePosition]}>{formatNumber(money)}</Text>
        <TouchableOpacity onPress={() => toggleModal1(category,money)} style={[styles.icon1, styles.infoPosition]}>
        <Image
          resizeMode="cover"
          source={require("../assets/icon21.png")}
        />
        </TouchableOpacity>
      </View>
      <Button
        onPress={() => deleteItem(id)}
        title="done"
        color="pink"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  infoPosition: {
    overflow: "hidden",
    position: "absolute",
  },
  valuePosition: {
    fontFamily: FontFamily.abelRegular,
    letterSpacing: 1,
    top: "50%",
    marginTop: -10,
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
    borderRadius: Border.br_7xs,
    marginBottom:20,
  },
  icon: {
    top: 14,
    left: 14,
    width: 46,
    height: 46,
    zIndex: 1,
    position: "absolute",
  },
  category: {
    left: "0%",
    fontSize: FontSize.size_sm,
    color: Color.colorDarkslategray,
    textAlign: "left",
  },
  value: {
    left: "55.7%",
    fontSize: FontSize.size_lg,
    color: Color.colorMediumseagreen,
    textAlign: "right",
  },
  icon1: {
    height: "50%",
    width: "9%",
    top: "36.11%",
    bottom: "13.89%",
    left: "90%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  info: {
    top: 17,
    left: 74,
    width: 298,
    height: 36,
    zIndex: 2,
  },
  planitem: {
    top: 40,
    left: 15,
    borderRadius: Border.br_7xs,
  },
});

