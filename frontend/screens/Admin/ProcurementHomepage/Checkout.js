import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Button, Image, Input } from '@rneui/themed';
import axios from 'axios';
import SyncStorage from 'sync-storage';
import { getCartDetails, createNewOrder, getCartDetailsByUserId, updateCartDetails } from '../../ApiCalls/ApiCalls';
import Toast from 'react-native-toast-message'


export default function Checkout({ navigation, goToFirstTab}) {
  // const items = SyncStorage.get("cart")

  // const { userId } = route.params;
  // console.log("CHeckout Details userId",userId)

  // const jwt = SyncStorage.get('jwt')
  // console.log('Checkout JWT', jwt)

  const [data,setData] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0)
  const [cartItems, setCartItems] = useState([])
  const [ loggedUserId, setLoggdeUserId] = useState("")
  const [order, setOrder] = useState({
      products:"",
      originalAmount: 0,
      user:"",
      address:"",
      coupon:null,
      userType: "Customer"
  })
  const [reload, setReload] = useState(false)

  // const getFinalPrice = () => {
  //   setCartItems(data)
  //   let price = 0;
  //   items.map(itm => {
  //     price = price + itm.price
  //   })
  //   setFinalPrice(price)
  //   console.log("Final Price",price)
  // }

  const goBackToHomeapge = () => props.navigation.pop()

  const checkoutDetails = () => {
    const Cart_id = SyncStorage.get("cartId")    
    getCartDetails(Cart_id).then(res => {
      console.log(res.data)
      setFinalPrice(res.data[0]['cost'])
      setData(res.data)
    }).catch((error) => {
      console.log(error)
    });

    // const loggedUserId = SyncStorage.get("userId")
    // // setLoggdeUserId(userID)
    //   getCartDetailsByUserId(loggedUserId).then(res => {
    //     console.log(res.data)
    //     // setData(res.data)
    //   }).catch((error) => {
    //     console.log(error)
    //   });  
   
   
  }

  const goToVendorHomepage = () => navigation.navigate("VendorHomepage")

  const createOrder = (data,navigation) => {
    let obj = {
      products: SyncStorage.get("cartId") ,
      originalAmount: finalPrice,
      user: SyncStorage.get("manual_order_userId"),
      address: 'Hyderabad',
      coupon:null,
      userType: "Supplier",
      customerId: SyncStorage.get("manual_order_userId")
    }
    console.log("Create Order data", obj)
    createNewOrder(obj).then(res => {
      console.log(res.data)
      SyncStorage.remove("cartId")
      SyncStorage.remove("manual_order_userId")
      setData([])
      setOrder(({
        products:"",
        originalAmount: 0,
        user:"",
        address:"",
        coupon:null
    }))
    

    Toast.show({
      type: 'success',
      text1: "Order Created Successfully"
    });
   
      
      if(SyncStorage.get("role") === 1) {
        goToFirstTab()
      } else {
        goToVendorHomepage()
      }

    }).catch((error) => {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: error
      })
    });
  }

  const clearCart = () => {
    SyncStorage.remove("cartId")
    SyncStorage.remove("manual_order_userId")
    setData([])
    setOrder(({
      products:"",
      originalAmount: 0,
      user:"",
      address:"",
      coupon:null
  }))

  if(SyncStorage.get("role") === 1) {
    goToFirstTab()
  } else {
    goToVendorHomepage()
  }
  }

