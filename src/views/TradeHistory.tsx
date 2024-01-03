import * as React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import MoneyCalulate from "../components/MoneyCalulate";
import DropdownMenuVariant from "../components/DropdownMenuVariant";
import { FontSize, FontFamily, Color, Border, Padding } from "../theme/GlobalStyles";
import { createTradeTable, getSpendsHistory } from "../controllers/TradeControllers";
import { useContext, useEffect, useState } from "react";
import { Spends } from "../models/Spends";
import { TradeItemsComponent } from "../components/TradeItems";
import { getDBConnection } from "../controllers/connectDB";
import { filterByRequest } from "../controllers/Filters";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList, ParamsContext } from "../navigators";
import { RouteProp, useRoute } from '@react-navigation/native';

type ProfileProps = NativeStackScreenProps<BottomTabParamList>;

const TradeHistory = ({ navigation }: ProfileProps) => {
  const [tradesList, setTradesList] = useState<Spends[]>([]);
  const [trades, setTrades] = useState<Spends[]>([]);
  const [category,setCategory] = useState('')
  const [control,setControl] = useState(0)
  const [sDate,setSDate] = useState('')
  const [sDate1,setSDate1] = useState('')

  const {params} = useContext(ParamsContext);

  const route = useRoute<RouteProp<BottomTabParamList, 'TradeHistory'>>();
  let num = route.params.num

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
    loadDataCallback()
  }, [num]);

  useEffect(()=>{
    const loadTradeList = async () =>{
      setTradesList(filterByRequest(trades,control,category,sDate,sDate1))
    }
    loadTradeList()
  },[trades,control,category,sDate,sDate1])

  return (
    <View style={styles.tradehistoryfilter}>
      <View style={[styles.header, styles.headerLayout]}>
        <Text style={styles.headername}>Tất cả giao dịch</Text>
      </View>
      <View style={[styles.history, styles.headerLayout]}>
        {tradesList.length > 0 ? (
        tradesList.map((item) => (
          <View key={item.id}>
            <TradeItemsComponent item={item} />
          </View>
        ))
      ):(<Text style={styles.noPlansText}>Không có lịch sử giao dịch !!!</Text>)
      }
      </View>
      <MoneyCalulate trades={trades} />
      <View style={styles.morebutton}>
        <Image
          style={styles.showmoreicon}
          resizeMode="cover"
          source={require("../assets/show-more.png")}
        />
      </View>
      <DropdownMenuVariant 
      setCategory={setCategory} 
      setControl={setControl} 
      setSDate={setSDate} 
      setSDate1={setSDate1}
      params={params}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerLayout: {
    width: 392,
    position: "absolute",
  },
  iconLayout1: {
    width: 35,
    position: "absolute",
    overflow: "hidden",
  },
  iconLayout: {
    width: "8.04%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  headername: {
    marginTop: -9,
    top: "50%",
    left: "32.77%",
    fontSize: FontSize.size_base,
    letterSpacing: 1,
    fontFamily: FontFamily.aBeeZeeRegular,
    color: Color.colorDarkslategray,
    textAlign: "center",
    position: "absolute",
  },
  searchbuttonIcon: {
    top: 7,
    left: 350,
    width: 28,
    height: 25,
    position: "absolute",
    overflow: "hidden",
  },
  header: {
    top: 27,
    left: 14,
    height: 40,
    overflow: "hidden",
  },
  rectangle: {
    borderTopLeftRadius: Border.br_sm,
    borderTopRightRadius: Border.br_sm,
    backgroundColor: Color.colorWhite,
    shadowColor: "rgba(0, 0, 0, 0.12)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 48,
    elevation: 48,
    shadowOpacity: 1,
    width: 414,
    height: 70,
    zIndex: 0,
  },
  createIcon: {
    top: 14,
    left: 41,
    height: 38,
    zIndex: 1,
  },
  historyIcon: {
    top: 16,
    left: 117,
    height: 35,
    zIndex: 2,
  },
  planIcon: {
    height: "50%",
    width: "9.42%",
    right: "44.69%",
    bottom: "31.43%",
    left: "45.89%",
    zIndex: 3,
    maxHeight: "100%",
    maxWidth: "100%",
    top: "18.57%",
    position: "absolute",
    overflow: "hidden",
  },
  suggestIcon: {
    height: "50.86%",
    right: "12%",
    bottom: "30.57%",
    left: "79.95%",
    zIndex: 4,
    top: "18.57%",
    width: "8.04%",
  },
  statisticsIcon: {
    height: "45.29%",
    top: "22.86%",
    right: "27.46%",
    bottom: "31.86%",
    left: "64.49%",
    zIndex: 5,
  },
  menuTab: {
    top: 823,
    left: -1,
    position: "absolute",
  },
  history: {
    top: 274,
    left: 26,
    marginBottom:50
  },
  showmoreicon: {
    width: 30,
    height: 30,
  },
  morebutton: {
    top: 742,
    left: 196,
    flexDirection: "row",
    padding: Padding.p_3xs,
    position: "absolute",
  },
  tradehistoryfilter: {
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorGray,
    flex: 1,
    width: "100%",
    height: 896,
    overflow: "hidden",
  },
  noPlansText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
});

export default TradeHistory;
