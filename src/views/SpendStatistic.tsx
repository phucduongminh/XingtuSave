import React, { useEffect, useState } from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import PieChart from 'react-native-pie-chart';
import ItemHistoryExpenses3 from "../components/ItemHistoryExpenses3";
import { FontFamily, Color, FontSize, Border, Padding } from "../GlobalStyles";
import randomColor from 'randomcolor';

const SpendStatistic = () => {
  const widthAndHeight = 250;
  const initialData = [
    { category: 'Category 1', series: 30000 },
    { category: 'Category 2', series: 40000 },
  ];
  const [data, setData] = useState<{ category: string; series: number }[]>(initialData);
  const [series, setSeries] = useState<number[]>([1]);
  const [sliceColor, setSliceColor] = useState<string[]>(['#fbd203']);

  useEffect(() => {
    if (data.length > 0) {
      const seriesValues = data.map((item) => item.series);
      const sliceColorValues = randomColor({ count: data.length });

      setSeries(seriesValues);
      setSliceColor(sliceColorValues);
    }
  }, [data]);

  return (
    <View style={styles.scrollContainer}>
      <View style={styles.spendstatistic}>
      <View style={[styles.header, styles.headerPosition]}>
        <Text style={styles.headername}>Thống kê</Text>
      </View>
      <View style={[styles.selectbar, styles.chitieuFlexBox]}>
        <Text style={styles.monthly}>Tháng 9</Text>
        <Image
          style={styles.selecticon}
          resizeMode="cover"
          source={require("../assets/selecticon.png")}
        />
      </View>
      <View style={styles.chart}>
        <View style={[styles.totalmoney, styles.headerPosition]}>
          <Text style={[styles.text, styles.textTypo]}>500,000đ</Text>
        </View>
        
        <View style={styles.container}>
        <View
          style={[styles.chitieu, styles.chitieuFlexBox]}
        >
          <Text style={styles.chiTiu}>Chi tiêu</Text>
        </View>
        <View style={styles.container}>
        
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.6}
        />
      </View>
        </View>
        <Text style={[styles.totalText, styles.textTypo]}>Tổng</Text>
      </View>
      <View style={[styles.history, styles.headerLayout]}>
      <View>
    {data.map((item, index) => (
      <ItemHistoryExpenses3
        key={index}
        category={item.category}
        series={item.series}
        color={sliceColor[index]}
      />
    ))}
  </View>
      
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
  bottomNavigation: {
    top: 823,
    left: -1,
    position: "absolute",
  },
  monthly: {
    fontSize: FontSize.size_xs,
    textAlign: "left",
    color: Color.colorLightslategray,
    fontFamily: FontFamily.abelRegular,
    letterSpacing: 1,
  },
  selecticon: {
    width: 8,
    height: 4,
    marginLeft: 308,
  },
  selectbar: {
    top: 100,
    borderRadius: Border.br_5xs,
    paddingHorizontal: Padding.p_sm,
    paddingVertical: 10,
    backgroundColor: Color.colorWhite,
    left: 14,
    flexDirection: "row",
  },
  text: {
    marginTop: -20,
    width: "161.35%",
    left: "-26.49%",
    fontSize: FontSize.size_5xl,
    height: 29,
    color: Color.colorDarkslategray,
    top: "50%",
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
    bottom: 143,
    left: "50%",
    fontSize: FontSize.size_sm,
    width: 49,
    height: 22,
    color: Color.colorLightslategray,
    zIndex: 2,
  },
  chiTiu: {
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorWhite,
    textAlign: "left",
    fontSize: FontSize.size_base,
  },
  chitieu: {
    top: 20,
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
    top: 155,
    left: 28,
    width: 358,
    height: 331,
    position: "absolute",
  },
  history: {
    top: 518,
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
