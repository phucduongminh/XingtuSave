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

import { getDBConnection, saveTodoPlans, createTable } from '../controllers/PlanControllers';
import { AddPlans } from '../models/AddPlans';

interface NewPlanProps {
  onAddPlanSuccess: () => void;
}

const NewPlan: React.FC<NewPlanProps> = ({ onAddPlanSuccess }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [newCategory, setNewCategory] = useState("");
  const [todos, setTodos] = useState<AddPlans[]>([]);
  const [money, setMoney] = useState('');

  const addPlan = async () => {
    const db = await getDBConnection();
    await createTable(db);
    try {
      const newTodos = [
        ...todos,
        {
          category: String(newCategory),
          money: Number(money),
        },
      ];
      setTodos(newTodos);
      const db = await getDBConnection();
      await saveTodoPlans(db, newTodos);
      onAddPlanSuccess(); // Gọi callback khi addPlan thành công
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
          <Button title="Lưu" color="pink" onPress={addPlan} />
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
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

export default NewPlan;
