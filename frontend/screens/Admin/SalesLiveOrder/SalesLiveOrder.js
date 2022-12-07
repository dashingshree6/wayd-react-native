import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    FlatList
  } from 'react-native';

const SalesLiveOrder = ({ navigation, route  }) => {
    return (
        <SafeAreaView>
                <View style={styles.sales_lo_view}>
                      <Text style={styles.sales_lo_card}>Placed: </Text>

                      <Text style={styles.sales_lo_card}>Accepted: </Text>

                      <Text style={styles.sales_lo_card}>Assigned: </Text>

                      <Text style={styles.sales_lo_card}>Packing: </Text>

                      <Text style={styles.sales_lo_card}>Shipping: </Text>

                      <Text style={styles.sales_lo_card}>Payment Recieved delivery: </Text>

                      <Text style={styles.sales_lo_card}>WS Recieving Payment: </Text>
     
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    sales_lo_view: {
        padding: 20
    },
    sales_lo_card: {
      padding:10,
      backgroundColor:'silver',
      margin: 2
    }  
});
export default SalesLiveOrder;