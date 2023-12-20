import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
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
import { ToDoPlanComponent } from '../components/ToDoPlan';
import { Plans } from '../models/Plans';
import { getDBConnection, getTodoPlans, createTable, deleteTodoPlan } from '../controllers/PlanControllers';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type ProfileProps = NativeStackScreenProps<RootStackParamList>;

const ShowPlan = ({ navigation }: ProfileProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [todos, setTodos] = useState<Plans[]>([]); 

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const storedPlanItems = await getTodoPlans(db);
      if (storedPlanItems.length) {
        setTodos(storedPlanItems);
      } else {
        setTodos([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [todos]);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const deleteItem = async (id: number) => {
    try {
      const db = await getDBConnection();
      await deleteTodoPlan(db, id);
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
        {todos.length === 0 && <Text style={styles.noPlansText}>Chưa có kế hoạch chi tiêu cho tháng này !!!</Text>}
      </ScrollView>
      <FlatList
          data={todos}
          renderItem={({ item }) => (
            <ToDoPlanComponent
              item={item}
              deleteItem={deleteItem}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
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
    addButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      padding: 10,
    },
    addButtonIcon: {
      height: 28,
      width: 28,
    },
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    noPlansText: {
      fontSize: 18,
      color: 'gray',
      textAlign: 'center',
      marginTop: 20,
    },
  });
  
  
export default ShowPlan;