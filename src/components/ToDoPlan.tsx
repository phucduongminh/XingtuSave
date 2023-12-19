import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Plans } from '../models/Plans';
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";

export const ToDoPlanComponent: React.FC<{
  item: Plans;
  deleteItem: Function;
}> = ({ item: {id, category,money}, deleteItem }) => {
  return (
    <View style={styles.itemHistoryExpenses}>
      <View style={styles.rectangle} />
      <View style={styles.info}>
        <Text style={[styles.expensesreason, styles.datePosition]}>
          {category}
        </Text>
        <Text style={[styles.date, styles.datePosition]}>14 July 2021</Text>
        <Text style={styles.value}>{money}</Text>
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
  datePosition: {
    textAlign: "left",
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    top: "40%",
    position: "absolute",
  },
  rectangle: {
    marginLeft:10,
    backgroundColor: Color.colorGray,
    shadowColor: "rgba(0, 0, 0, 0.06)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 48,
    elevation: 48,
    shadowOpacity: 1,
    width: 386,
    height: 70,
    borderRadius: Border.br_7xs,
  },
  expensesreason: {
    marginTop: -11,
    width: "30.81%",
    fontSize: FontSize.size_sm,
    color: Color.colorDarkslategray,
  },
  date: {
    marginTop: 20,
    width: "28.19%",
    fontSize: FontSize.size_xs,
    color: Color.colorLightslategray,
  },
  value: {
    marginTop: -10,
    width: "31.88%",
    left: "77%",
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
    position: "absolute",
    
  },
  itemHistoryExpenses: {
    marginTop: 16,
    borderRadius: Border.br_7xs,
  },
});