import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color } from "../theme/GlobalStyles";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text
        style={styles.headername}
      >{`Kế hoạch chi tiêu chi tiết trong tháng `}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headername: {
    marginTop: -8,
    top: "50%",
    left: "11%",
    fontSize: FontSize.size_base,
    letterSpacing: 1,
    fontFamily: FontFamily.abelRegular,
    color: Color.colorDarkslategray,
    textAlign: "center",
    position: "absolute",
  },
  header: {
    top: 30,
    left: 14,
    width: 386,
    height: 40,
    overflow: "hidden",
    position: "absolute",
  },
});

export default Header;