const updateCart = (action, product_id) => {

      updateCartDetails(action, product_id)
        .then(res => {
          Toast.show({
              type: 'success',
              text1: "Cart Updated Successfully"
            });
          console.log(res.data)
          setReload(!reload)
        })
        .catch((err) => {
          Toast.show({
            type: 'error',
            text1: err.type
          })
        }
        );
  }

  
  //call useeffect outside function****
  useEffect(() => {
      checkoutDetails()

  },[navigation, reload])
  





  return (
    <View style={styles.vendor_checkout}>
       <Toast position='top'/>
      <ScrollView>
        <Text style={styles.vendor_checkout_head}>Checkout Details</Text>
        <Button
                title={'Clear Cart'}
                containerStyle={{
                    // width: '100%',
                    marginVertical: 10,
                }}
                onPress={() => clearCart()}
        />
        <View style={styles.vendor_checkout_btns}>
                <Button
                title={'Instant Order'}
                containerStyle={{
                    // width: '100%',
                    marginVertical: 10,
                }}
                />
                <Button
                title={'Advanced Order'}
                containerStyle={{
                    // width: "100%",
                    marginVertical: 10,
                }}
                />  
        </View>

        { data.length ? data[0]["details"].map(data => (
          <View key={data._id} style={styles.vendor_checkout_content}>
               <View>
                    <Text style={styles.vendor_checkout_modalText}>Product Name : {data.name}</Text>
                    <Text style={styles.vendor_checkout_modalText}>Grade: {data.grade} </Text>
                    <Text style={styles.vendor_checkout_modalText}>Price {data.price}</Text>
                    <View style={styles.vendor_checkout_btns}>
                            <Button
                            title={'-'}
                            containerStyle={{
                                width: '25%',
                                marginVertical: 10,
                            }}
                            onPress={() => updateCart('decrease',data._id)}
                            />
                            <Button
                            title={'+'}
                            containerStyle={{
                                width: "25%",
                                marginVertical: 10,
                            }}
                            onPress={() => updateCart('increase',data._id)}
                            />
                    </View>
                    <Button
                    title={'Remove'}
                    containerStyle={{
                        // width: "100%",
                        marginVertical: 5,
                    }}
                    onPress={() => updateCart('remove',data._id)}
                    />                     
              </View>
                 <Image
                       source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tomato.jpg/220px-Tomato.jpg" }}
                       containerStyle={styles.vendor_checkout_img}
                       // PlaceholderContent={<ActivityIndicator />}
                 />
         </View>
         ))
         :
         <View style={styles.vendor_checkout_content}>
          <Text>Cart is empty</Text>
         </View>
        }
   
        <Button
              title="Add Coupon"
              buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                // marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
            />
        <Text style={styles.vendor_checkout_pg}>Final Price : Rs.{ data.length && data[0]["cost"]}</Text>
        <Text style={styles.vendor_checkout_pg}>Address :</Text>
        <Text style={styles.vendor_checkout_pg}>Current Due Amount :</Text>
        <Text style={styles.vendor_checkout_pg}>Propose Payment :</Text>
        {/* <Input
          placeholder="Address"
          leftIcon={{ type: 'font-awesome', name: 'comment' }}
          value={order.address}
          onChangeText={value => {
            let manualUserId = SyncStorage.get("manual_order_userId")
            if(manualUserId) {
              setOrder({
                ...order,
                products: SyncStorage.get("cartId") ,
                originalAmount: data.length && data[0]["cost"],
                user: manualUserId,
                address: value,
                coupon:null
              })
            } else {
              setOrder({
                ...order,
                products: SyncStorage.get("cartId") ,
                originalAmount: data.length && data[0]["cost"],
                user: SyncStorage.get("userId"),
                address: value,
                coupon:null
              })
            }

          }}
          /> */}
      

        <Button
                title={'Place Order'}
                containerStyle={{
                    // width: '100%',
                    marginVertical: 10,
                }}
                onPress={() => createOrder(order)}
        />
           <Button
                title={'Back to Homepage'}
                containerStyle={{
                    // width: '100%',
                    marginVertical: 10,
                    marginBottom: 0
                }}
                onPress={() => goBackToHomeapge()}
           />
            </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    vendor_checkout: {
      flex: 0.9
    },
    vendor_checkout_head: {
      fontSize: 20,
      fontWeight:'bold',
      color:'black',
      textAlign:'center'
    },
    vendor_checkout_btns: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    vendor_checkout_img:{
        width: 50,
        aspectRatio: 1,
      },
      vendor_checkout_content:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        margin: 6,
        backgroundColor:'silver',
        padding: 10
    },
    vendor_checkout_modalText:{
        flexWrap:'wrap',
        flex: 0.5
    },
    vendor_checkout_pg: {
      fontWeight:'bold',
      marginLeft: 20,
      fontSize: 15,
      color:'black'
    }
    });