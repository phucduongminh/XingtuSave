import * as React from "react";
import { Text, StyleSheet, Image, View, ScrollView } from "react-native";
import Header1 from "../components/Header1";
import ItemHistoryExpenses from "../components/ItemHistoryExpenses";
import ItemHistoryExpenses1 from "../components/ItemHistoryExpenses1";
import ItemHistoryExpenses2 from "../components/ItemHistoryExpenses2";
import { Padding, Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import formatNumber from "../components/formatNumber";

const DetailPlan: React.FC<{
  deCategory:string;
  deMoney:number;
}> = ({ deCategory,deMoney }) => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
    <View style={styles.detailplan}>
      <Header1 />
      <View style={[styles.planCategoryInfo, styles.remainingAmountFlexBox]}>
        <Text style={[styles.text, styles.textTypo]}>Khoản chi tiêu</Text>
        <View style={[styles.category, styles.categoryFlexBox]}>
          <Text
            style={[styles.categoryText, styles.moneyexpensesTypo]}
          >{deCategory}</Text>
          <Image
            style={[styles.categoryField, styles.childLayout]}
            resizeMode="cover"
            source={require("../assets/rectangle-13.png")}
          />
        </View>
        <View style={[styles.moneyExpenses, styles.categoryFlexBox]}>
          <Image
            style={[styles.moneyExpensesChild, styles.childLayout]}
            resizeMode="cover"
            source={require("../assets/rectangle-13.png")}
          />
          <Text style={[styles.moneyexpenses, styles.moneyexpensesPosition]}>
            {formatNumber(deMoney)} đ
          </Text>
        </View>
      </View>
      <View style={[styles.remainingAmount, styles.remainingAmountFlexBox]}>
        <Text style={[styles.remainingAmountText, styles.textTypo]}>
          Số tiền còn lại
        </Text>
        <Text style={styles.remainingmoney}>2.000.000 đ</Text>
      </View>
      <View style={[styles.categoryAllExpenses, styles.moneyexpensesPosition]}>
        <View style={styles.title}>
          <Text style={[styles.allMyIncome, styles.textTypo]}>
            Các khoản đã chi
          </Text>
        </View>
        <ItemHistoryExpenses />
        <ItemHistoryExpenses1 />
        <ItemHistoryExpenses2 />
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height:'100%',
    backgroundColor: '#fff',
  },
  remainingAmountFlexBox: {
    padding: Padding.p_3xs,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  textTypo: {
    textAlign: "left",
    color: Color.colorDarkslategray,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    position: "absolute",
  },
  categoryFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  moneyexpensesTypo: {
    fontFamily: FontFamily.abelRegular,
    fontSize: FontSize.size_sm,
    top: 8,
    textAlign: "left",
    color: Color.colorDarkslategray,
    letterSpacing: 1,
  },
  childLayout: {
    height: 35,
    width: 351,
    borderRadius: Border.br_9xs,
  },
  moneyexpensesPosition: {
    left: 14,
    position: "absolute",
  },
  text: {
    zIndex: 0,
    left: 16,
    top: 10,
    color: Color.colorDarkslategray,
    fontSize: FontSize.size_base,
  },
  categoryText: {
    left: 13,
    zIndex: 0,
    position: "absolute",
    fontSize: FontSize.size_sm,
    top: 8,
  },
  categoryField: {
    zIndex: 1,
  },
  category: {
    top: 50,
    left: 17,
    zIndex: 1,
  },
  moneyExpensesChild: {
    zIndex: 0,
  },
  moneyexpenses: {
    fontFamily: FontFamily.abelRegular,
    fontSize: FontSize.size_sm,
    top: 8,
    textAlign: "left",
    color: Color.colorDarkslategray,
    letterSpacing: 1,
    zIndex: 1,
  },
  moneyExpenses: {
    top: 114,
    zIndex: 2,
    left: 16,
  },
  planCategoryInfo: {
    top: 92,
    left: 4,
    width: 385,
    height: 170,
  },
  remainingAmountText: {
    top: 12,
    left: 2,
    zIndex: 0,
  },
  remainingmoney: {
    right: 11,
    fontSize: FontSize.size_lg,
    color: Color.colorMediumseagreen,
    textAlign: "right",
    zIndex: 1,
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    top: 10,
    position: "absolute",
  },
  remainingAmount: {
    top: 627,
    left: 19,
    width: 381,
  },
  allMyIncome: {
    marginTop: -9.5,
    top: "50%",
    left: "0%",
  },
  title: {
    width: 386,
    height: 19,
    overflow: "hidden",
  },
  categoryAllExpenses: {
    top: 273,
  },
  detailplan: {
    backgroundColor: Color.colorGray,
    height: 896,
  },
});

export default DetailPlan;
