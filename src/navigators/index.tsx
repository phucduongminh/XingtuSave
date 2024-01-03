import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { COLORS } from '../theme/theme';
import TradeInputScreen from '../views/TradeInputScreen';
import ShowPlan from '../views/ShowPlan';
import TradeHistory from '../views/TradeHistory';
import SpendStatistic from '../views/SpendStatistic';
import Advice from '../views/Advice';
import { NavigationContainer } from '@react-navigation/native';

type TradeHistoryScreenParams = {
  num:number;
};

export type BottomTabParamList = {
  TradeInputScreen: undefined;
  TradeHistory: TradeHistoryScreenParams;
  ShowPlan: undefined;
  SpendStatistic:undefined;
  Advice:undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

// Tạo một interface để mô tả context
interface ParamsContextType {
  params: { // Thuộc tính params là một đối tượng
    age: number; // Thuộc tính age là một số
  };
  changeParams: (newParams: {age: number}) => void; // Thuộc tính changeParams là một hàm nhận một đối tượng có thuộc tính age là một số và không trả về gì
}

// Tạo một context để lưu trữ các tham số và sử dụng kiểu dữ liệu đã định nghĩa
export const ParamsContext = React.createContext<ParamsContextType>({
  params: { // Khởi tạo giá trị ban đầu cho params
    age: 0 // Giá trị mặc định cho age
  },
  changeParams: () => {} // Khởi tạo giá trị ban đầu cho changeParams là một hàm rỗng
});

// Tạo một component để cung cấp context cho các màn hình con
const ParamsProvider = ({children}: {children: React.ReactNode}) => { // Chỉ định kiểu dữ liệu của children là React.ReactNode
  const [params, setParams] = useState({age: 0}); // Sử dụng state để lưu trữ và cập nhật các tham số và khởi tạo giá trị ban đầu cho age

  // Tạo một hàm để thay đổi các tham số
  const changeParams = (newParams: {age: number}) => { // Chỉ định kiểu dữ liệu của newParams là một đối tượng có thuộc tính age là một số
    setParams(newParams);
  };

  // Trả về một provider với giá trị là params và changeParams
  return (
    <ParamsContext.Provider value={{params, changeParams}}>
      {children}
    </ParamsContext.Provider>
  );
}; 

const TabNavigator = () => {
  const {changeParams} = useContext(ParamsContext); // Sử dụng useContext hook để truy cập vào context
  return (
    <ParamsProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBarStyle,
          }}>
          <Tab.Screen
            name="TradeInputScreen"
            component={TradeInputScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  name="add-box"
                  size={25}
                  color={
                    focused ? COLORS.primaryBlueHex : COLORS.primaryDarkGreyHex
                  }
                  onPress={() => { // Tạo một hàm onPress riêng và nhận tham số e
                    // Thay đổi các tham số theo ý muốn
                    changeParams({age: Math.random()});
                    // Gọi hàm onPress của tabBarButton để chuyển màn hình
                  }}
                />
              ),
            }}
            ></Tab.Screen>
            
          <Tab.Screen
            name="TradeHistory"
            component={TradeHistory}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  name="schedule"
                  size={25}
                  color={
                    focused ? COLORS.primaryBlueHex : COLORS.primaryDarkGreyHex
                  }
                  onPress={() => { // Tạo một hàm onPress riêng
                    // Thay đổi các tham số theo ý muốn
                    changeParams({age: Math.random()});
                  }}
                />
              ),
            }}
            initialParams={{ num: 0 }}
            ></Tab.Screen>

          <Tab.Screen
            name="ShowPlan"
            component={ShowPlan}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  name="assignment"
                  size={25}
                  color={
                    focused ? COLORS.primaryBlueHex : COLORS.primaryDarkGreyHex
                  }
                  onPress={() => { // Tạo một hàm onPress riêng
                    // Thay đổi các tham số theo ý muốn
                    changeParams({age: Math.random()});
                  }}
                />
              ),
            }}></Tab.Screen>

          <Tab.Screen
            name="SpendStatistic"
            component={SpendStatistic}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  name="donut-small"
                  size={25}
                  color={
                    focused ? COLORS.primaryBlueHex : COLORS.primaryDarkGreyHex
                  }
                  onPress={() => { // Tạo một hàm onPress riêng
                    // Thay đổi các tham số theo ý muốn
                    changeParams({age: Math.random()});
                  }}
                />
              ),
            }}></Tab.Screen>

            <Tab.Screen
            name="Advice"
            component={Advice}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  name="shopping-cart-checkout"
                  size={25}
                  color={
                    focused ? COLORS.primaryBlueHex : COLORS.primaryDarkGreyHex
                  }
                  onPress={() => { // Tạo một hàm onPress riêng
                    // Thay đổi các tham số theo ý muốn
                    changeParams({age: Math.random()});
                  }}
                />
              )
            }}></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </ParamsProvider>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 45,
    position: 'absolute',
    backgroundColor: '#ededed',
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TabNavigator;