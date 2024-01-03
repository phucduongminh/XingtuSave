import * as React from "react";
import { Text, StyleSheet, Image, View, ScrollView } from "react-native";
import Header from "../components/Header";
import ItemHistoryExpenses from "../components/ItemHistoryExpenses";
import { Padding, Color, FontSize, FontFamily, Border } from "../theme/GlobalStyles";
import formatNumber from "../components/formatNumber";
import { createTradeTable, getSpendsHistory } from "../controllers/TradeControllers";
import { useEffect, useState } from "react";
import { Spends } from "../models/Spends";
import { getDBConnection } from "../controllers/connectDB";
import { addRemains } from "../controllers/PlanControllers";

const getTrueDate = (date: Date): string => {
  // Lấy ngày, tháng và năm của đối tượng Date
  let day = date.getDate();
  let month = date.getMonth() + 1; // cộng thêm 1 để được tháng đúng
  let year = date.getFullYear();

  // Chuyển đổi các biến này sang kiểu string
  let dayString = day.toString();
  let monthString = month.toString();
  let yearString = year.toString();

  // Thêm số 0 vào đầu của day và month nếu chúng có độ dài nhỏ hơn 2
  dayString = dayString.padStart(2, "0");
  monthString = monthString.padStart(2, "0");

  // Nối các giá trị này với nhau bằng dấu gạch chéo (/)
  let trueDate = `${dayString}-${monthString}-${yearString}`;

  // Trả về chuỗi trueDate
  return trueDate;
};

const getMonth = (date: string) => {
  // Giả sử date có định dạng dd-mm-yyyy
  return date.slice(3, 5); // Trả về chuỗi từ vị trí 3 đến 4
};

const DetailPlan: React.FC<{
  deCategory:string;
  deMoney:number;
  deId:number;
}> = ({ deCategory,deMoney,deId }) => {
  const [spends, setSpends] = useState<Spends[]>([])
  const [spendList,setSpendList] = useState<Spends[]>([])
  const [remainMoney,setRemainMoney] = useState(0)

  const moneyColor = remainMoney > 0 ? Color.colorAquamarine : Color.colorRed_200;
   
  useEffect(() => {
    const loadDataCallback = async () => {
      try {
        const db = await getDBConnection();
        await createTradeTable(db);
        const storedTradeItems = await getSpendsHistory(db);
        if (storedTradeItems.length) {
          setSpends(storedTradeItems);
        } else {
          setSpends([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadDataCallback();
  }, [spends]);

  useEffect(() => {
    const selectSpendList = async () => {
      try {
        let remainMoney=deMoney;
        let updatedSpendList = spends.filter(spend => spend.category === deCategory && spend.income === 0); // use filter to get the spends that match the condition
        updatedSpendList = updatedSpendList.filter((spend) => getMonth(spend.date) === getMonth(getTrueDate(new Date())));

        updatedSpendList.forEach(spend => remainMoney -= spend.money); // update the remainMoney
        setSpendList(updatedSpendList); // set the spendList state with the updated array
        setRemainMoney(remainMoney)
        const db = await getDBConnection();
      await addRemains(db, deId,remainMoney);
      } catch (error) {
        console.error(error);
      }
    };
    selectSpendList();
  }, [spends]);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
    <View style={styles.detailplan}>
      <Header />
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
        <Text style={[styles.remainingmoney, { color: moneyColor }]}>{formatNumber(remainMoney)} đ</Text>
      </View>
      <View style={[styles.categoryAllExpenses, styles.moneyexpensesPosition]}>
        <View style={styles.title}>
          <Text style={[styles.allMyIncome, styles.textTypo]}>
            Các khoản đã chi
          </Text>
        </View>
        {spendList.length > 0 ? (
        spendList.map((item) => (
          <View key={item.id}>
            <ItemHistoryExpenses item={item}
              />
          </View>
        ))
      ):(<Text style={{marginTop:100,left:"10%"}}>Chưa có khoản chi tiêu cho danh mục này !!!</Text>)
      }
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
    width: 360,
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
    top: "80%",
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
