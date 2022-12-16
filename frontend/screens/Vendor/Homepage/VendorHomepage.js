import { 
  View, 
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,  
  Pressable,
  Modal, 
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { 
  
  Image, 
  Input,
  Button
} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

//
import axios from 'axios';
const API = 'https://0c63-49-205-239-58.in.ngrok.io/api/products'

const TOKEN= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzExMzYyMzB9.SBijiSXrRZ51RuCY0zciIGs6YQC9m2VMQDXRFOtu--8"
//






const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Potato',
    grade: 'A',
    rate: 'Rs.45',
    photo: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTUNYRJGfr6dAmrrvtz8mF5qV0ojVV9cuEFzswwOcfqxd4EDeDD05eO-KSs2uLidN92YVgeCdcpdthCF4E"
  
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Potato',
    grade: 'A',
    rate: 'Rs.45',
    photo: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTUNYRJGfr6dAmrrvtz8mF5qV0ojVV9cuEFzswwOcfqxd4EDeDD05eO-KSs2uLidN92YVgeCdcpdthCF4E"
  
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Potato',
    grade: 'A',
    rate: 'Rs.45',
    photo: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTUNYRJGfr6dAmrrvtz8mF5qV0ojVV9cuEFzswwOcfqxd4EDeDD05eO-KSs2uLidN92YVgeCdcpdthCF4E"
  
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Potato',
    grade: 'A',
    rate: 'Rs.45',
    photo: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTUNYRJGfr6dAmrrvtz8mF5qV0ojVV9cuEFzswwOcfqxd4EDeDD05eO-KSs2uLidN92YVgeCdcpdthCF4E"
  
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571443443e29d72',
    title: 'Potato',
    grade: 'A',
    rate: 'Rs.45',
    photo: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTUNYRJGfr6dAmrrvtz8mF5qV0ojVV9cuEFzswwOcfqxd4EDeDD05eO-KSs2uLidN92YVgeCdcpdthCF4E"
  
  },
  {
    id: '58694a0f-3da1-471f-bd96-14557654461e29d72',
    title: 'Potato',
    grade: 'A',
    rate: 'Rs.45',
    photo: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTUNYRJGfr6dAmrrvtz8mF5qV0ojVV9cuEFzswwOcfqxd4EDeDD05eO-KSs2uLidN92YVgeCdcpdthCF4E"
  
  },
];

// const Item = ({ title, grade, rate, photo, displayModal }) => (
//     <Pressable
//     // style={[styles.button, styles.buttonOpen]}
//     onPress={() => displayModal()}
//     style={styles.vendor_container}
//     >
//           <View >
//               <Image
//                     source={{ uri: photo }}
//                     containerStyle={styles.vendor_item}
//                     PlaceholderContent={<ActivityIndicator />}
//                   />
//                 <Text style={styles.title}>{title}</Text>
//                 <Text style={styles.title}>Grade :{grade}</Text>
//                 <Text style={styles.title}>Rate :{rate}</Text>
//           </View>
//     </Pressable>
// );

const Item = (props) => (
  
  <Pressable
  // style={[styles.button, styles.buttonOpen]}
  onPress={() => props.displayModal(props.product)}
  style={styles.vendor_container}
  >
        <View >
            {/* <Image
                  source={{ uri: photo }}
                  containerStyle={styles.vendor_item}
                  PlaceholderContent={<ActivityIndicator />}
                /> */}
              <Text style={styles.title}>{props.product.name}</Text>
              <Text style={styles.title}>Grade :{props.product.grade}</Text>
              <Text style={styles.title}>Price :{props.product.price}</Text>
        </View>
  </Pressable>
);

export default function VendorHomepage({navigation}) {

  const [ newPrice, setNewPrice] = useState(0);
  const newTotalPrice=()=>{
    let product = [];
  //  let price;
    setNewPrice(count * props.product.price)
    
  }
// const increseQuantity


const [orders, setOrders] = useState({
  products:"",
  originalAmount: "",
  user:"",
  address:"",
  coupon:null,
  productArr: [{name:'apple', quantity: 1}, {
    
  }]
  
});




const createCustomerOrder =()=>{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Accept': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzExMzYyMzB9.SBijiSXrRZ51RuCY0zciIGs6YQC9m2VMQDXRFOtu--8'},
    data: JSON.stringify({ 
      products:"61e529080ee3de0f8828f08c",
      originalAmount: 2252,
      user:"5ffc2229a70cf50024a4e3cb",
      address:"Peddamma Gudi, Road 36(Test 1)",
      coupon:null
    })
  };

fetch('https://0c63-49-205-239-58.in.ngrok.io/api/order/create', requestOptions)
.then((response) => response.json())
.then((json) => {
  console.log('Fetch API Response', json.data);
})
.catch((error) => {
console.error(error);
});
}

  const [modalVisible, setModalVisible] = useState(false);

  const displayModal = (productData) => {
    setModalVisible(true)
    setModalProduct(productData)
  }
  const hideModal = () => setModalVisible(!modalVisible)
  // const renderItem = ({ item }) => (
  //   <Item 
  //   title={item.title} 
  //   grade={item.grade} 
  //   rate={item.rate} 
  //   photo={item.photo} 
  //   displayModal={displayModal}
  //   />
  // );
