import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect} from 'react'
import { getAllUsers, getCartDetailsByUserId } from '../../ApiCalls/ApiCalls';
import { Icon, Input, Button, Tab, TabView } from '@rneui/themed';
import Ionicons from "react-native-vector-icons/Ionicons";
import VendorHomepage from '../../Vendor/Homepage/VendorHomepage';
import CheckoutDetails from '../../Vendor/CheckoutDetails/CheckoutDetails';
import SyncStorage from 'sync-storage';
import SalesVendorForm1 from './SalesVendorForm1';
import SalesVendorForm2 from './SalesVendorForm2';

export default function SalesVendorForm({ navigation }) {
    const [userList, setUsersList] = useState([])    
    const [modalProduct, setModalProduct] = useState({})
    const [loading, setLoading] = useState(true)
    const [vendorId, setVendorId]  = useState("")
    const [index, setIndex] = useState(0);
    const [tabIndex, setTabIndex] = useState(0);
  
    const getUsersList = () => {
        setLoading(true)
        getAllUsers()
          .then((res) => {
            if (res.error) {
              console.log(res.error);
              setLoading(false)
            } else {
              setUsersList(res.data.filter(i => i.role === 0))
              setLoading(false)
            }
          })
          .catch((err) => console.log(err));
      };

      const callLeftChecvron = () => {
        if(tabIndex > 0) {
          setIndex((prevValue) => {
            return prevValue - 1
          })
          setTabIndex((prevValue) => {
            return prevValue - 1
          })
        }
      }
    
      const callRightChecvron = () => {
        if(tabIndex < 2) {
          setIndex((prevValue) => {
            return prevValue + 1
          })
          setTabIndex((prevValue) => {
            return prevValue + 1
          })
        }
      }

      const getExistingCartDetails = () => {
        const loggedUserId = SyncStorage.get("userId")
        // setLoggdeUserId(userID)
          getCartDetailsByUserId(loggedUserId).then(res => {
            console.log(res.data)
            let cart = res.data.filter(i => i.status === "YET_TO_CHECKOUT")
            SyncStorage.set("cartId", cart[0]['_id'])
            console.log('Existing cart',cart)
            // setData(res.data)
          }).catch((error) => {
            console.log(error)
          });  
      }


      const goToFirstTab = () => {
        setIndex(0)
        setTabIndex(0)
      }
  
    useEffect(()=> {
        getUsersList()
        getExistingCartDetails()
    },[])
  return (
    <View style={styles.sales_order_view}>

                    <Tab
                      value={index}
                      onChange={(e) => {
                        setIndex(e)
                      }}
                      indicatorStyle={{
                        backgroundColor: 'white',
                        height: 3,
                      }}
                      variant="primary"
                    >
                        <Tab.Item
                          title="Select Customer"
                          titleStyle={{ fontSize: 10 }}
                          // icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
                          disabled={tabIndex == 0 ? false: true }
                        />
                        <Tab.Item
                          title="Add Products"
                          titleStyle={{ fontSize: 10 }}
                          // icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
                          disabled={tabIndex == 1 ? false: true }
                        />
                          <Tab.Item
                          title="Checkout Details"
                          titleStyle={{ fontSize: 10 }}
                          // icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
                          disabled={tabIndex == 2 ? false: true }
                        />
                    </Tab>
      
                    {
                       tabIndex == 0 && ( loading ?
                        <ActivityIndicator size="large" />
                        :
                        <FlatList
                        data={userList}
                        // renderItem={renderItem}
                        keyExtractor={item => item._id}
                        renderItem={({item})=> (
                            <TouchableOpacity 
                            style={ SyncStorage.get("manual_order_userId") === item._id ? styles.customers_card_selected : styles.customers_card}
                            onPress={() => {
                              setVendorId(item._id)
                              SyncStorage.set("manual_order_userId", item._id)
                              console.log(vendorId)
                            }}
                            >
                                    <Text style={{ fontSize: 16, textAlign: 'center'}}>Username: {item.username}</Text>
                             
                                    <Text style={{ fontSize: 16, textAlign: 'center'}}>Email: {item.email}</Text>
                            
                                    {/* <Text style={{ fontSize: 16, textAlign: 'center'}}>{item && item["address"]["pincode"]}</Text> */}
                   
                            </TouchableOpacity>
                        )}
                        />)
                    }
                    
                    { tabIndex == 1 && (
                      <SalesVendorForm1 />
                    )}

                    { tabIndex == 2 && (
                      <SalesVendorForm2 goToFirstTab={goToFirstTab} />
                    )}




                    <View style={styles.sales_order_bottomtab}>    
                          <Ionicons 
                          name='chevron-back-circle'
                          size={30}
                          color='#fff'
                          onPress={()=> callLeftChecvron()}
                          />
                          <Ionicons 
                          name='chevron-forward-circle'
                          size={30}
                          color='#fff'
                          onPress={()=> callRightChecvron()}
                          />
                    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  sales_order_view:{
    flex: 1
  },
    customers_card: {
        backgroundColor:'silver',
        padding: 10,
        margin: 5
    },
    customers_card_selected: {
      backgroundColor:'yellow',
      padding: 10,
      margin: 5
    },
    sales_order_bottomtab: {
      flexDirection:'row',
      justifyContent:'space-around',
      position:'absolute',
      bottom: 5,
      width: "100%",
      backgroundColor: '#2089dc',
      padding: 10
    }
});