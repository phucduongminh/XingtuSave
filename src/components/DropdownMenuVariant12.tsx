import * as React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { Padding, Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const DropdownMenuVariant12 = () => {
  return (
    <View style={styles.dropdownMenuvariant12}>
      <View style={[styles.lcTheoParent, styles.parentPosition]}>
        <Text style={styles.lcTheoTypo}>Lọc theo</Text>
        <Image
          style={styles.vectorIcon}
          resizeMode="cover"
          source={require("../assets/vector.png")}
        />
        <Image
          style={styles.vectorIcon1}
          resizeMode="cover"
          source={require("../assets/vector1.png")}
        />
      </View>
      <Image
        style={styles.item01Icon}
        resizeMode="cover"
        source={require("../assets/item-01.png")}
      />
      <View style={[styles.vectorWrapper, styles.parentPosition]}>
        <Image
          style={[styles.vectorIcon2, styles.vectorIconLayout]}
          resizeMode="cover"
          source={require("../assets/vector.png")}
        />
      </View>
      <View style={[styles.vectorContainer, styles.parentPosition]}>
        <Image
          style={[styles.vectorIcon2, styles.vectorIconLayout]}
          resizeMode="cover"
          source={require("../assets/vector2.png")}
        />
      </View>
      <Image
        style={[styles.checkmarkIcon, styles.checkmarkIconLayout]}
        resizeMode="cover"
        source={require("../assets/checkmark.png")}
      />
      <Text style={[styles.chiTiu, styles.lcTheoTypo]}>Chi tiêu</Text>
      <View style={[styles.danhMcParent, styles.parentPosition]}>
        <Text style={styles.lcTheoTypo}>{`Danh mục `}</Text>
        <Image
          style={[styles.vectorIcon4, styles.vectorIconSpaceBlock]}
          resizeMode="cover"
          source={require("../assets/vector1.png")}
        />
        <Image
          style={[styles.vectorIcon5, styles.vectorIconSpaceBlock]}
          resizeMode="cover"
          source={require("../assets/vector.png")}
        />
      </View>
      <View style={styles.thuNhpParent}>
        <Text style={[styles.thuNhp, styles.thuNhpPosition]}>Thu nhập</Text>
        <Image
          style={[styles.checkmarkIcon1, styles.thuNhpPosition]}
          resizeMode="cover"
          source={require("../assets/checkmark.png")}
        />
      </View>
      <Text style={[styles.tNgy, styles.ngyTypo]}>Từ ngày</Text>
      <Text style={[styles.nNgy, styles.ngyTypo]}>Đến ngày</Text>
      <Image
        style={[styles.image6Icon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/image-6.png")}
      />
      <Image
        style={[styles.image7Icon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/image-6.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parentPosition: {
    paddingBottom: Padding.p_xs,
    paddingRight: Padding.p_2xl,
    paddingTop: Padding.p_xs,
    paddingLeft: Padding.p_xs,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
    left: "0%",
    right: "0%",
    width: "100%",
    height: "16.67%",
    position: "absolute",
  },
  vectorIconLayout: {
    display: "none",
    width: 12,
  },
  checkmarkIconLayout: {
    height: 16,
    borderRadius: Border.br_9xs,
    width: 16,
    overflow: "hidden",
  },
  lcTheoTypo: {
    textAlign: "left",
    color: Color.color,
    fontFamily: FontFamily.aBeeZeeRegular,
    fontSize: FontSize.size_xs,
  },
  vectorIconSpaceBlock: {
    marginLeft: 11,
    height: 7,
  },
  thuNhpPosition: {
    top: 8,
    position: "absolute",
  },
  ngyTypo: {
    left: 33,
    textAlign: "left",
    color: Color.color,
    fontFamily: FontFamily.aBeeZeeRegular,
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  iconLayout: {
    left: "0.54%",
    right: "93.26%",
    width: "6.2%",
    height: "26.67%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  vectorIcon: {
    height: 7,
    width: 12,
  },
  vectorIcon1: {
    width: 16,
    height: 7,
  },
  lcTheoParent: {
    top: "0%",
    bottom: "83.33%",
    borderTopLeftRadius: Border.br_8xs,
    borderTopRightRadius: Border.br_8xs,
  },
  item01Icon: {
    top: "16.67%",
    bottom: "66.67%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    left: "0%",
    right: "0%",
    width: "100%",
    height: "16.67%",
    position: "absolute",
  },
  vectorIcon2: {
    height: 7,
  },
  vectorWrapper: {
    top: "33.33%",
    bottom: "50%",
  },
  vectorContainer: {
    top: "50%",
    bottom: "33.33%",
  },
  checkmarkIcon: {
    top: 44,
    left: 334,
    position: "absolute",
  },
  chiTiu: {
    left: 274,
    top: 46,
    position: "absolute",
  },
  vectorIcon4: {
    width: 16,
  },
  vectorIcon5: {
    display: "none",
    width: 12,
  },
  danhMcParent: {
    top: "66.67%",
    bottom: "16.67%",
  },
  thuNhp: {
    left: 21,
    textAlign: "left",
    color: Color.color,
    fontFamily: FontFamily.aBeeZeeRegular,
    fontSize: FontSize.size_xs,
  },
  checkmarkIcon1: {
    left: 82,
    height: 16,
    borderRadius: Border.br_9xs,
    width: 16,
    overflow: "hidden",
  },
  thuNhpParent: {
    height: "20.48%",
    width: "27.04%",
    top: "14.57%",
    right: "5.04%",
    bottom: "64.95%",
    left: "67.92%",
    position: "absolute",
  },
  tNgy: {
    top: 19,
  },
  nNgy: {
    top: 46,
  },
  image6Icon: {
    top: "9.52%",
    bottom: "63.81%",
  },
  image7Icon: {
    top: "37.14%",
    bottom: "36.19%",
  },
  dropdownMenuvariant12: {
    top: 73,
    left: 29,
    borderRadius: Border.br_3xs,
    width: 371,
    height: 105,
    position: "absolute",
  },
});

export default DropdownMenuVariant12;
