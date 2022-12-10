import { Image } from '@rneui/themed';
import React, {useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    FlatList,
    TouchableOpacity
  } from 'react-native';


const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      shop_name: 'Pallavi',
      location:'Madhapur',
      deadline: "1 Day",
      status: "Order Placed"
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      shop_name: 'Pallavi',
      location:'Madhapur',
      deadline: "1 Day",
      status: "Order Placed"
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      shop_name: 'Pallavi',
      location:'Madhapur',
      deadline: "1 Day",
      status: "Order Placed"
    },
  ];


  const Item = ({ shop_name,location,deadline,status }) => (
    <TouchableOpacity
    style={styles.live_orders_btn}
    >
          <View style={styles.content}>
            <Text style={styles.sname}>Shop Name: {shop_name}</Text>
            <Text style={styles.title}>Location: {location}</Text>
            <Text style={styles.title}>Deadline: {deadline}</Text>
           
            <Text style={styles.title}>Status : {status}</Text>
          </View>
          <View>
          
          </View>
    </TouchableOpacity>
  );


const DeliveryHomepage = ({navigation, route}) => {

    
    // const [index, setIndex] = useState(0);

    const renderItem = ({ item }) => (
      <Item 
      shop_name={item.shop_name} 
      location={item.location} 
      deadline={item.deadline}
      status={item.status}
      />
    );
      return (
          <SafeAreaView>
                <View style={styles.live_orders_cont}>
                      <Text style={styles.live_orders_head}>Live Orders</Text>
                      <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                      />
                </View>
          </SafeAreaView>
      )
}

export default DeliveryHomepage




const styles = StyleSheet.create({

    live_orders_head:{
        textAlign:'center',
        fontWeight:"bold",
        fontSize: 20,
        color:'#000',
    },
    content:{
        marginLeft:27
        // textAlign:'center',
        // justifyContent:'center',
    //   alignItems: "center",
  },
    live_orders_cont: {
      padding:10
    },
    sname:{
        fontWeight:"bold",
        fontSize: 16,
        color:'#000'
    },
    live_orders_btn: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 25,
      margin: 5,
      height:200,
      width:300,
      marginLeft:35
    }


})