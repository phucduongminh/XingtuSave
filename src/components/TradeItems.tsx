import * as React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import { AddTrades } from "../models/AddTrades";

export const TradeItemsComponent: React.FC<{
  item: AddTrades;
}> = ({ item: {category,money,image,description,date,income} }) => {
  const moneyColor = income === 1 ? Color.colorAquamarine : Color.colorRed_200;
  return (
    <View style={styles.addedItems}>
      <View style={styles.icon}>
        <Image
          style={styles.rectangleIcon}
          resizeMode="cover"
          source={require("../assets/rectangle3.png")}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.rentalIncome}>{category}</Text>
        <Text style={[styles.july2021, styles.julyTypo]}>{date}</Text>
        <Text style={[styles.july2022, styles.julyTypo]}>
          Mô tả: {description}...
        </Text>
        <Text style={[styles.moneyText, { color: moneyColor }]}>{money}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  julyTypo: {
    color: Color.colorLightslategray,
    fontSize: FontSize.size_xs,
    left: "0.08%",
    top: "30%",
    position: "absolute",
    textAlign: "left",
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
  },
  text: {
    top:"10%",
    fontSize: 50,
    color: "red",
    width: 10,
    height: 10,
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
  },
  rectangleIcon: {
    top: 0,
    left: 0,
    position: "absolute",
    height: 46,
    width: 47,
    borderRadius: Border.br_7xs,
  },
  icon: {
    marginLeft: 10,
    height: 46,
    width: 47,
  },
  rentalIncome: {
    marginTop: -25,
    fontSize: FontSize.size_sm,
    color: Color.colorDarkslategray,
    left: "0.08%",
    top: "50%",
    width: "50%",
    position: "absolute",
    textAlign: "left",
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
  },
  july2021: {
    marginTop: 4,
    width: "50%",
    color: Color.colorLightslategray,
    fontSize: FontSize.size_xs,
  },
  july2022: {
    marginTop: 19,
    width: "83.65%",
    height: 15,
  },
  moneyText: {
    marginTop: -10,
    fontSize: FontSize.size_lg,
    right:"-95%",
    top: "50%",
    position:"relative",
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
  },
  info: {
    width: 263,
    height: 36,
    marginLeft: 10,
  },
  addedItems: {
    backgroundColor: Color.colorWhite,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 48,
    elevation: 48,
    shadowOpacity: 1,
    flexDirection: "row",
    paddingVertical: 18,
    alignItems: "center",
    borderRadius: Border.br_7xs,
    overflow:"scroll",
    right:"20%"
  },
});
