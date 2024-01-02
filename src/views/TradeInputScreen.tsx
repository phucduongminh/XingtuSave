import * as React from "react";
import { StyleSheet, View, Pressable, Text, Image, Alert } from "react-native";
import HeaderName from "../components/HeaderName";
import {TradeItemsComponent} from "../components/TradeItems";
import { Padding, Color, FontFamily, FontSize, Border } from "../theme/GlobalStyles";
import { useEffect, useState } from "react";
import { Input } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { AddTrades } from "../models/AddTrades";
import { createTradeTable, saveNewTrade } from "../controllers/TradeControllers";
import { getDBConnection } from "../controllers/connectDB";
import { useCategoryChoose } from "../controllers/CategoryChoose";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../navigators";

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

  type ProfileProps = NativeStackScreenProps<BottomTabParamList>;

const TradeInputScreen = ({ navigation }: ProfileProps) => {
    const [color1, setColor1] = useState('black');
    const [color2, setColor2] = useState('black');
    const [color3, setColor3] = useState('black');
    const [formType, setFormType] = useState('0');
    const [show, setShow] = useState(false);
    const [showDate, setShowDate] = useState(false);

    const [category, setCategory] = useState('');
    const [money, setMoney] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [selectedImage, setSelectedImage] = useState<string | undefined>();

    const cateChoose = useCategoryChoose();

    const openImagePicker = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('Image picker error: ', response.errorMessage);
            } else {
                let imageUri = response.assets?.[0] && response.assets[0].uri; // use the assets property instead
                setSelectedImage(imageUri);
            }
        });
    };

    const onDateChange = (e: DateTimePickerEvent, selectedDate: Date | undefined) => {
        // Check if selectedDate is defined before setting the date
        setShow(false)
        setShowDate(true)
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const showMode = () => {
        setShow(true)
    }

    const chooses = [
        { label: 'Khoản thu', value: '1' },
        { label: 'Khoản chi', value: '0' },
    ];

    const [trades, setTrades] = useState<AddTrades[]>([]);
    const [tradesList, setTradesList] = useState<AddTrades[]>([]);

      useEffect(() => {
        const loadDataCallback = async () => {
            try {
              if (trades.length>0) {
                setTradesList(trades)
              } else {
                setTradesList([])
              }
            } catch (error) {
              console.error(error);
            }
          };
        loadDataCallback();
      }, [trades]);

      const AddTrade = async () => {
        const db = await getDBConnection();
        await createTradeTable(db);
        try {
            // const newTrade = [ // Không cần tạo một mảng mới
            //     ...trades,
            // ];
            const db = await getDBConnection();
            await saveNewTrade(db, trades); // Truyền mảng trades vào hàm
            Alert.alert('Thêm giao dịch thành công', 'Dữ liệu của bạn đã được lưu.',[
                {text: 'OK', onPress: () => navigation.navigate("TradeHistory",{num: Math.random(),})},
              ]);
            setTrades([])
        } catch (error) {
            Alert.alert("Không thành công","Vui lòng nhập Thông tin.");
        }
    };

    return (
        <View style={styles.tradeinputscreen}>
            <Pressable
                style={styles.header}
            >
                <HeaderName />
            </Pressable>
            <Pressable onPress={AddTrade}>
                <View style={[styles.savebutton, styles.savebuttonSpaceBlock]}>
                    <Text style={styles.lu}>Lưu</Text>
                </View></Pressable>

            <View style={styles.formChoseDropdown}>
                <Dropdown
                    data={chooses}
                    value={formType}
                    onChange={(item) => setFormType(item.value)}
                    labelField="label"
                    valueField="value"
                    iconStyle={styles.dropdownIcon}
                    iconColor="black"
                    itemTextStyle={styles.formChoseList}
                />
            </View>
            <View style={[styles.addImageArea, styles.iconLayout]}>{selectedImage && (
                        <Image
                            source={{ uri: selectedImage }}
                            style={{ flex: 1 }}
                        />
                    )}</View>
            
            <View style={[styles.addImageArea1, styles.iconLayout]}>

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Pressable onPress={openImagePicker}>
                        <View style={[styles.rectangle]} />
                        <Text style={[styles.plus, styles.plusIcon]}>+</Text></Pressable>
                </View>
            </View>
            <View style={[styles.icon, styles.iconLayout]}>
                <Image
                    style={[styles.rectangleIcon]}
                    resizeMode="cover"
                    source={require("../assets/rectangle1.png")}
                />
            </View>
            <View style={[styles.inputCategory, styles.savebuttonSpaceBlock]}>
                {formType==='0'?(<Dropdown
                    style={[styles.dropdownCategory, { borderBottomColor: color1 }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.dropdownIcon}
                    data={cateChoose}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={'Danh mục *'}
                    searchPlaceholder="Search..."
                    onFocus={() => setColor1(Color.colorAquamarine)}
                    // Khi onBlur, gọi hàm setColor để đổi màu thành đen
                    onBlur={() => setColor1('black')}
                    onChange={item => {
                        setCategory(item.value)
                    }}
                />):(<Input
                    placeholder='Khoản thu'
                    style={{ ...styles.smallField }}
                    inputContainerStyle={{ borderColor: color1, borderBottomColor: color1 }}
                    // Khi onFocus, gọi hàm setColor để đổi màu thành xanh
                    onFocus={() => setColor1(Color.colorAquamarine)}
                    // Khi onBlur, gọi hàm setColor để đổi màu thành đen
                    onBlur={() => setColor1('black')}
                    onChangeText={(text) => setCategory(text)}
                />)}
            </View>
            <View style={styles.inputMoneyField}>
                <Input
                    placeholder='Số tiền *'
                    keyboardType='numeric'
                    style={{ ...styles.smallField }}
                    inputContainerStyle={{ borderColor: color2, borderBottomColor: color2 }}
                    // Khi onFocus, gọi hàm setColor để đổi màu thành xanh
                    onFocus={() => setColor2(Color.colorAquamarine)}
                    // Khi onBlur, gọi hàm setColor để đổi màu thành đen
                    onBlur={() => setColor2('black')}
                    value={money}
                    onChangeText={(text) => setMoney(text)}
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
                    inputContainerStyle={{ borderColor: color3, borderBottomColor: color3 }}
                    // Khi onFocus, gọi hàm setColor để đổi màu thành xanh
                    onFocus={() => setColor3(Color.colorAquamarine)}
                    // Khi onBlur, gọi hàm setColor để đổi màu thành đen
                    onBlur={() => setColor3('black')}
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                />
            </View>
            <View style={[styles.chooseDate, styles.savebuttonFlexBox]}>
                <Pressable onPress={() => showMode()}>
                    <Image
                        style={styles.chooseDateIcon}
                        resizeMode="cover"
                        source={require("../assets/rectangle2.png")}
                    />
                </Pressable>
                <Text style={styles.chooseDateText}>Chọn ngày tháng<Text style={{color:'red'}}>&#32;*</Text></Text>
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
                {showDate&&(<Text>:&#32;&#32;&#32;&#32;&#32;&#32;{getTrueDate(date)}</Text>)}
            </View>
            <View style={[styles.addbutton, styles.addbuttonLayout]}>
                <Pressable onPress={()=>{const newTrade =
                {
                    category: category,
                    money: Number(money),
                    image: String(selectedImage),
                    description: description,
                    date: getTrueDate(date),
                    income: Number(formType)
                };
                if(
                    category===''&&money===''&&showDate===false&&formType==='0'
                ){Alert.alert("Không thành công","Vui lòng nhập đủ Danh mục, Số tiền, Ngày tháng!");}
                else if
                (money===''&&showDate===false&&formType==='1'){
                Alert.alert("Không thành công","Vui lòng nhập đủ Số tiền, Ngày tháng!");
                }else{setTrades([...trades,newTrade]);}
            
            }}>
                    <View style={[styles.addbuttonChild, styles.addbuttonLayout]} />
                    <Text style={[styles.add, styles.addTypo]}>ADD +</Text>
                    </Pressable>
            </View>
            {tradesList.length > 0 && (
        tradesList.map((item, index) => (
          <View key={index} style={[styles.addedItemsWrapper, styles.addedPosition]}>
            <TradeItemsComponent item={item} />
          </View>
        ))
      )}
        </View>
    );
};

const styles = StyleSheet.create({
    savebuttonSpaceBlock: {
        padding: Padding.p_3xs,
        position: "absolute",
    },
    iconLayout: {
        height: 65,
        width: 65,
        position: "absolute",
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
    plusIcon: {
        display: "flex",
        fontSize: FontSize.size_17xl,
        fontFamily: FontFamily.aBeeZeeRegular,
        position: "absolute"
    },

    plus: {
        top: 7,
        left: 22,
        width: 36,
        height: 36,
        color: Color.color,
        position: "absolute",
    },
    addedPosition: {
        left: 18,
        padding: Padding.p_3xs,
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
        left: "25%",
        width: 386,
        height: 40,
        position: "absolute",
    },
    lu: {
        textAlign: "center",
        fontFamily: FontFamily.aBeeZeeRegular,
        fontSize: FontSize.size_base,
        color: Color.color,
        letterSpacing: 1,
    },
    savebutton: {
        left: "75%",
        top:29,
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
        top: 235,
        left: 40,
    },
    addImageArea: {
        top: 90,
        left: 40,
        position: "absolute",
        overflow:"visible"
    },
    addImageArea1: {
        top: 165,
        left: 40,
        overflow:"hidden"
    },iconLayout1:{height: 65,
        width: 65,},
    chooseDateIcon: {
        width: 34,
        height: 34,
        borderRadius: Border.br_7xs,
    },
    chooseDateText: {
        width: 160,
        height: 20,
        fontSize: FontSize.size_sm,
        textAlign: "center",
        color: Color.color,
        fontFamily: FontFamily.aBeeZeeRegular,
        letterSpacing: 1,
    },
    chooseDate: {
        top: 376,
        left: 40,
        position: "absolute",
    },
    inputMoneyField: {
        top: 240,
        left: "30%",
        width: "60%",
        position: "relative"
    },
    iconDescription: {
        top: 40,
        left: "90%",
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
        width: 340,
        position: "absolute",
    },
    category: {
        zIndex: 0,
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
        position: "relative",
        backgroundColor: Color.colorGainsboro,
    },

    formChoseList: {
        fontSize: 16,
        textAlign: "left",
        fontFamily: FontFamily.aBeeZeeRegular,
        color: Color.color,

    },
    formChoseDropdown: {
        top: 98,
        left: "34%",
        width: 115,
        height: 50,
        position: "absolute",
    },
    addedItemsWrapper: {
        top: 400,
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
        left: 180,
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
    },
    dropdownCategory: {
        height: 45,
        borderBottomWidth: 0.5,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    dateText: {
        top:"90%",
    left:"3%",
        position: "absolute",
        color:"black"
      },
});

export default TradeInputScreen;