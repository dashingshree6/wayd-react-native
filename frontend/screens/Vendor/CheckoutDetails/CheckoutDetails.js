import { View, Text, StyleSheet, ScrollView, ActivityIndicator,
   Modal, 
   FlatList,
   TouchableOpacity,
   Pressable  
} from 'react-native'
import React, {useEffect, useState} from 'react'
import { Button, Image, Input,Badge } from '@rneui/themed';
import axios from 'axios';
import SyncStorage from 'sync-storage';
import { getCartDetails, createNewOrder, getCartDetailsByUserId, updateCartDetails, updateCartItems } from '../../ApiCalls/ApiCalls';
import Toast from 'react-native-toast-message'
import { DialogLoading } from '@rneui/base/dist/Dialog/Dialog.Loading';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';




export default function CheckoutDetails({navigation}) {
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
  const [valeSelected,setValueSelected] = useState(0)
  const [quantityUnits, setQuantityUnits] = useState(1)
  const [productQantity, setProductQuantity] = useState({
    quantity: 1,
  })

  const renderItem = ({ item }) => (
    <Item 
    name={item.name} 
    stock={item.stock}
    grade={item.grade}
    price={item.price}
    />
  );
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
    let data = {
      cartId: SyncStorage.get("cartId")
    }

    setLoading(true)

    updateCartDetails(action, product_id, data)
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

  const updateCartDet = ( product_id, newQuantity) => {
    setLoading(true)
    let data = {
      quantity: newQuantity.quantity,
      cartId: SyncStorage.get("cartId")
    }

    updateCartItems( product_id, data)
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
      {/* <ScrollView> */}
        <Button
                title={'Clear Cart'}
                buttonStyle={{ backgroundColor: '#36c93e' }}
                containerStyle={{
                  height: 40,
                  width: '100%',
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: 'white',
                  marginHorizontal: 20,
                }}
                onPress={() => clearCart()}
        />
        {/* <View style={styles.vendor_checkout_btns}>
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
        </View> */}
        <View
        style={{
          flexDirection:'row',
          alignItems:'center',
          padding: 10,
          backgroundColor:'#fff',
          elevation: 30,
          shadowColor:'gray',
          marginTop: 10        
        }}
        >
                      <Ionicons
                      name='pricetags-outline'
                      size={20}
                      color='black'

                      />
                      <Text
                      style={{
                        fontWeight:'bold',
                        color:'black',
                        width: '60%',
                        marginLeft: 15,
                        fontSize: 20
                      }}
                      >Apply Coupon</Text>
                      <Ionicons
                      name='chevron-forward-sharp'
                      size={20}
                      color='black'
                      style={{
                        position:'absolute',
                        right: 5
                      }}
                      />
        </View>
    

        <View
        style={{
          flexDirection:'row',
          alignItems:'center',
          padding: 10,
          backgroundColor:'#fff',
          elevation: 30,
          shadowColor:'gray',
          marginTop: 10        
        }}
        >
                      <Feather
                      name='shopping-bag'
                      size={20}
                      color='black'

                      />
                      <Text
                      style={{
                        fontWeight:'bold',
                        color:'black',
                        width: '60%',
                        marginLeft: 15,
                        fontSize: 20
                      }}
                      >Review Items</Text>
        </View>
{ data.length ?  (
       <FlatList
       data={ data[0]["details"] }
       keyExtractor={item => item._id}
       numColumns={1}
      //  horizontal
       style={{}}
       renderItem={({item}) => (
         <View style={styles.vendor_product_details_button}>
             <View style={{}}>
         <View style={styles.checkout_content}>
           <View style={{ alignItems:'center'}}>
                 <Image 
                   source={{ 
                     uri: 'data:image/jpeg;base64,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'
                 }}
                   containerStyle={styles.checkout_product_img}
                   />
           </View>

           <View
           style={{
            marginLeft: 15
           }}
           >
 
                  <View style={{
                  flexDirection:'row',
                  justifyContent:"center", 
                  alignItems:'center'}}>
                        <Text style={{
                          fontWeight:'bold',
                          fontSize:19,
                          color:'black',
                          textAlign:'center',
                          marginRight: 10              
                        }}>{item.name}   
                        </Text>
                        <Badge value={item.grade} status="primary" />
                  </View>

                  <Text>{item.Selectedquantity} kg</Text>
           </View>
     

             {/* <View style={{padding:0, margin:0}}>
                   <Input
                   placeholder="Qty(kg)"
                   // leftIcon={{ type: 'font-awesome', name: 'comment' }}
                   onChangeText={value =>setProductQuantity({quantity: value })}
                  //  containerStyle={{width: '70%',}}
                   keyboardType='numeric'
                   />
             </View> */}
             
             <TouchableOpacity
                          style={{
                            borderColor:'#d9dbde',
                            borderWidth: 1.5, 
                            borderRadius: 10,
                            height: 50,
                            width: 140,
                            alignItems:'center',
                            justifyContent:'center',
                            padding: 0,
                            marginLeft: 15
                          }}
                          >
                          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                                <Pressable
                                  // onPress={() => {
                                  //   if(item.Selectedquantity == 1) {
                                  //     updateCart('remove',item._id)}}
                                  //   }
                                >
                                      <Ionicons
                                        name='close'
                                        size={20}
                                        color='green'
                                        />
                                  </Pressable>
                                  <Input
                                    placeholder='Qty'
                                    containerStyle={{width: '55%',height: 48 }}
                                    // inputContainerStyle={{padding: 0}}
                                    inputStyle={{padding: 0}}
                                    onChangeText={value =>setProductQuantity({quantity: value })}
                                    keyboardType='numeric'
                                  />
                                  <Pressable
                                      onPress={() => {
                                        if(productQantity.quantity >= 1) {
                                          updateCartDet(item._id, productQantity)
                                        }
                       
                                      }}
                                  >
                                      <Ionicons
                                        name='checkmark-sharp'
                                        size={20}
                                        color='green'
                                        />
                                  </Pressable>
                                            
                          </View>
            </TouchableOpacity>
             

       
             {/* <View style={{
               flexDirection:'row', 
               // alignItems:'center'
               }}>
         
               <Button
               title={'+'}
               containerStyle={{
                   // width: "50%",
               }}
               buttonStyle={{ 
                 backgroundColor: '#36c93e',
                 borderRadius: 20 

               }}
               titleStyle={{
                 color: 'white',
               }}
               onPress={() => {
                 if(productQantity.quantity >= 1) {
                   updateCartDet(item._id, productQantity)
                 }

               }}
               />
               <Button
              //  icon={
              //   <Ionicons
                
              //   />
              //  }
               title={''}
               containerStyle={{
                   // width: "50%",
                   marginTop: 5
                   // position:'absolute',
                   // right: 4
                   // marginVertical: 5,
               }}
               buttonStyle={{ 
                 backgroundColor: 'rgba(214, 61, 57, 1)',
                 borderRadius: 50 
               }}
               titleStyle={{
                 color: 'white',
               }}
               onPress={() => updateCart('remove',item._id)}
               /> 
               </View> */}

               <View 
                style={{
                  // flexDirection:'row',
                // justifyContent:"space-evenly", 
                // alignItems:'center',
                padding:5, fontWeight:'bold',
                // position:'absolute',
                // right:                             
                }}>
                  {/* <Text style={{fontWeight:'bold',fontSize:16, color:'#7C203A'}}>{data.stock}kg</Text>  */}
                  <Text 
                  style={{
                    fontWeight:'500',
                    fontSize:16, 
                    color:'black',
                  }}>{'\u20B9'}{item.price}</Text>
                </View>
              </View>
           
          {/* <View style={{ justifyContent:'center'}}>
               <Image 
                 source={{ 
                   uri: 'data:image/jpeg;base64,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'
               }}
                 containerStyle={styles.checkout_product_img}
                 />
          </View> */}
     
          </View>

         </View>

       )}
       />
)
: (
  <View style={styles.vendor_checkout_content}>
    <Text>Cart is empty</Text>
</View>
)

 }



        {/* { data.length ? data[0]["details"].map(data => (
          <View key={data._id} style={styles.vendor_checkout_content}>
               <View>
                    <View>
                    <Text style={{
                      fontWeight:'bold',
                      fontSize:19,
                      color:'black',
                      textAlign:'center'              
                    }}>{data.name}   
                    </Text>
                    <Badge value={data.grade} status="primary" />


                    </View>

                    <Text style={styles.vendor_checkout_modalText}> {data.name}</Text>
                    <Text style={styles.vendor_checkout_modalText}>Grade: {data.grade} </Text>
                    <Text style={styles.vendor_checkout_modalText}>Price {data.price}</Text>
                    <Text style={styles.vendor_checkout_modalText}>Quanitity: {data.Selectedquantity}</Text>
              */}
    
                    {/* <SelectDropdown
                      buttonStyle={styles.input}
                      buttonTextStyle={styles.ButtonText}
                      defaultButtonText={'Select Units'}
                      data={[1,100,500,1000]}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        setQuantityUnits(selectedItem);
                        setProductQuantity({quantity: selectedItem })
                      }}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                      }}
                    /> */}
        
                    {/* <View style={styles.vendor_checkout_btns}> */}
                                {/* <Button
                                title={'-'}
                                containerStyle={{
                                    width: '25%',
                                    marginVertical: 10,
                                }}
                                onPress={() => {
                                  if(quantityUnits == 1000 && (data.Selectedquantity > 1000) ) {
                                    console.log('data.Selectedquantity',data.Selectedquantity)
                                    updateCart('decrease',data._id,productQantity)
                                  } 
                                  if(quantityUnits == 500 && (data.Selectedquantity > 500)) {
                                    updateCart('decrease',data._id,productQantity)
                                  }
                                  if(quantityUnits == 100 && (data.Selectedquantity > 100 )) {
                                    updateCart('decrease',data._id,productQantity)
                                  } 
                                  if(quantityUnits == 1 && (data.Selectedquantity > 1 )) {
                                    updateCart('decrease',data._id,productQantity)
                                  } 

                                  if(data.Selectedquantity > 1 ) {
                                    updateCart('decrease',data._id,productQantity)
                                  } 
                                } 
                                  
                                }
                                /> */}
                                {/* <Text style={{marginVertical: 20}}>Quanitity: {data.Selectedquantity}</Text> */}
                                {/* <Button
                                title={'+'}
                                containerStyle={{
                                    width: "25%",
                                    marginVertical: 10,
                                }}
                                onPress={() => updateCart('increase',data._id,productQantity)}
                                /> */}
               
                      
                        {/* </View>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                        
                                <Input
                                placeholder="Quantity"
                                // leftIcon={{ type: 'font-awesome', name: 'comment' }}
                                onChangeText={value =>setProductQuantity({quantity: value })}
                                containerStyle={{width: '40%',marginTop: 10}}
                                keyboardType='numeric'
                                />
                          
                                <Button
                                title={'Add'}
                                containerStyle={{
                                    width: "30%",
                                }}
                                buttonStyle={{ backgroundColor: '#36c93e' }}
                                titleStyle={{
                                  color: 'white',
                                }}
                                onPress={() => {
                                  if(productQantity.quantity >= 1) {
                                    updateCartDet(data._id, productQantity)
                                  }
   
                                }}
                                />
                        </View>
                        <Button
                        title={'Remove'}
                        containerStyle={{
                            width: "100%",
                            // marginVertical: 5,
                        }}
                        buttonStyle={{ backgroundColor: '#36c93e' }}
                        titleStyle={{
                          color: 'white',
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
         </View> */}
        {/* } */}
   
        {/* <Button
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
            /> */}
        <Text style={{
          fontWeight:'bold', 
          marginBottom: 5,
          marginTop: 5,
          marginLeft: 20,
          fontSize: 20, 
          color:'black'}}>Bill Details</Text>

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
                buttonStyle={{ backgroundColor: '#1a6b1e' }}
                titleStyle={{
                  color: 'white',
                }}
        />
           {/* <Button
                title={'Back to Homepage'}
                containerStyle={{
                    // width: '100%',
                    marginVertical: 10,
                    marginBottom: 0
                }}
                onPress={() => goBackToHomeapge()}
           /> */}
            {/* </ScrollView> */}
    </View>
  )
}

