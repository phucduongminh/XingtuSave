import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const HeaderName = () => {
  return <Text style={styles.headername}>Thêm khoản chi tiêu</Text>;
};

const styles = StyleSheet.create({
  headername: {
    position: "absolute",
    marginTop: -8,
    top: "50%",
    fontSize: 16,
    letterSpacing: 1,
    fontFamily: FontFamily.aBeeZeeRegular,
    color: Color.colorDarkslategray,
    textAlign: "center",
    left:5
  },
});

export default HeaderName;
