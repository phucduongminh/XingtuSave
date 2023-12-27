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
import Modal from 'react-native-modal';

import { ToDoPlanComponent } from '../components/ToDoPlan';
import { Plans } from '../models/Plans';
import { getDBConnection, getTodoPlans, createTable, deleteTodoPlan } from '../controllers/PlanControllers';
import NewPlan from './NewPlan';
import MoneyCalulate1 from "../components/MoneyCalulate1";
import { FontFamily, Color } from "../GlobalStyles";

const ShowPlan = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [todos, setTodos] = useState<Plans[]>([]);
  const [isModalVisible, setModalVisible] = useState(false); // State để quản lý hiển thị/ẩn modal

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onAddPlanSuccess = () => {
    setModalVisible(false); // Ẩn modal khi addPlan thành công
    // Nếu cần làm gì đó sau khi addPlan thành công, thêm code ở đây
  }; 

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
      <MoneyCalulate1 />
      <Text
            style={styles.allMyExpenses}
          >{`Chi tiêu dự kiến của bạn trong tháng này `}</Text>
        <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
          <Image
            style={styles.addButtonIcon}
            resizeMode="cover"
            source={require("../assets/additem.png")}
          />
        </TouchableOpacity>
        {todos.length === 0 && <Text style={styles.noPlansText}>Chưa có kế hoạch chi tiêu cho tháng này !!!</Text>}
        {todos.length > 0 && (
        todos.map((item, index) => (
          <View key={item.id.toString()}>
            <ToDoPlanComponent item={item}
              deleteItem={deleteItem} />
          </View>
        ))
      )}
      </ScrollView>
        {/* Modal */}
      <Modal isVisible={isModalVisible}>
          {/* Nội dung của modal */}
          <NewPlan onAddPlanSuccess={onAddPlanSuccess} />
          {/* Nút để ẩn modal */}
          <TouchableOpacity onPress={toggleModal}>
            <Text>Hide Modal</Text>
          </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
          }
  const styles = StyleSheet.create({
    container: {
      height:"100%",
      backgroundColor: '#fff',
    },
    appTitleView: {
      top:20,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    appTitleText: {
      fontSize: 16,
      fontFamily: FontFamily.aBeeZeeRegular,
    color: Color.colorDarkslategray,
    },
    addButton: {
      position: 'absolute',
      top: 140,
      right: 10,
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
    },
    allMyExpenses: {
      marginTop: -260,
      top: "50%",
      left: "4%",
      fontSize: 14,
      letterSpacing: 1,
      fontFamily: FontFamily.abelRegular,
      color: Color.colorDarkslategray,
      textAlign: "left",
      position: "absolute",
    },
  });
  
  
export default ShowPlan;