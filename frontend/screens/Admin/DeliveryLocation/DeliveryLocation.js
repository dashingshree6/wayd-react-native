import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import {  Icon, Image, AirbnbRating } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StepIndicator from 'react-native-step-indicator';
import axios from "axios";

const API = 'https://c898-49-205-239-58.in.ngrok.io/api/lifecycle/'

const TOKEN= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA2NTQxNjZ9.0hJtqKtOvHWzFo7xpevgtcsFPznS8sSZXxIff_O2y4E"

export default function DeliveryLocation({navigation}) {
    const [currentPosition, setCurrentPosition] = useState(0);

    const labels = ["Order Accepted","Driver at the store","Order on the way","Order Recieved"];
    const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#3aa832',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#3aa832',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#3aa832',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#3aa832',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#3aa832',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#3aa832'
    }

    const [data, setData] = useState({})

    const getOrderLifecycle = () => {
        axios.get(API , { headers: {"Authorization" : `Bearer ${TOKEN}`} })
        .then(res => {
        console.log(res.data);
        setData(res.data)
        }).catch((error) => {
        console.log(error)
        });
    }

    useEffect(()=> {
        getOrderLifecycle()
    },[])

  return (
    <View>
      <ScrollView>
      <Text style={styles.delivery_loc_text}>Order Name : Grapes</Text>
      <Text style={styles.delivery_loc_text}>Quantity : 2kg</Text>
      <Text style={styles.delivery_loc_text}>Delivery Address: Madhapur</Text>

      <Text style={styles.delivery_loc_text_accept}>Your Order has been accepted.</Text>


      <View style={[styles.contentView]}>
        <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
            stepCount={4}
        />     
      </View>

        <View style={styles.delivery_lo_card}>
            <Text>Activity: Ordered</Text>
            <Text>Date: {data.ordered} </Text> 
            <Text>Location: </Text>
        </View>

        <View style={styles.delivery_lo_card}>
            <Text>Activity: Confirmed</Text>
            <Text>Date: {data.confirmed} </Text> 
            <Text>Location: </Text>
        </View>

        <View style={styles.delivery_lo_card}>
            <Text>Activity: Cancelled</Text>
            <Text>Date: {data.cancelled} </Text> 
            <Text>Location: </Text>
        </View>

        <View style={styles.delivery_lo_card}>
            <Text>Activity: Shipped</Text>
            <Text>Date: {data.shipped} </Text> 
            <Text>Location: </Text>
        </View>

        <View style={styles.delivery_lo_card}>
            <Text>Activity: Processing</Text>
            <Text>Date: {data.processing} </Text> 
            <Text>Location: </Text>
        </View>

        <View style={styles.delivery_lo_card}>
            <Text>Activity: Recieved</Text>
            <Text>Date: {data.recieved} </Text> 
            <Text>Location: </Text>
        </View>

        <View style={styles.delivery_lo_card}>
            <Text>Activity: Delivered</Text>
            <Text>Date: {data.delivered} </Text> 
            <Text>Location: </Text>
        </View>

        <Text style={styles.delivery_lo_card}>Delivered: {data.delivered}</Text>

        <Text style={styles.delivery_lo_card}>Payment Recieved delivery: </Text>

        <Text style={styles.delivery_lo_card}>WS Recieving Payment: </Text>

      <View style={styles.delivery_card}>
        <View style={styles.delivery_card_details}>
            <Image
            source={{ 
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU'  
            }}
            containerStyle={styles.delivery_loc_item}
            // PlaceholderContent={<ActivityIndicator />}
            />
            <View style={styles.delivery_card_details}>
                <Ionicons
                name='chatbubble-outline'
                size={25}
                />
                <Ionicons
                name='ios-call-outline'
                size={25}
                />

            </View>

        </View>
            <Text>Santosh Raj</Text>
            <Text>Estimated Time: 00:50 minutes</Text>
            <AirbnbRating
            count={5}
            reviews={[,
                'Bad',
                'OK',
                'Good',
                'Hmm...',
                'Ok'
            ]}
            defaultRating={3}
            size={20}
            />
      </View>

     </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    delivery_loc_text: {
        fontWeight:'bold',
        margin: 5
    },
    delivery_loc_text_accept: {
        fontWeight:'bold',
        margin: 5,
        fontSize: 25,
        textAlign: 'center'
    },
    delivery_card: {
        backgroundColor:'#ededeb',
        margin: 10
        // height: '50%'
    },
    delivery_loc_item: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 20
    },
    delivery_card_details: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    delivery_lo_card: {
        padding:10,
        backgroundColor:'silver',
        margin: 2
      }  
})