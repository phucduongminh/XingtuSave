import React, { useCallback, useEffect, useState } from 'react';
import {
    Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { ToDoItemComponent } from '../components/ToDoItem';
import { Plans } from '../models/Plans';
import { getDBConnection, getTodoItems, saveTodoItems, createTable, deleteTodoItem } from '../controllers/db-service';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type ProfileProps = NativeStackScreenProps<RootStackParamList>;

const ShowPlan = ({ navigation }: ProfileProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [todos, setTodos] = useState<Plans[]>([]);

  const loadDataCallback = useCallback(async () => {
    try {
      const initPlans = [{ category: 'No Plans', money:1 }];
      const db = await getDBConnection();
      await createTable(db);
      const storedPlanItems = await getTodoItems(db);
      if (storedPlanItems.length) {
        setTodos(storedPlanItems);
      } else {
        await saveTodoItems(db, initPlans);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const deleteItem = async (id: number) => {
    try {
      const db = await getDBConnection();
      await deleteTodoItem(db, id);
      todos.splice(id, 1);
      setTodos(todos.slice(0));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.appTitleView}>
        <Text style={styles.appTitleText}>Kế hoạch chi tiêu trong tháng</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("NewPlan")}>
          <Image
            style={styles.addButtonIcon}
            resizeMode="cover"
            source={require("../assets/additem.png")}
          />
        </TouchableOpacity>
  
        <View style={styles.todoList}>
          {todos.map((todo) => (
            <ToDoItemComponent key={todo.id} todo={todo} deleteItem={deleteItem} />
          ))}
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
    addButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      padding: 10,
    },
    addButtonIcon: {
      height: 24,
      width: 24,
    },
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    todoList: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
  });
  
  
export default ShowPlan;