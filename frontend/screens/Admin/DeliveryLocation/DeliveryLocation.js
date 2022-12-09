import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import {  Icon, Image, AirbnbRating } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StepIndicator from 'react-native-step-indicator';

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

  return (
    <View>
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
    }
})