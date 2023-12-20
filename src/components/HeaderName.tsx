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
    left: "27.98%",
    fontSize: FontSize.size_base,
    letterSpacing: 1,
    fontFamily: FontFamily.aBeeZeeRegular,
    color: Color.colorDarkslategray,
    textAlign: "center",
  },
});

export default HeaderName;
