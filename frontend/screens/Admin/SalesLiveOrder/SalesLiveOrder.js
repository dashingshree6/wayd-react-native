import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    FlatList
  } from 'react-native';
import axios from "axios";

// const API = 'https://c898-49-205-239-58.in.ngrok.io';
const API = 'https://c898-49-205-239-58.in.ngrok.io/api/lifecycle/637dfd6345335151184e5ebb'

const TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA1ODU4NTN9.HD6iKwWOVRX26Uq_ml58UEGrC1TmfspnQH1wpZOUdBA'

const SalesLiveOrder = ({ navigation, route  }) => {
    const [data, setData] = useState({})

    const getOrderLifecycle = () => {
        axios.get(api , { headers: {"Authorization" : `Bearer ${TOKEN}`} })
        .then(res => {
        console.log(res.data);
        setData()
        }).catch((error) => {
        console.log(error)
        });
    }
    // const callProducts = () => {
    //     getAllProducts().then(res => {
    //         console.log(res)
    //         setData(res)
    //     }).catch(err => console.log(err))
    //   }
    //   useEffect(()=>{callProducts()})
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