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
  import { Icon, Input, Button, Tab, TabView, Image, Badge, FAB } from '@rneui/themed';
import axios from 'axios';


const API ="https://27dc-49-205-239-58.in.ngrok.io/api/products"
const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzE4MTg2MDB9.QqYBuZs4YIbqsOOUsR1rD61mMNP0Bgxjo4-cc0P0H5U"


  const Item = ({ name,stock,grade, price }) => (
    <TouchableOpacity
    style={styles.product_details_button}
    // onPress={onPress}
    >
          <View // style={styles.item}
>

          <View style={styles.content}>
          {/* <Text style={styles.textStyle}>
              {'\u20B9'}
            </Text> */}
          <Text style={{
              fontWeight:'bold',
              fontSize:19,
              color:'black',
              textAlign:'center'              
              // marginLeft:20,
            }}>{name} 
                <Badge 
           
             value={grade} status="primary" 
            />
            </Text>
            <View style={styles.title}>
            <Text >{stock}(kg) <Text style={styles.textStyle}>
              {'\u20B9'}
            </Text>{price}/(kg)</Text></View>
            {/* <Text style={styles.title}>Unit Price  </Text> */}
          </View>
            {/* <Te   xt style={styles.title}>Grade : {grade}</Text> */}
           <View style={{ backgroundColor:'#000000'}}>
           <Image 
             source={{ 
              uri: "https://imgs.search.brave.com/PFNx-57BW20BmkUQx3msbeUT6MQonwZtNnI0klGB1AE/rs:fit:720:403:1/g:ce/aHR0cHM6Ly9kYWls/eWJhemFyLmNvbS5i/ZC93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MS8wMi9SYW1idXRh/bi01MDAtZ20tNzIw/eDQwMy5qcGc" 
          }}
          containerStyle={styles.product_img}
            />
           </View>
            
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
        <View style={{position:'relative'}}>
              <View style={styles.product_details_cont}>
      
            
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
                     <TouchableOpacity style={styles.fab}>
                     {/* <FAB title="+" style={styles.fabIcon}
        //    containerStyle={{
        //   // position:"absolute",
        // // top:20,
        //   bottom:0,
        //   right:0,
        //   zIndex:200,}}
          /> */}
           <Text style={styles.fabIcon}>+</Text>
                     </TouchableOpacity>
                    
              </View>
                      </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 20,
    elevation: 28,

    shadowColor: 'gray',
    
  },
  fabIcon: {
    fontSize: 40,
    color: 'white'
  },
  
  content:{
    backgroundColor:'#ffff', 
    width:'65%', 
textAlign:'center'
  },
  title:{
    //must immediately change this -> not applicable
    marginLeft:50,
      // padding:5,
      // color:'black',
      // textAlign:'center'
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
    textStyle: {
      marginTop: 10,
      color: '#646464',
      fontSize: 16,
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
      positon:"relative",
      // alignItems: "center",
      justifyContent:"space-around",
      backgroundColor: "#DDDDDD",
      padding: 20,
      margin: 25,
      height:110,
      textAlign:'center',
      backgroundColor:'silver',
         
      elevation:30,
      shadowColor: 'gray',
      borderRadius:20
    },
    product_img:{
      width:90,
      aspectRatio:1,
      borderRadius: 10,
      marginLeft:220,
      // marginBottom:200,
      position:'absolute',
      marginTop:-90

    },
});

export default ProductDetails;