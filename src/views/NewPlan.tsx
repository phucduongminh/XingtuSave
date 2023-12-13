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
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from '../../App';
import { getDBConnection, saveTodoItems, createTable } from '../controllers/db-service';
import { ToDoItem } from '../models/ToDoItem';

type ProfileProps = NativeStackScreenProps<RootStackParamList>;

export default function NewPlan({ navigation }: ProfileProps) {
    const isDarkMode = useColorScheme() === 'dark';
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState<ToDoItem[]>([]);
    const [age, setAge] = useState('');

    const addPlan = async () => {
        const db = await getDBConnection();
        await createTable(db);
        if (!newTodo.trim()) return;
        try {
          const newTodos = [...todos, {
            id: todos.length ? todos.reduce((acc, cur) => {
              if (cur.id > acc.id) return cur;
              return acc;
            }).id + 1 : 0, value: newTodo
          }];
          setTodos(newTodos);
          const db = await getDBConnection();
          await saveTodoItems(db, newTodos);
          setNewTodo('');
          navigation.navigate("ShowPlan")
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    <ScrollView
      contentInsetAdjustmentBehavior="automatic">
      <View style={[styles.appTitleView]}>
        <Text style={styles.appTitleText}> Thêm kế hoạch chi tiêu tháng  </Text>
      </View>
      <Text style={styles.title}>Nhập kế hoạch chi tiêu</Text>
      <View style={styles.input}>
        <TextInput
        style={styles.input}
        placeholder="Tên danh mục"
        value={newTodo}
        onChangeText={text => setNewTodo(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Số tiền"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
        <Button
          onPress={addPlan}
          title="Lưu"
          accessibilityLabel="Add plan item"
          color="#841584"
        />
      </View>
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 10,
    padding: 10,
    marginBottom:10,
  },
  appTitleView: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  appTitleText: {
    fontSize: 24,
    fontWeight: '800'
  },
});