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
import { ToDoItem } from '../models/ToDoItem';
import { getDBConnection, getTodoItems, saveTodoItems, createTable, deleteTodoItem } from '../controllers/db-service';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type ProfileProps = NativeStackScreenProps<RootStackParamList>;

const ShowPlan = ({ navigation }: ProfileProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [todos, setTodos] = useState<ToDoItem[]>([]);

  const loadDataCallback = useCallback(async () => {
    try {
      const initPlans = [{ id: 0, value: 'No Plans for this month, want to create one?' }];
      const db = await getDBConnection();
      await createTable(db);
      const storedPlanItems = await getTodoItems(db);
      if (storedPlanItems.length) {
        setTodos(storedPlanItems);
      } else {
        await saveTodoItems(db, initPlans);
        setTodos(initPlans);
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
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <TouchableOpacity onPress={()=>navigation.navigate("NewPlan")}>
        <Image
        style={styles.cariconLayout}
        resizeMode="cover"
        source={require("../assets/additem.png")}
      />
      </TouchableOpacity>
        <View style={[styles.appTitleView]}>
          <Text style={styles.appTitleText}> Kế hoạch chi tiêu trong tháng  </Text>
        </View>
        <View>
          {todos.map((todo) => (
            <ToDoItemComponent key={todo.id} todo={todo} deleteItem={deleteItem} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  appTitleView: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  appTitleText: {
    fontSize: 24,
    fontWeight: '800'
  },
  cariconLayout: {
    height: 24,
    width: 24,
    position: "absolute",
  },
});
export default ShowPlan;