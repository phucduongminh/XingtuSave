import * as React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";

const AddedItems = () => {
  return (
    <View style={styles.addedItems}>
      <Text style={styles.text}>-</Text>
      <View style={styles.icon}>
        <Image
          style={styles.rectangleIcon}
          resizeMode="cover"
          source={require("../assets/rectangle3.png")}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.rentalIncome}>Siêu thị</Text>
        <Text style={[styles.july2021, styles.julyTypo]}>25/10/2023</Text>
        <Text style={[styles.july2022, styles.julyTypo]}>
          Mô tả: Rau, thịt,...
        </Text>
        <Text style={styles.text1}>500.000</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  julyTypo: {
    color: Color.colorLightslategray,
    fontSize: FontSize.size_xs,
    left: "0.08%",
    top: "50%",
    position: "absolute",
    textAlign: "left",
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
  },
  text: {
    fontSize: FontSize.size_17xl,
    color: Color.colorRed_100,
    display: "flex",
    width: 10,
    height: 10,
    textAlign: "left",
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    alignItems: "center",
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
    marginTop: -18,
    fontSize: FontSize.size_sm,
    color: Color.colorDarkslategray,
    left: "0.08%",
    top: "50%",
    width: "31.18%",
    position: "absolute",
    textAlign: "left",
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
  },
  july2021: {
    marginTop: 4,
    width: "31.18%",
    color: Color.colorLightslategray,
    fontSize: FontSize.size_xs,
  },
  july2022: {
    marginTop: 19,
    width: "83.65%",
    height: 15,
  },
  text1: {
    marginTop: -10,
    width: "63.08%",
    left: "36.92%",
    fontSize: FontSize.size_lg,
    color: Color.colorRed_200,
    textAlign: "right",
    top: "50%",
    position: "absolute",
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
  },
  info: {
    width: 263,
    height: 36,
    overflow: "hidden",
    marginLeft: 10,
  },
  addedItems: {
    backgroundColor: Color.colorWhite,
    shadowColor: "rgba(0, 0, 0, 0.06)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 48,
    elevation: 48,
    shadowOpacity: 1,
    flexDirection: "row",
    paddingHorizontal: Padding.p_11xs,
    paddingVertical: Padding.p_sm,
    alignItems: "center",
    borderRadius: Border.br_7xs,
  },
});

export default AddedItems;
