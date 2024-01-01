import * as React from "react";
import { Text, StyleSheet, Image, View, Pressable } from "react-native";
import { Padding, Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from '@react-native-community/checkbox';
import { useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useCategoryChoose } from "../controllers/CategoryChoose";

const getTrueDate = (date: Date) => {
  // Lấy ngày, tháng và năm của đối tượng Date
  let day = date.getDate();
  let month = date.getMonth() + 1; // cộng thêm 1 để được tháng đúng
  let year = date.getFullYear();

  // Nối các giá trị này với nhau bằng dấu gạch ngang (-)
  let trueDate = `${day}-${month}-${year}`;

  // Trả về chuỗi trueDate
  return trueDate;
};

const DropdownMenuVariant = () => {
  const [check1,setCheck1] = useState(false)
  const [check2,setCheck2] = useState(false)
  const [category,setCategory] = useState('')

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [date1, setDate1] = useState(new Date());
  const [show1, setShow1] = useState(false);
  const [showDate1, setShowDate1] = useState(false);

  const cateChoose =useCategoryChoose();

  const onDateChange = (e: DateTimePickerEvent, selectedDate: Date | undefined) => {
    // Check if selectedDate is defined before setting the date
    setShow(!show)
    setShowDate(!showDate)
    if (selectedDate) {
        setDate(selectedDate);
    }
};

const showMode = () => {
    setShow(!show)
}

const onDateChange1 = (e: DateTimePickerEvent, selectedDate: Date | undefined) => {
  // Check if selectedDate is defined before setting the date
  setShow1(!show1)
  setShowDate1(!showDate1)
  if (selectedDate) {
      setDate1(selectedDate);
  }
};

const showMode1 = () => {
  setShow1(!show1)
}
  
  return (
    <View style={styles.dropdownMenuvariant12}>
      <View style={[styles.lcTheoParent, styles.parentPosition]}>
        <Text style={styles.filter1}>Lọc theo</Text>
        <Image
          style={styles.vectorIcon1}
          resizeMode="cover"
          source={require("../assets/vector1.png")}
        />
      </View>
    <CheckBox
    value={check1}
    onValueChange={() => setCheck1(!check1)}
    style={{left:"87.5%",top:"36%",position:"absolute"}}
    ></CheckBox>

      <Text style={[styles.chiTiu, styles.lcTheoTypo]}>Chi tiêu</Text>
      <View style={[styles.danhMcParent, styles.parentPosition]}>
      <Dropdown
                    style={[styles.dropdownCategory]}
                    placeholderStyle={styles.dropdownText}
                    selectedTextStyle={styles.dropdownText}
                    iconStyle={styles.dropdownIcon}
                    itemTextStyle={{fontSize:12}}
                    iconColor="black"
                    data={cateChoose}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={'Danh mục'}
                    onChange={item => {
                        setCategory(item.value)
                    }}
                />
      </View>
      <View style={styles.thuNhpParent}>
        <Text style={[styles.thuNhp, styles.thuNhpPosition]}>Thu nhập</Text>
        <CheckBox
    value={check2}
    onValueChange={() => setCheck2(!check2)}
    style={{left:"72%",top:"5%",position:"absolute"}}
    ></CheckBox>
      </View>
      {showDate ===true?(<Text style={[styles.fromDate, styles.dateChoose]}>{getTrueDate(date)}</Text>):(<Text style={[styles.fromDate, styles.dateChoose]}>Từ ngày</Text>)}
      {showDate1 ===true?(<Text style={[styles.toDate, styles.dateChoose]}>{getTrueDate(date)}</Text>):(<Text style={[styles.toDate, styles.dateChoose]}>Đến ngày</Text>)}
      <Pressable 
      onPress={() => showMode()}
      style={[styles.image6Icon, styles.iconLayout]}
      >
      <Image
        resizeMode="cover"
        source={require("../assets/calenderIcon.png")}
      />
      </Pressable>
      <Pressable 
      onPress={() => showMode1()}
      style={[styles.image7Icon, styles.iconLayout]}
      >
        <Image
        
        resizeMode="cover"
        source={require("../assets/calenderIcon.png")}
      />
      </Pressable>
      {
                    show && (
                        <DateTimePicker
                            value={date}
                            mode={"date"}
                            is24Hour={true}
                            onChange={onDateChange}
                        />
                    )
                }
                {
                    show1 && (
                        <DateTimePicker
                            value={date1}
                            mode={"date"}
                            is24Hour={true}
                            onChange={onDateChange1}
                        />
                    )
                }
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
    position:"absolute"
  },
  filter1: {
    textAlign: "left",
    right:"17%",
    color: Color.color,
    fontFamily: FontFamily.aBeeZeeRegular,
    fontSize: FontSize.size_xs,
    position:"absolute"
  },
  vectorIconSpaceBlock: {
    marginLeft: 11,
    height: 7,
  },
  thuNhpPosition: {
    top: 8,
    position: "absolute",
  },
  dateChoose: {
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
    height: 16,
    left:-2,
    top:-2
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
    top: "60%",
  },
  thuNhp: {
    left: 12,
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
  fromDate: {
    top: 19,
  },
  toDate: {
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
  dropdownIcon: {
    width: 40,
    height: 14,
    right:"-30%"
},
dropdownCategory: {
  height: 30,
  width:100
},
dropdownText: {fontSize: 12,color: Color.color, left:"30%"},
});

export default DropdownMenuVariant;
