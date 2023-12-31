import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Color, FontSize, FontFamily, Padding } from "../theme/GlobalStyles";
import { useEffect, useState } from "react";
import { Spends } from "../models/Spends";
import { createTradeTable, getSpendsHistory } from "../controllers/TradeControllers";
import formatNumber from "./formatNumber";
import { getDBConnection } from "../controllers/connectDB";

const MoneyCalulate1 = () => {
  const [trades, setTrades] = useState<Spends[]>([]);
  const [sumIncome,setSumIncome] = useState(0);
    const [sumExpense,setSumExpense] = useState(0);

  useEffect(() => {
    const loadDataCallback = async () => {
      try {
        const db = await getDBConnection();
        await createTradeTable(db);
        const storedTradeItems = await getSpendsHistory(db);
        if (storedTradeItems.length) {
          setTrades(storedTradeItems);
        } else {
          setTrades([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadDataCallback();
    const calculateSums = async () => {
      try {
        let sumIncome = 0;
      let sumExpense = 0;
    
      trades.forEach((trade) => {
        if (trade.income === 1) {
          sumIncome += trade.money;
        } else {
          sumExpense += trade.money;
        }
      });
      setSumIncome(sumIncome);
      setSumExpense(sumExpense);
      } catch (error) {
        console.error(error);
      }
    };
    calculateSums();
  }, [trades]);


  
  return (
    <View style={styles.moneycalulate}>
      <View style={styles.income}>
        <Text style={styles.incometext}>{formatNumber(sumIncome)} đ</Text>
        <Text style={[styles.income1, styles.income1Typo]}>{`Thu nhập `}</Text>
      </View>
      <View style={styles.spending}>
        <Text style={styles.expensetext}>{formatNumber(sumExpense)} đ</Text>
        <Text style={[styles.expense, styles.income1Typo]}>{`Chi tiêu `}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  income1Typo: {
    textAlign: "center",
    color: Color.colorLightslategray,
    fontSize: FontSize.size_xs,
    marginTop: 7,
    top: "50%",
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    position: "absolute",
  },
  incometext: {
    top: 0,
    left: 0,
    textAlign: "left",
    width: 171,
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    fontSize: FontSize.size_lg,
    position: "absolute",
  },
  income1: {
    width: "55.99%",
    left: "4%",
  },
  income: {
    width: 137,
    zIndex: 0,
    height: 42,
  },
  expensetext: {
    marginTop: -21,
    width: "121.27%",
    left: "-21.27%",
    textAlign: "right",
    top: "50%",
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    fontSize: FontSize.size_lg,
    position: "absolute",
  },
  expense: {
    width: "45.14%",
    left: "45%",
  },
  spending: {
    right: 0,
    bottom: 11,
    width: 142,
    overflow: "hidden",
    zIndex: 1,
    height: 42,
    position: "absolute",
  },
  moneycalulate: {
    top: 30,
    left: 4,
    width: 396,
    padding: Padding.p_3xs,
    position: "absolute",
  },
});

export default MoneyCalulate1;
