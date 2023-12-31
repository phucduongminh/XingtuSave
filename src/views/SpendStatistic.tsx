import React, { useCallback, useEffect, useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PieChart from 'react-native-pie-chart';
import ItemHistoryExpenses3 from "../components/ItemHistoryExpenses3";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import randomColor from 'randomcolor';
import { Dropdown } from 'react-native-element-dropdown';
import formatNumber from "../components/formatNumber";
import { Spends } from '../models/Spends';
import { createTable, getDBConnection, getSpendsHistory } from "../controllers/TradeControllers";
import filterAndGroup from '../controllers/Filters';

const chooses = [
  { label: 'Tất cả', value: '0' },
  { label: 'Tháng 1', value: '01' },
  { label: 'Tháng 2', value: '02' },
  { label: 'Tháng 3', value: '03' },
  { label: 'Tháng 4', value: '04' },
  { label: 'Tháng 5', value: '05' },
  { label: 'Tháng 6', value: '06' },
  { label: 'Tháng 7', value: '07' },
  { label: 'Tháng 8', value: '08' },
  { label: 'Tháng 9', value: '09' },
  { label: 'Tháng 10', value: '10' },
  { label: 'Tháng 11', value: '11' },
  { label: 'Tháng 12', value: '12' },
];

const SpendStatistic = () => {
  const [month,setMonth] = useState('0')
  const [data, setData] = useState<{ category: string; totalMoney: number }[]>([]);
  const [series, setSeries] = useState<number[]>([1]);
  const [sliceColor, setSliceColor] = useState<string[]>(['#fbd203']);
  const [sumMoney,setSumMoney] = useState(0);
  const [spends,setSpends] = useState<Spends[]>([]);

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const storedTradeItems = await getSpendsHistory(db);
      if (storedTradeItems.length) {
        setSpends(storedTradeItems);
      } else {
        setSpends([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [spends,month]);

  const loadDataGraph = useCallback(async () => {
    try {
      if (data.length > 0) {
        const seriesValues = data.map((item) => item.totalMoney);
        const sliceColorValues = randomColor({ count: data.length });
  
        let sumMoney=0;
        seriesValues.forEach((value)=>{
          sumMoney+=value
        })
        setSumMoney(sumMoney)
        setSeries(seriesValues);
        setSliceColor(sliceColorValues);
      }
    } catch (error) {
      console.error(error);
    }
  }, [data,month]);

  useEffect(() => {
    loadDataCallback()
    setData(filterAndGroup(spends,month))
    loadDataGraph()
  }, [loadDataCallback]);

  return (
      <View style={styles.spendstatistic}>
      <View style={[styles.header, styles.headerPosition]}>
        <Text style={styles.headername}>Thống kê</Text>
      </View>
      <View >
        
      </View>
      <Dropdown
      style={[styles.selectbar]}
                    data={chooses}
                    onChange={(item) => setMonth(item.value)}
                    labelField="label"
                    valueField="value"
                    iconColor="darkgray"
                    placeholderStyle={styles.monthly}
                    selectedTextStyle={styles.monthly}
                    iconStyle={styles.selecticon}
                    placeholder={'Tất cả'}
        /> 
      <View style={styles.chart}>
        <View
          style={[styles.chitieu, styles.chitieuFlexBox]}
        >
          <Text style={styles.chiTiu}>Chi tiêu</Text>
        </View>
        
        {(data.length > 0) ?(<><PieChart
          widthAndHeight={250}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.6} /><Text style={[styles.totalText, styles.textTypo]}>Tổng</Text><Text style={[styles.text, styles.textTypo]}>{formatNumber(sumMoney)}đ</Text></>
        ):(<Text style={[styles.nullText, styles.textTypo]}>Không có thống kê chi tiêu cho tháng này</Text>)}

      </View>
      <View style={[styles.history, styles.headerLayout]}>
      <View>
    {data.map((item, index) => (
      <ItemHistoryExpenses3
        key={index}
        category={item.category}
        series={formatNumber(item.totalMoney)}
        color={sliceColor[index]}
      />
    ))}
  </View>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    height:"100%",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
  headerPosition: {
    overflow: "hidden",
    position: "absolute",
  },
  iconLayout1: {
    width: 35,
    overflow: "hidden",
    position: "absolute",
  },
  iconLayout: {
    width: "8.04%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  chitieuFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    left:"0%"
  },
  textTypo: {
    fontFamily: FontFamily.aBeeZeeItalic,
    fontStyle: "italic",
    textAlign: "center",
    letterSpacing: 1,
    position: "absolute",
  },
  headerLayout: {
    width: 386,
    left: 14,
  },
  headername: {
    top:-4,
    left: "40%",
    textAlign: "center",
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.abelRegular,
    letterSpacing: 1,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  header: {
    top: 50,
    height: 40,
    width: 386,
    left: 14,
  },
  rectangle: {
    borderTopLeftRadius: Border.br_sm,
    borderTopRightRadius: Border.br_sm,
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
    backgroundColor: Color.colorWhite,
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
    overflow: "hidden",
    position: "absolute",
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
  monthly: {
    fontSize: 16,
    left:"5%",
    color: Color.colorLightslategray,
    fontFamily: FontFamily.abelRegular,
    position:"absolute"
  },
  selecticon: {
    width: 32,
    height: 16,
    marginLeft:380
  },
  selectbar: {
    top: 75,
    borderRadius: Border.br_5xs,
    paddingVertical: 4,
    backgroundColor: '#f2faf7',
    flexDirection: "row",

  },
  text: {
    top:160,
    width: "161.35%",
    left: "-30%",
    fontSize: FontSize.size_5xl,
    height: 29,
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.aBeeZeeItalic,
    fontStyle: "italic",
  },
  totalmoney: {
    top: 168,
    left: 114,
    width: 124,
    height: 64,
    zIndex: 0,
  },
  totalText: {
    marginLeft: -27,
    bottom: 180,
    left: "50%",
    fontSize: FontSize.size_sm,
    width: 49,
    height: 22,
    color: Color.colorLightslategray,
    zIndex: 2,
  },
  nullText : {
    fontSize: 16,
    color: Color.colorLightslategray,
    top:"60%",
    zIndex: 3,},
  chiTiu: {
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorWhite,
    textAlign: "left",
    fontSize: FontSize.size_base,
  },
  chitieu: {
    top: -5,
    left: 116,
    borderTopRightRadius: Border.br_21xl,
    borderBottomRightRadius: Border.br_21xl,
    backgroundColor: Color.colorRed,
    borderStyle: "solid",
    borderColor: Color.colorWhite,
    borderWidth: 1,
    width: 150,
    height: 30,
    justifyContent: "center",
    paddingHorizontal: 6,
    paddingVertical: 4,
    zIndex: 3,
  },
  chart: {
    top: 100,
    left: 28,
    width: 358,
    height: 331,
    position: "absolute",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  history: {
    top: 470,
    height: "50%",
    position: "absolute",
  },
  spendstatistic: {
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorGray,
    flex: 1,
    width: "100%",
  },
});

export default SpendStatistic;
