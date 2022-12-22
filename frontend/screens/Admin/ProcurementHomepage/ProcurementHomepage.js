import React, { useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Pressable,
    TextInput
  } from 'react-native';
  import { Icon, Input, Button, Tab, TabView } from '@rneui/themed';
import { getAllProcurements } from '../../ApiCalls/ApiCalls';
  //
  import axios from 'axios';

  const API = 'https://852c-49-205-239-58.in.ngrok.io/api/order/procure'

  const TOKEN= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzE2NjYyNzB9.HbJEHNUgIbYxlw-wYM-xdhbj9lCUBvDM7GOOPEiWd-g"

  
  //

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Potato',
      stock: 10,
      grade: "A"
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Carrot',
      stock: 10,
      grade: "A"
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Spinach',
      stock: 10,
      grade: "A"
    },
  ];
  
  const Item = (props) => (
    <TouchableOpacity
    style={styles.sales_live_button}
    // onPress={onPress}
    >
          <FlatList
          data={props.procurement.list}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <View 
            style={styles.item}
            >
              {/* <Text style={styles.title}>Product Name: {item.name}</Text>
              <Text style={styles.title}>Available Stock: {item.extra_stock}</Text>
              <Text style={styles.title}>Count : {item.count}</Text> */}
              <Text style={{
                fontWeight:'bold',
                fontSize: 20,
                color:'black'
              }}>Product Name: {item.name}</Text>
              <Text style={{
                
                fontSize: 20,
                color:'black'
              }}>Available Stock: {item.extra_stock}</Text>
              <Text style={styles.title}>Count : {item.count}</Text>
            </View>
          )}
          />
    </TouchableOpacity>
  );
  

const ProcurementHomepage = ({ navigation, route  }) => {
  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderList, setOrderList] = useState([])
  const [productForProcurement, setproductForProcurement] = useState({
    extra_stock: 0,
    price_generated: true,
    _id: "61a8c7b51e5a79501663f911",
    name: "",
    count: 0
})

  const renderItem = ({ item }) => (
    <Item 
    procurement={item}
    />
  );

  //
  const createProcurement = () => {
    console.log(productForProcurement)
    let arr = []
    arr.push(productForProcurement)
    console.log(arr)
    setOrderList(arr)
    console.log(orderList)

    let formData = {
      order_list: arr
    }

    axios.put(`${API}/${productForProcurement._id}` , 
      { 
        headers: {"Authorization" : `Bearer ${TOKEN}`},
        data: JSON.stringify(formData) 
      })
    .then(res => {
    console.log(res.data);
    }).catch((error) => {
    console.log(error)
    setLoading(false)
    });


    setModalVisible(!modalVisible)
  }
  //

   //
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const getAllProcurementsData = () => {
    setLoading(true)
    getAllProcurements()
    .then(res => {
    console.log(res.data);
    setData(res.data)
    setLoading(false)
    }).catch((error) => {
    console.log(error)
    setLoading(false)
    });
 }
  useEffect(()=> {
    getAllProcurementsData()
  },[])
 

  // Primary Color: #26b50f green
  // Secondary Color: #f10606 red
  // Card Background: #ffffff
  // Card Secondary BG: #f2f2f2  white
  // Card & Product Shadow
  // Color : #fccf9a pale orange
  // Opacity: 50%
  // Distance: 30 px
  // Size: 60 px
  // Angle: 90 degree

    return (
        <SafeAreaView style={styles.my_container}>
          <ScrollView>
              <View style={styles.sales_cont}>
                  <View style={styles.sales_btn}>
                        <Button
                          title={'Log Procurement'}
                          containerStyle={{
                            width: 185,
                            // borderBottomEndRadius:20,
                            borderRadius:10,
                            marginHorizontal: 50,
                            marginVertical: 10,
                            
                          }}
                          onPress={() => setModalVisible(true)}
                          color="#26b50f"
                          // color="#ffffff"
                        />
                    </View>
                    <Tab
                      value={index}
                      onChange={(e) => setIndex(e)}
                      indicatorStyle={{
                        backgroundColor: 'white',
                        height: 3,
                  
                      }}
                      // variant="primary"
                      containerStyle={{
                         backgroundColor:"#f10606",
                         borderRadius: 10
                      }}
                      
                    >
                        <Tab.Item
                          title="Fruits"
                          titleStyle={{ 
                            // borderRadius:10,
                            // backgroundColor:"#f10606",
                            fontSize: 12 , color:'white', borderRadius:10}}
                          
                          // icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
                        />
                        <Tab.Item
                          title="Vegetables"
                          titleStyle={{ fontSize: 12 , color:'white'}}
                          // icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
                        />
                    </Tab>

                    {/* <TabView value={index} onChange={setIndex} animationType="spring">
                        <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
                          <Text h1>Recent</Text>
                        </TabView.Item>
                        <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
                          <Text h1>Favorite</Text>
                        </TabView.Item>
                    </TabView> */}
                    <FlatList
                      data={data}
                      renderItem={renderItem}
                      keyExtractor={item => item._id}
                    />
              </View>

              <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
                style={styles.procurement_modal}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                  <Input
                    placeholder="Product Name"
                    // leftIcon={{ type: 'font-awesome', name: 'comment' }}
                    onChangeText={value => setproductForProcurement({ ...productForProcurement, name: value })}
                    />
                       <Input
                    placeholder="Count"
                    // leftIcon={{ type: 'font-awesome', name: 'comment' }}
                    onChangeText={value => setproductForProcurement({ ...productForProcurement, count: value })}
                    keyboardType='numeric'
                    />
                       <Input
                    placeholder="Extra Stock"
                    // leftIcon={{ type: 'font-awesome', name: 'comment' }}
                    onChangeText={value => setproductForProcurement({ ...productForProcurement, extra_stock: value })}
                    keyboardType='numeric'
                    />
                             <Input
                    placeholder="Price Generated"
                    // leftIcon={{ type: 'font-awesome', name: 'comment' }}
                    onChangeText={value => setproductForProcurement({ ...productForProcurement, price_generated: value })}
                    />
                    
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => createProcurement()}
                    >
                      <Text style={styles.textStyle}>Submit</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
              </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    sales_cont: {
      padding:10,
      backgroundColor:"#fccf9a",
        // Opacity: 50%
  // Distance: 30 px
  // Size: 60 px
  // Angle: 90 degree
  opacity:2
      },
    sales_btn: {
      alignItems:'center',
      backgroundColor:""
    },
    sales_orders_type: {
      display:'flex',
      flexDirection: 'row',
    },
    sales_past_orders:{
      alignItems:'flex-end'
    },
    item: {
      backgroundColor: '#f2f2f2',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 8,
      color:"#ffff"
    },
    sales_live_button: {
      // alignItems: "center",

      backgroundColor: "#DDDDDD",
      padding: 10,
      margin: 5,
      elevation:20,
      shadowColor: 'gray',
      borderRadius: 10

    },
    procurement_modal : {
      backgroundColor:'silver'
    }
});

export default ProcurementHomepage;