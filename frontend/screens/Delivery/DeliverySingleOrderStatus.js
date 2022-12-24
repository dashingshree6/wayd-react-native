import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Icon, Image, AirbnbRating} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StepIndicator from 'react-native-step-indicator';
import axios from 'axios';

const API =
  'https://e56d-49-205-239-58.in.ngrok.io/api/lifecycle/639476eacfe9003c7ff4fe7d';
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA4NzQzODN9.p2pTjEY0jEMGK7qhJYDTRrpqS5mAQgv5Weo-QPRNi_4';

//when delivery partner click on the specific order from (DeliveryHomePage.js) this component will open up.
const DeliverySingleOrderStatus = ({navigation}) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const labels = [
    'Order Accepted',
    'Driver at the store',
    'Order on the way',
    'Order Recieved',
  ];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
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
    currentStepLabelColor: '#3aa832',
  };

  const [data, setData] = useState({});

  const getOrderLifecycle = () => {
    axios
      .get(API, {headers: {Authorization: `Bearer ${TOKEN}`}})
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOrderLifecycle();
  }, []);

  return (
    <View>
      <ScrollView>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  delivery_loc_text: {
    fontWeight: 'bold',
    margin: 5,
  },
  delivery_loc_text_accept: {
    fontWeight: 'bold',
    margin: 5,
    fontSize: 25,
    textAlign: 'center',
  },
  delivery_card: {
    backgroundColor: '#ededeb',
    margin: 10,
    // height: '50%'
  },
  delivery_loc_item: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 20,
  },
  delivery_card_details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  delivery_lo_card: {
    padding: 10,
    backgroundColor: 'silver',
    margin: 2,
  },
});

export default DeliverySingleOrderStatus;
