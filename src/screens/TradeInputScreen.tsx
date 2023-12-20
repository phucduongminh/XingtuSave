import * as React from "react";
import { StyleSheet, View, Pressable, Text, Image } from "react-native";
import HeaderName from "../components/HeaderName";
import AddedItems from "../components/AddedItems";
import { Padding, Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useState } from "react";
import { Input } from '@rneui/themed';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

const TradeInputScreen = () => {
    
  const [color1, setColor1] = useState('black');
  const [color2, setColor2] = useState('black');
  const [color3, setColor3] = useState('black');
  const [formType, setFormType] = useState('expense');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [show,setShow] = useState(false);

  const onDateChange = (e: DateTimePickerEvent, selectedDate: Date | undefined) => {
    // Check if selectedDate is defined before setting the date
    setShow(false)
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showMode = () => {
    setShow(true)
  }

  const options = [
    {label: 'Khoản thu', value: 'income'},
    {label: 'Khoản chi', value: 'expense'},
  ];

  return (
    <View style={styles.tradeinputscreen}>
      <Pressable
        style={styles.header}
      >
        <HeaderName />
      </Pressable>
      <View style={[styles.savebutton, styles.savebuttonSpaceBlock]}>
        <Text style={styles.lu}>Lưu</Text>
      </View>
      <View style={styles.formChoseDropdown}>
      <Dropdown
        data={options}
        value={formType}
        onChange={(item) => setFormType(item.value)}
        labelField="label"
        valueField="value"
        iconStyle={styles.dropdownIcon}
        iconColor="black"
        itemTextStyle={styles.formChoseList}
      />
      </View>
      <View style={[styles.icon1, styles.iconLayout4]}>
        <View style={[styles.rectangle, styles.rectangleIconPosition]} />
        <Text style={[styles.text, styles.textTypo]}>+</Text>
      </View>
      <View style={[styles.icon, styles.iconLayout4]}>
        <Image
          style={[styles.rectangleIcon, styles.rectangleIconPosition]}
          resizeMode="cover"
          source={require("../assets/rectangle1.png")}
        />
      </View>
      <View style={[styles.inputCategory, styles.savebuttonSpaceBlock]}>
      <Dropdown
          style={[styles.dropdownCategory, {borderBottomColor: color1}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.dropdownIcon}
          data={options}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Danh mục'}
          searchPlaceholder="Search..."
          value={category}
          onFocus={() => setColor1(Color.colorAquamarine)}
            // Khi onBlur, gọi hàm setColor để đổi màu thành đen
            onBlur={() => setColor1('black')}
          onChange={item => {
            setCategory(item.value)
          }}
        />
      </View>
      <View style={styles.inputMoneyField}>
        <Input
            placeholder='Số tiền'
            keyboardType='numeric'
            style={{ ...styles.smallField }}
            inputContainerStyle={{borderColor: color2, borderBottomColor: color2}}
            // Khi onFocus, gọi hàm setColor để đổi màu thành xanh
            onFocus={() => setColor2(Color.colorAquamarine)}
            // Khi onBlur, gọi hàm setColor để đổi màu thành đen
            onBlur={() => setColor2('black')}
          />
      </View>
      <View style={styles.inputDescriptionField}>
      <Image
          style={styles.iconDescription}
          resizeMode="cover"
          source={require("../assets/icon-description.png")}
        />
        <Input
            placeholder='Thêm mô tả...'
            style={{ ...styles.description }}
            inputContainerStyle={{borderColor: color3, borderBottomColor: color3}}
            // Khi onFocus, gọi hàm setColor để đổi màu thành xanh
            onFocus={() => setColor3(Color.colorAquamarine)}
            // Khi onBlur, gọi hàm setColor để đổi màu thành đen
            onBlur={() => setColor3('black')}
          />
      </View>
      <View style={[styles.choosedate, styles.savebuttonFlexBox]}>
        <Pressable onPress={()=>showMode()}>
        <Image
          style={styles.rectangleIcon1}
          resizeMode="cover"
          source={require("../assets/rectangle2.png")}
        />
        </Pressable>
        <Text style={styles.chnNgyThng}>Chọn ngày tháng *</Text>
        {
            show&&(
                <DateTimePicker
                value={date}
                mode={"date"}
                is24Hour={true}
                onChange={onDateChange}
                />
            )
        }
      </View>
      <View style={[styles.addbutton, styles.addbuttonLayout]}>
        <View style={[styles.addbuttonChild, styles.addbuttonLayout]} />
        <Text style={[styles.add, styles.addTypo]}>+ ADD</Text>
      </View>
      <View style={[styles.addedItemsWrapper, styles.addedPosition]}>
        <AddedItems />
      </View>
      <View style={[styles.morebutton, styles.savebuttonSpaceBlock]}>
        <Image
          style={styles.showMoreIcon}
          resizeMode="cover"
          source={require("../assets/show-more.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  savebuttonSpaceBlock: {
    padding: Padding.p_3xs,
    position: "absolute",
  },
  iconLayout4: {
    height: 65,
    width: 65,
    position: "absolute",
  },
  rectangleIconPosition: {
    left: 0,
    top: 0,
  },
  savebuttonFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  smallField: {
    height: 22,
    textAlign: "left",
    color: Color.color,
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    fontSize: FontSize.size_base,
  },
  dropdownIcon: {
    width: 40,
    height: 40
  },
  textTypo: {
    display: "flex",
    fontSize: FontSize.size_17xl,
    textAlign: "left",
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    alignItems: "center",
  },
  addedPosition: {
    left: 18,
    padding: Padding.p_3xs,
    position: "absolute",
  },
  addedItemsShadowBox: {
    elevation: 48,
    shadowRadius: 48,
    backgroundColor: Color.colorWhite,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  iconLayout2: {
    height: 46,
    width: 47,
  },
  julyTypo: {
    color: Color.colorLightslategray,
    fontSize: FontSize.size_xs,
    left: "0.08%",
    top: "50%",
    textAlign: "left",
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
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
  addbuttonLayout: {
    width: 241,
    height: 40,
    position: "absolute",
  },
  addTypo: {
    textAlign: "left",
    fontFamily: FontFamily.aBeeZeeRegular,
  },
  header: {
    top: 27,
    left: 14,
    width: 386,
    height: 40,
    position: "absolute",
    overflow: "hidden",
  },
  lu: {
    textAlign: "center",
    fontFamily: FontFamily.aBeeZeeRegular,
    fontSize: FontSize.size_base,
    color: Color.color,
    letterSpacing: 1,
  },
  savebutton: {
    top: 29,
    left: 349,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.colorGainsboro,
  },
  rectangleIcon: {
    borderRadius: Border.br_7xs,
    height: 65,
    width: 65,
    position: "absolute",
  },
  icon: {
    top: 231,
    left: 40,
  },
  rectangleIcon1: {
    width: 34,
    height: 34,
    borderRadius: Border.br_7xs,
  },
  chnNgyThng: {
    width: 160,
    height: 20,
    fontSize: FontSize.size_sm,
    textAlign: "center",
    color: Color.color,
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
  },
  choosedate: {
    top: 376,
    left: 40,
    position: "absolute",
  },
  inputMoneyField: {
    top: 240,
    left: "30%",
    width:"60%",
    position:"relative"
  },
  iconDescription: {
    top:40,
    left:"90%",
    width: 21,
    zIndex: 1,
    height: 20,
    position: "relative",
  },
  description: {
    width: 154,
    marginTop: 5,
    zIndex: 2,
    textAlign: "left",
    color: Color.color,
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    fontSize: FontSize.size_base,
  },
  inputDescriptionField: {
    top: 280,
    left: "10%",
    width:340,
    position: "absolute",
  },
  category: {
    zIndex: 0,
  },
  inputCategoryChild: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowRadius: 4,
    elevation: 4,
    width: 226,
    marginTop: 10,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    borderColor: Color.color,
    zIndex: 1,
    height: 3,
    borderTopWidth: 3,
    borderStyle: "solid",
  },
  selectbuttonIcon: {
    right: 6,
    bottom: 38,
    zIndex: 2,
  },
  inputCategory: {
    top: 163,
    width: 235,
    height: 68,
    left: "30%",
  },
  rectangle: {
    borderRadius: Border.br_7xs,
    height: 65,
    width: 65,
    position: "absolute",
    backgroundColor: Color.colorGainsboro,
  },
  text: {
    top: 21,
    left: 22,
    width: 26,
    height: 26,
    color: Color.color,
    position: "absolute",
  },
  icon1: {
    top: 152,
    left: 40,
  },
  formChoseList: {
    fontSize: 16,
    textAlign: "left",
    fontFamily: FontFamily.aBeeZeeRegular,
    color: Color.color,

  },
  icon2: {
    top: 2,
    left: 124,
  },
  formChoseDropdown: {
    top: 98,
    left: "34%",
    width: 115,
    height: 50,
    position: "absolute",
  },
  addedItemsWrapper: {
    top: 515,
  },
  text1: {
    color: "#fd0f0f",
    width: 10,
    height: 10,
  },
  rectangleIcon2: {
    borderRadius: Border.br_7xs,
    left: 0,
    top: 0,
    position: "absolute",
  },
  icon3: {
    marginLeft: 10,
  },
  rentalIncome: {
    marginTop: -18,
    color: Color.colorDarkslategray,
    left: "0.08%",
    top: "50%",
    width: "31.18%",
    textAlign: "left",
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    position: "absolute",
  },
  july2021: {
    marginTop: 4,
    width: "31.18%",
    color: Color.colorLightslategray,
    fontSize: FontSize.size_xs,
  },
  july2022: {
    marginTop: 19,
    width: "83.65%",
    height: 15,
  },
  text2: {
    marginTop: -10,
    width: "63.08%",
    left: "36.92%",
    fontSize: FontSize.size_lg,
    color: "#fb1717",
    textAlign: "right",
    top: "50%",
    fontFamily: FontFamily.aBeeZeeRegular,
    letterSpacing: 1,
    position: "absolute",
  },
  info: {
    width: 263,
    height: 36,
    marginLeft: 10,
    overflow: "hidden",
  },
  addedItems: {
    shadowColor: "rgba(0, 0, 0, 0.06)",
    paddingHorizontal: Padding.p_11xs,
    paddingVertical: Padding.p_sm,
    borderRadius: Border.br_7xs,
    alignItems: "center",
    flexDirection: "row",
  },
  addedItemsContainer: {
    top: 609,
  },
  showMoreIcon: {
    width: 30,
    height: 30,
  },
  morebutton: {
    top: 724,
    left: 175,
    flexDirection: "row",
    padding: Padding.p_3xs,
  },
  addbuttonChild: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorAquamarine,
    left: 0,
    top: 0,
  },
  add: {
    top: 11,
    fontSize: 20,
    lineHeight: 20,
    color: "#f4f3f6",
    width: 104,
    height: 14,
    left: 86,
    position: "absolute",
  },
  addbutton: {
    top: 428,
    left: 86,
  },
  tradeinputscreen: {
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorGray,
    flex: 1,
    width: "100%",
    height: 896,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    backgroundColor: '#533483',
    padding: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  dropdownCategory: {
    height: 45,
    borderBottomWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default TradeInputScreen;
