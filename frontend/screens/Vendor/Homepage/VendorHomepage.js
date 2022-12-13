import { 
  View, 
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,  
  Pressable,
  Modal
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { 
  Button,
  Image, 
  Input,
} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';

//
import axios from 'axios';
const API = 'https://2171-49-205-239-58.in.ngrok.io/api/products'

const TOKEN= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA2NTQxNjZ9.0hJtqKtOvHWzFo7xpevgtcsFPznS8sSZXxIff_O2y4E"
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

export default function VendorHomepage() {
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
                    <Text style={styles.vendor_modalText}>Quantity: {modalProduct.stock} </Text>
                    <Text style={styles.vendor_modalText}>4 kg </Text>
                    <Text style={styles.vendor_modalText}>{modalProduct.description} </Text>                    
                  </View>
                    <Image
                          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tomato.jpg/220px-Tomato.jpg" }}
                          containerStyle={styles.vendor_img}
                          // PlaceholderContent={<ActivityIndicator />}
                        />
                </View>
                    
          
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => hideModal()}
                >
                  <Text style={styles.vendor_hide_btn}>Hide Modal</Text>
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