const [value,setValue] = useState(0)




 



const [productToCart, setProductToCart] = useState([])

const [count, setCount] = useState(1)
const [count2, setCount2] = useState(0)


const increaseValue2 =()=>{
  setCount2(prevCount2 => prevCount2 +1)
}

const increaseValue =()=>{
  setCount(prevCount => prevCount +1)
}
const decreseValue =()=>{
  setCount(prevCount => prevCount -1)
}




const addProductToCart=()=>{


}


  const renderItem = ({ item }) => (
    <Item 
    product={item}
    // photo={item.photo} 
    displayModal={displayModal}
    />
  );

  //
  const [data, setData] = useState([])
  const [modalProduct, setModalProduct] = useState({})
  const [loading, setLoading] = useState(true)
  // const Imageurl = product
  // ? `${API}/product/photo/${product._id}`
  // : `https://tse2.mm.bing.net/th?id=OIP.AvUZJkFRu60sN2FGvV0srAHaEK&pid=Api&P=0&w=329&h=186`;

  const getAllProducts= () => {
    setLoading(true)
    axios.get(API , { headers: {"Authorization" : `Bearer ${TOKEN}`} })
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
    getAllProducts()
},[])
  
  return (
    <View>
       <AntDesign
          
              name='shoppingcart'
              size={50}
              color='gray'
              onPress={() => navigation.navigate('CheckoutDetails')}
            >{count2}</AntDesign>
       <Input
          placeholder='Search'
          leftIcon={
            <AntDesign
              name='search1'
              size={24}
              color='gray'
            />
           
          }
        />
      
      {loading ? 
      <ActivityIndicator size="large" />
      :
      <FlatList
      style={styles.vendor_list}
      numColumns={2}
      // data={DATA}
      data={data}
      renderItem={renderItem}
      // keyExtractor={item => item.id}
      keyExtractor={item => item._id}
    />
      }


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
            <View style={styles.vendor_modal}>
              <View style={styles.modalView}>

                <Text style={styles.vendor_head}>Product Name: {modalProduct.name}</Text>

                <View style={styles.vendor_modal_content}>
                  <View>
                    <Text style={styles.vendor_modalText}>Name : {modalProduct.description} </Text>                    
                    <Text style={styles.vendor_modalText}>Quantity: {count} (kg)</Text>
                    {/* <Text style={styles.vendor_modalText}>Stock {modalProduct.stock} </Text> */}
                    <Text style={styles.vendor_modalText}>Price : {modalProduct.price}</Text>
                    <Text style={styles.vendor_modalText}>Total Price : {newPrice}</Text>
                  </View>
                  <Button
                          title={'-'}
                          containerStyle={{
                            width: 50,
                            marginHorizontal: 20,
                            marginVertical: 10,
                          }}
                          
                          onPress={() => decreseValue()}
                        />
                   <Image
                          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tomato.jpg/220px-Tomato.jpg" }}
                          containerStyle={styles.vendor_img}
                          // PlaceholderContent={<ActivityIndicator />}
                        />
                     <Button
                          title={'+'}
                          containerStyle={{
                            width: 50,
                            marginHorizontal: 20,
                            marginVertical: 10,
                          }}
                          onPress={() => 
                            {
                            increaseValue()
                            newTotalPrice()
                          }}

                        />
                </View>
                    
                    <Button 
                    title={'Add Product To Cart'}
                    containerStyle={{
                      width: 200,
                      marginHorizontal: 20,
                      marginVertical: 10,
                      marginLeft:169
                    }}
                    onPress={() => {
                      increaseValue2();
                      hideModal()
                      
                      setCount(0)
                    }}
                    
                    />
          
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => hideModal()}
                >
                  <Text style={styles.vendor_hide_btn}
                  
                  >Hide Modal</Text>
                </Pressable>
              </View>
              
            </View>
          </Modal>




          
          
    </View>
  )
}

const styles = StyleSheet.create({
  vendor_container: {
    flex: 1,
    marginTop: 2,
    margin: 6,
    backgroundColor:'silver',
    padding: 5
  },
  vendor_list: {
    width: '100%',
  },
  vendor_item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
  vendor_modal: {
    height: '50%',
    marginTop: 'auto',
    backgroundColor:'#fff',
    borderRadius: 15,
    padding: 5
  },
  vendor_head: {
    fontSize: 25,
    fontWeight:'bold',
    color:'black'
  },
  vendor_img:{
    width: 50,
    aspectRatio: 1,
  },
  vendor_hide_btn :{
    borderColor: 'gray',
    padding: 5,
    borderWidth: 2
  },
  vendor_modal_content:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    margin: 6
  },
  vendor_modalText:{
    flexWrap:'wrap',
    flex: 0.5
  }
  });