const styles = StyleSheet.create({
    vendor_checkout: {
      // flex: 1,
      backgroundColor:'#fff'
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
        backgroundColor:'#fff',
        padding: 10,
        borderRadius: 5,
        elevation: 30,
        shadowColor:'gray'
    },
    vendor_checkout_modalText:{
        flexWrap:'wrap',
        flex: 0.5
    },
    vendor_checkout_pg: {
      // fontWeight:'bold',
      marginLeft: 20,
      fontSize: 15,
      color:'black'
    },
    checkout_content: {
      backgroundColor:'#ffff', 
      width:'65%', 
      textAlign:'center',
      color:'black',
      padding:5,
      flexDirection:'row',
      alignItems:"center",
    },
    checkout_product_img:{
      width: 60,
      aspectRatio:1,
      borderRadius: 10,
      // marginLeft:220,
      // marginBottom:200,
      // position:'absolute',
      // marginTop:-75

    },
    vendor_product_details_button: {
      positon:"relative",
      // alignItems: "center",
      justifyContent:"space-around",
      backgroundColor: "#DDDDDD",
      padding: 20,
      margin: 5,
      // height:110,
      textAlign:'center',
      backgroundColor:'#fff',
         
      elevation:30,
      shadowColor: 'gray',
      borderRadius:20,
    },
    
    });