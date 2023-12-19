import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../App';
import { getDBConnection, saveTodoItems, createTable } from '../controllers/db-service';
import { AddPlans } from '../models/AddPlans';

type ProfileProps = NativeStackScreenProps<RootStackParamList>;

export default function NewPlan({ navigation }: ProfileProps) {
  const isDarkMode = useColorScheme() === 'dark';
  const [newCategory, setNewCategory] = useState('');
  const [todos, setTodos] = useState<AddPlans[]>([]);
  const [money, setMoney] = useState('');

  const addPlan = async () => {
    const db = await getDBConnection();
    await createTable(db);
    if (!newCategory.trim()) return;
    try {
      const newTodos = [
        ...todos,
        {
          category: newCategory,
          money: Number(money)
        },
      ];
      setTodos(newTodos);
      const db = await getDBConnection();
      await saveTodoItems(db, newTodos);
      navigation.navigate('ShowPlan');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={[styles.appTitleView]}>
          <Text style={styles.appTitleText}>Thêm kế hoạch chi tiêu tháng</Text>
        </View>
        <Text style={styles.title}>Nhập kế hoạch chi tiêu</Text>
        <View style={styles.input1}>
          <TextInput
            style={styles.input}
            placeholder="Tên danh mục"
            value={newCategory}
            onChangeText={setNewCategory}
          />
          <TextInput
        style={styles.input}
        placeholder="Số tiền"
        value={money}
        onChangeText={setMoney}
        keyboardType="numeric"
      />
          <Button title="Lưu" onPress={addPlan} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    backgroundColor: '#fff',
  },
  appTitleView: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  input1: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    bottom:0
  },
  input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
