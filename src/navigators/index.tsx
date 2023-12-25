import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { COLORS } from '../theme/theme';
import TradeInputScreen from '../screens/TradeInputScreen';
import ShowPlan from '../screens/ShowPlan';
import TradeHistory from '../screens/TradeHistory';
import SpendStatistic from '../screens/SpendStatistic';
import Advice from '../screens/Advice';

const Tab = createBottomTabNavigator();

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
        }}></Tab.Screen>
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
        }}></Tab.Screen>
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