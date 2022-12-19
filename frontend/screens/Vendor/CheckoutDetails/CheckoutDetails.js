import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Button, Image, Input } from '@rneui/themed';
import axios from 'axios';
import SyncStorage from 'sync-storage';
import { getCartDetails, createNewOrder, getCartDetailsByUserId, updateCartDetails } from '../../ApiCalls/ApiCalls';
import Toast from 'react-native-toast-message'
import { DialogLoading } from '@rneui/base/dist/Dialog/Dialog.Loading';



const API="https://e56d-49-205-239-58.in.ngrok.io/api/product/61a8c81b1e5a79501663f912"

const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA4NzQzODN9.p2pTjEY0jEMGK7qhJYDTRrpqS5mAQgv5Weo-QPRNi_4"

export default function CheckoutDetails(props) {
  const items = SyncStorage.get("cart")

  const [data,setData] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0)
  const [cartItems, setCartItems] = useState([])
  const [ loggedUserId, setLoggdeUserId] = useState("")
  const [order, setOrder] = useState({
      products:"",
      originalAmount: 0,
      user:"",
      address:"",
      coupon:null
  })
  const [jwt, setjwt] = useState({})
  const [reload, setReload] = useState(false)
  const [ loading, setLoading] = useState(false)


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
    setLoading(true)
    const Cart_id = SyncStorage.get("cartId")    
    getCartDetails(Cart_id).then(res => {
      console.log('Cart Details Checkout',res.data)
      setFinalPrice(res.data[0]['cost'])
      setData(res.data)
      setLoading(false)

    }).catch((error) => {
      console.log(error)
      setLoading(false)

    });

    // setLoggdeUserId(userID)
    //   getCartDetailsByUserId(loggedUserId).then(res => {
    //     console.log(res.data)
    //     setData(res.data)
    //   }).catch((error) => {
    //     console.log(error)
    //   });  
   
   
  }

  const goToVendorHomepage = () => navigation.navigate("VendorHomepage")

  const createOrder = (data,navigation) => {
    setLoading(true)

    let obj = {
      products: SyncStorage.get("cartId") ,
      originalAmount: finalPrice,
      user: SyncStorage.get("userId"),
      address: 'Hyderabad',
      coupon:null
    }
    console.log("Create Order data", obj)
    createNewOrder(obj).then(res => {
      setLoading(false)

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
      setLoading(false)

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
    setLoading(true)

    updateCartDetails(action, product_id)
      .then(res => {
        Toast.show({
            type: 'success',
            text1: "Cart Updated Successfully"
          });
        console.log(res.data)
        // setReload(!reload)
        checkoutDetails()
        setLoading(false)

      })
      .catch((err) => {
        setLoading(false)

        Toast.show({
          type: 'error',
          text1: err.type
        })
      }
      );
  }

  
  //call useeffect outside function****
  useEffect(() => {
    // getFinalPrice()
    const unsubscribe = navigation.addListener('focus', () => {
      checkoutDetails()
    });

    return unsubscribe;

  },[navigation,reload])
  


  if(loading) {
    <ActivityIndicator 
    size="large" 
    style={{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      height:'100%'
    }}
    />
  }
  return (
    <View style={styles.vendor_checkout}>
       <Toast position='top'/>
      <ScrollView>
        <Text style={styles.vendor_checkout_head}>Checkout Details</Text>
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
        <Text style={styles.vendor_checkout_pg}>Final Price : Rs.{ finalPrice}</Text>
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
                products: SyncStorage.get("cartId") ,
                originalAmount: data.length && data[0]["cost"],
                user: manualUserId,
                address: value,
                coupon:null
              })
            } else {
              setOrder({
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