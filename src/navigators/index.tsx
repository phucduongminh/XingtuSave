import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { COLORS } from '../theme/theme';
import TradeInputScreen from '../views/TradeInputScreen';
import ShowPlan from '../views/ShowPlan';
import TradeHistory from '../views/TradeHistory';
import SpendStatistic from '../views/SpendStatistic';
import Advice from '../views/Advice';

// Define the type for the TradeInputScreen params
type TradeInputScreenParams = {
  // Add any params that you need to pass to this screen
  num:number;
};

// Define the type for the TradeHistoryScreen params
type TradeHistoryScreenParams = {
  // Add any params that you need to pass to this screen
  num:number;
};

// Define the type for the other screens
// ...

// Define the type for the bottom tab navigator
export type BottomTabParamList = {
  TradeInputScreen: TradeInputScreenParams;
  TradeHistory: TradeHistoryScreenParams;
  ShowPlan: undefined;
  SpendStatistic:undefined;
  Advice:undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabNavigator = () => {
  return (
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
              size={size}
              color={
                focused ? COLORS.primaryBlueHex : COLORS.primaryDarkGreyHex
              }
            />
          ),
        }}
        initialParams={{ num: Math.random() }}
        ></Tab.Screen>
      <Tab.Screen
        name="TradeHistory"
        component={TradeHistory}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="schedule"
              size={size}
              color={
                focused ? COLORS.primaryBlueHex : COLORS.primaryDarkGreyHex
              }
            />
          ),
        }}
        initialParams={{ num: Math.random() }}
        ></Tab.Screen>
      <Tab.Screen
        name="ShowPlan"
        component={ShowPlan}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="assignment"
              size={size}
              color={
                focused ? COLORS.primaryBlueHex : COLORS.primaryDarkGreyHex
              }
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
            />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
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