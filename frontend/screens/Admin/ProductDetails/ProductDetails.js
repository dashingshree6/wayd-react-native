import React, {useEffect, useState} from 'react';
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
  import { Icon, Input, Button, Tab, TabView, Image, Badge } from '@rneui/themed';
import axios from 'axios';


const API ="https://2093-49-205-239-58.in.ngrok.io/api/products"
const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzE3MzQxODR9.0JlAS4NXTF6n33h7-YGNZZ0BcV1CtUDveOlC9B2Hlw4"

  // const DATA = [
  //   {
  //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //     title: 'Potato',
  //     stock: 10,
  //     grade: "A"
  //   },
  //   {
  //     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  //     title: 'Carrot',
  //     stock: 10,
  //     grade: "A"
  //   },
  //   {
  //     id: '58694a0f-3da1-471f-bd96-145571e29d72',
  //     title: 'Spinach',
  //     stock: 10,
  //     grade: "A"
  //   },
  // ];
  
  const Item = ({ name,stock,grade, price }) => (
    <TouchableOpacity
    style={styles.product_details_button}
    // onPress={onPress}
    >
          <View // style={styles.item}
>
  {/* <View>
    <Badge style={styles.badge}><Text>A</Text></Badge>
  </View> */}
            <Text style={{
              fontWeight:'bold',
              fontSize:19,
              color:'black',
              marginLeft:6
            }}>{name} ({grade})</Text>
            <Text style={styles.title}>Stock: {stock} </Text>
            <Text style={styles.title}>Unit Price : {price}(kg)</Text>
            {/* <Text style={styles.title}>Grade : {grade}</Text> */}
            <Image 
             source={{ 
              uri: "https://imgs.search.brave.com/PFNx-57BW20BmkUQx3msbeUT6MQonwZtNnI0klGB1AE/rs:fit:720:403:1/g:ce/aHR0cHM6Ly9kYWls/eWJhemFyLmNvbS5i/ZC93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MS8wMi9SYW1idXRh/bi01MDAtZ20tNzIw/eDQwMy5qcGc" 
          }}
          containerStyle={styles.product_img}
            />
            
          </View>
    </TouchableOpacity>
  );
  

  const ProductDetails = ({ navigation, route  }) => {
  
  const [data,setData] = useState();
  const getAllProducts =()=>{
   axios.get(API, { headers : {"Authorization" : `Bearer ${TOKEN}`}})
    .then(res => {
      console.log(res.data)
      setData(res.data)
    }).catch((error) => {
      console.log(error)
    });
      }//call useeffect outside function****
  useEffect(() => {
    getAllProducts()
  },[])
  

  const [index, setIndex] = useState(0);
  const renderItem = ({ item }) => (
    <Item 
    name={item.name} 
    stock={item.stock}
    grade={item.grade}
    price={item.price}
    />
  );
    return (
        <SafeAreaView>
              <View style={styles.product_details_cont}>
                    {/* <Text style={styles.product_details_head}>Product Details</Text> */}
                    {/* <Tab
                      value={index}
                      onChange={(e)     => setIndex(e)}
                      indicatorStyle={{
                        backgroundColor: 'white',
                        height: 3,
                      }}
                      variant="primary"
                    >
                        <Tab.Item
                          title="Fruits"
                          titleStyle={{ fontSize: 12 }}
                          // icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
                        />
                        <Tab.Item
                          title="Vegetables"
                          titleStyle={{ fontSize: 12 }}
                          // icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
                        />
                    </Tab> */}

                    <TabView value={index} onChange={setIndex} animationType="spring">
                        <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
                          <Text h1>Recent</Text>
                        </TabView.Item>
                        <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
                          <Text h1>Favorite</Text>
                        </TabView.Item>
                    </TabView>
                    <FlatList
                      data={data}
                      renderItem={renderItem}
                      keyExtractor={item => item.id}
                    />
              </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  title:{
      padding:5,
      color:'black'
  },
    product_details_head:{
        textAlign:'center',
        fontWeight:"bold",
        fontSize: 20,
        color:'black'
    },
    product_details_cont: {
      padding:10,
      
    },
    product_details_btn: {
      alignItems:'center'
    },
    product_details_type: {
      display:'flex',
      flexDirection: 'row',
    },
    product_details_orders:{
      alignItems:'flex-end'
    },
    product_details_item: {
      backgroundColor: 'silver',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius:20
    },
    product_details_button: {
      // alignItems: "center",
      justifyContent:"space-around",
      backgroundColor: "#DDDDDD",
      padding: 20,
      margin: 25,
      height:110,
      textAlign:'center',
      backgroundColor:'#ffffff',
         
      elevation:30,
      shadowColor: 'gray',
      borderRadius:20
    },
    product_img:{
      width:90,
      aspectRatio:1,
      borderRadius: 10,
      marginLeft:220,
      // marginBottom:100,
      position:'absolute',
      marginTop:0

    },
});

export default ProductDetails;