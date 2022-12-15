import { View, Text, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Button, Image } from '@rneui/themed';
import axios from 'axios';
import SyncStorage from 'sync-storage';




const API="https://e56d-49-205-239-58.in.ngrok.io/api/product/61a8c81b1e5a79501663f912"

const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA4NzQzODN9.p2pTjEY0jEMGK7qhJYDTRrpqS5mAQgv5Weo-QPRNi_4"

export default function CheckoutDetails(props) {
  const items = SyncStorage.get("cart")

  const [data,setData] = React.useState({});
  const [finalPrice, setFinalPrice] = useState(0)
  const [cartItems, setCartItems] = useState([])

  const getFinalPrice = () => {
    setCartItems(items)
    let price = 0;
    items.map(itm => {
      price = price + itm.price
    })
    setFinalPrice(price)
    console.log("Final Price",price)
  }


  const checkoutDetails =()=>{
    
    
    axios.get(API, { headers : {"Authorization" : `Bearer ${TOKEN}`}})
    .then(res => {
      console.log(res.data)
      setData(res.data)
    }).catch((error) => {
      console.log(error)
    });
    
    
   
    
  }
  //call useeffect outside function****
  useEffect(() => {
    checkoutDetails()
    getFinalPrice()
  },[])
  





  return (
    <View>
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

        { items.length && items.map(data => (
          <View key={data.name} style={styles.vendor_checkout_content}>
               <View>
                 <Text style={styles.vendor_checkout_modalText}>Product Name : {data.name}</Text>
                 <Text style={styles.vendor_checkout_modalText}>Grade: {data.grade} </Text>
                 <Text style={styles.vendor_checkout_modalText}>Price {data.price}</Text>                    
               </View>
                 <Image
                       source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tomato.jpg/220px-Tomato.jpg" }}
                       containerStyle={styles.vendor_checkout_img}
                       // PlaceholderContent={<ActivityIndicator />}
                 />
         </View>
        ))}
   
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
        <Text style={styles.vendor_checkout_pg}>Final Price : Rs.{finalPrice}</Text>
        <Text style={styles.vendor_checkout_pg}>Address :</Text>
        <Text style={styles.vendor_checkout_pg}>Current Due Amount :</Text>
        <Text style={styles.vendor_checkout_pg}>Propose Payment :</Text>
        <Button
                title={'Place Order'}
                containerStyle={{
                    // width: '100%',
                    marginVertical: 10,
                }}
        />
           <Button
                title={'Back to Homepage'}
                containerStyle={{
                    // width: '100%',
                    marginVertical: 10,
                }}
                onPress={() => navigation.pop()}
           />
        
    </View>
  )
}

const styles = StyleSheet.create({
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