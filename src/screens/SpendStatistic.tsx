import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PieChart from 'react-native-pie-chart';

const SpendStatistic = () => {
    const widthAndHeight = 250
    const series = [430, 321, 185, 123, 80]
    const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00']
  
    return (
      <View style={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Doughnut</Text>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.6}
          />
        </View>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    scrollContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      margin: 10,
    },
  })

export default SpendStatistic;