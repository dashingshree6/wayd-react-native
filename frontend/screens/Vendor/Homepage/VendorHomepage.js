import { 
  View, 
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,  
  Pressable,
  Modal, 
  TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { 
  
  Image, 
  Input,
  Button,
  BottomSheet,
  ListItem,
  Badge 
} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import SyncStorage from 'sync-storage';
import { getAllProducts, addProductToCart, getCartDetailsByUserId } from '../../ApiCalls/ApiCalls';
import Toast from 'react-native-toast-message'
import Ionicons from 'react-native-vector-icons/Ionicons';


const Item = (props) => (
  
  <Pressable
  // style={[styles.button, styles.buttonOpen]}
  onPress={() => props.displayModal(props.product)}
  style={styles.vendor_product_details_button}
  >
        {/* <View style={styles.vendor_card}>
          <View style={styles.vendor_subcard_1}>
              <Text style={styles.vendor_card_header}>{props.product.name}</Text>
              <Text style={styles.title}>Grade :{props.product.grade}</Text>
              <Text style={styles.vendor_card_price}>Rs.{props.product.price}</Text>
          </View>
          <View>
                <Image
                  source={{ uri: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQib6x9j-nuS0VDJ_Cv_RVh26ldR4oFe7qlzUOVsI5w-Hu8b7Wk6FyEEe6LROQfvWTxLy2YK7ceyWyzFro' }}
                  containerStyle={styles.vendor_item}
                  PlaceholderContent={<ActivityIndicator />}
                />
          </View>

  
        </View> */}
         <View>
          <View style={styles.checkout_content}>
            <View style={{
              backgroundColor:'#f0f4fa', 
              width: 200, 
              height: 120, 
              alignItems:'center', 
              justifyContent:'center',
              borderRadius: 20,

              }}>
                <Image 
                  source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tomato.jpg/220px-Tomato.jpg" }}
                  containerStyle={styles.product_img}
                  />
            </View>
              <View style={{
              flexDirection:'row',
              justifyContent:"center", 
              alignItems:'center'
              }}>
                    <Text style={{
                      fontWeight:'bold',
                      fontSize:19,
                      color:'black',
                      // textAlign:'center',
                      marginRight: 10              
                    }}>{props.product.name}   
                    </Text>
                    <Badge value={props.product.grade} containerStyle={{ }} status="primary" />
              </View>
              <Text style={{fontWeight:'bold'}}>1 kg</Text>
              <View style={{
                flexDirection:'row',
              justifyContent:"space-between", 
              alignItems:'center',
              // padding:5, 
              fontWeight:'bold',
              // marginTop: 10
              }}>
                {/* <Text style={{fontWeight:'bold',fontSize:16, color:'#7C203A'}}>{props.product.stock}kg</Text>  */}
                {/* <Text style={{fontWeight:'bold',fontSize:16, color:'gray'}}>{props.product.quantity}</Text> */}
                            <Text style={{fontWeight:'bold',fontSize:16, color:'green'}}>{'\u20B9'}{props.product.price}/(kg)</Text>
                            {/* <Button
                            title="ADD"
                            type="outline"
                            buttonStyle={{ 
                              // backgroundColor: 'rgba(127, 220, 103, 1)',
                              borderColor:'#d9dbde',
                              borderWidth: 1.5, 
                              borderRadius: 10,
                            }}
                            containerStyle={{
                              height: 45,
                              borderRadius: 10,
                              marginLeft: 2,
                              width: 100,
                            }}
                            titleStyle={{
                              color: 'green',
                              fontWeight:'800'
                              // marginHorizontal: 20,
                            }}
                          /> */}
                          <TouchableOpacity
                          style={{
                            borderColor:'#d9dbde',
                            borderWidth: 1.5, 
                            borderRadius: 10,
                            height: 50,
                            width: 100,
                            alignItems:'center',
                            justifyContent:'center',
                            padding: 0
                          }}
                          >
                            {/* <Text style={{ color: 'green',
                              fontWeight:'800'}}>ADD</Text> */}
                              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                                <Pressable>
                                      <Ionicons
                                        name='close'
                                        size={20}
                                        color='green'
                                        />
                                  </Pressable>
                                  <Input
                                    placeholder='Qty'
                                    containerStyle={{width: 55,height: 48 }}
                                    // inputContainerStyle={{padding: 0}}
                                    inputStyle={{padding: 0}}
                                  />
                                  <Pressable>
                                      <Ionicons
                                        name='checkmark-sharp'
                                        size={20}
                                        color='green'
                                        />
                                  </Pressable>
                              
                              </View>
                            
                          </TouchableOpacity>
              </View>
            </View>
  </View>
  </Pressable>
);

export default function VendorHomepage({navigation}) {
const jwt = JSON.parse(SyncStorage.get("jwt"));
console.log("Vendor Homepage jwt",jwt)

const [orders, setOrders] = useState({
  products:"",
  originalAmount: "",
  user:"",
  address:"",
  coupon:null,
  productArr: [{name:'apple', quantity: 1}, {
    
  }]
  
});

const [cartItems, setCartItems] = useState([]);
const [singleItem, setItem] = useState({
  name: "",
  grade: "",
  price: 0
})
const [quantity, setQuantity] = useState(1)
const [productPrice, setProductPrice] = useState(1)
const [cartQuantity, setCartQuantity] = useState(0)
const [modalVisible, setModalVisible] = useState(false);
const [cartModalVisible, setCartModalVisible] = useState(false);


const pushItemInCart = (product_id, product_name, product_grade, product_price,product_quantity) => {
  hideModal()
  let obj = {
    _id: product_id,
    name: product_name,
    grade: product_grade,
    price: product_price,
    Selectedquantity: product_quantity
  }

  let filteredItems = cartItems.length ? cartItems.filter(i => i._id !== obj._id) : [];
  setCartItems([...filteredItems,obj])
  console.log(cartItems)
}

  const displayModal = (productData) => {
    setModalVisible(true)
    setModalProduct(productData)
    setProductPrice(productData.price * quantity)
  }
  const hideModal = () => {
    setModalVisible(!modalVisible)
    setProductPrice(1)
    setQuantity(1)
  }

  const proceedCheckout = (id) => {
    // // if(props.manualOrder)
    // if(id) {
      // props.navigation.navigate("CheckoutDetails", { userId: id })
      navigation.navigate("CheckoutDetails")
    // } 
  }

  const addNewProductToCart = (product_id, product_name, product_grade, product_price,product_quantity, userId) => {
    hideModal()
    let obj = {
      _id: product_id,
      name: product_name,
      grade: product_grade,
      price: product_price,
      quantity: product_quantity
    }

    let quanArr = []
    quanArr.push(product_quantity)
    let productData = {
   
      quantityArray: quanArr,
      buy_DirectQuantity: [],
      numberOfItem: 1,
      _userID: userId,
      details: [
         {
                  _id: product_id,
                  name: product_name,
                  grade: product_grade,
                  price: product_price,
                  Selectedquantity: product_quantity
        }
      ]
    
  
  }
  
    addProductToCart(obj, product_id)
      .then(res => {
        Toast.show({
            type: 'success',
            text1: "Product added to cart"
          });
        console.log(res.data)
        SyncStorage.set("cartId",res.data.cartDetails[0]["_id"])
        SyncStorage.set("noOfItems", res.data.cartDetails[0]["numberOfItem"])
        setCartQuantity( res.data.cartDetails[0]["numberOfItem"])
        console.log(res.data.cartDetails[0]["_id"])
      })
      .catch((err) => {
        Toast.show({
          type: 'error',
          text1: err.type
        })
      }
      );
     
  };
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

  const getProductsAll = () => {
    setLoading(true)
    setCartQuantity(0)
    getAllProducts().then(data => {
      if (data.error) {
        console.log(data.error);
        setLoading(false)
      } else {
        setData(data.data)
        setLoading(false)
      }
    }).catch(err => console.log(err))
  };

  const getExistingCartDetails = () => {
    setCartModalVisible(true)

    const loggedUserId = SyncStorage.get("userId")
    // setLoggdeUserId(userID)
      getCartDetailsByUserId(loggedUserId).then(res => {
        console.log(res.data)
        let cart = res.data.filter(i => i.status === "YET_TO_CHECKOUT")
        SyncStorage.set("cartId", cart[0]['_id'])
        setCartQuantity(cart[0]['numberOfItem'])
        console.log('Existing cart',cart)

        setCartModalVisible(true)
        // setData(res.data)
      }).catch((error) => {
        console.log(error)
      });  
  }


  useEffect(()=> {
    const unsubscribe = navigation.addListener('focus', () => {
      getProductsAll()
      getExistingCartDetails()
    });

    return unsubscribe;

  },[navigation])
  
  return (
    <View>
      <Toast position='top'/>
      
     
       {/* <AntDesign
          
              name='shoppingcart'
              size={50}
              color='gray'
              // onPress={() => proceedCheckout(jwt.user._id)}
              // onPress={() => proceedCheckout(SyncStorage.get("cartId"))}
              onPress={() => proceedCheckout()}
            />
        <Text style={{fontWeight:'bold', fontSize: 20}}>Items Present in Cart = { cartQuantity ? cartQuantity : "Empty Cart"}</Text>
       <Input
          placeholder='Search'
          leftIcon={
            <AntDesign
              name='search1'
              size={24}
              color='gray'
            />
           
          }
        /> */}
      
      {loading ? 
      <ActivityIndicator size="large" />
      :
      <FlatList
      style={styles.vendor_list}
      numColumns={1}
      data={data}
      renderItem={renderItem}
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
             
                  <Ionicons
                  name='chevron-back-outline'
                  size={25}
                  onPress={() => hideModal()}
                  />
                  <Text style={styles.vendor_modalText}>{modalProduct.description} </Text>                    


                  <View style={{alignItems:'center'}}>
                          <Image
                            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tomato.jpg/220px-Tomato.jpg" }}
                            containerStyle={styles.vendor_single_img}
                            // PlaceholderContent={<ActivityIndicator />}
                          /> 
                  </View>
                  <View style={{alignItems:'center'}}>
                        <Text style={styles.vendor_modal_card_header}> {modalProduct.name}</Text>
                  </View>

 
        

                <View style={styles.vendor_modal_content}>
                  <View>
                    <Text style={styles.vendor_modalText}>Quantity: {modalProduct.stock} </Text>
                    <Text style={styles.vendor_modalText}>4 kg </Text>
                    <Text style={styles.vendor_modalText}>{modalProduct.description} </Text>                    
                  </View>
                  {/* <Button
                    title={'-'}
                            // containerStyle={{
                            //   width: 200,
                            //   marginHorizontal: 50,
                            //   marginVertical: 10,
                            // }}
                     onPress={() => {
                      if(quantity > 1) {
                        setQuantity(quantity-1)
                        let totalPrice = modalProduct.price * (quantity - 1)
                        setProductPrice(totalPrice)
                      }
                    }}
                    />
                     <Image
                            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tomato.jpg/220px-Tomato.jpg" }}
                            containerStyle={styles.vendor_img}
                            // PlaceholderContent={<ActivityIndicator />}
                          />
                       <Button
                            title={'+'}
                            // containerStyle={{
                            //   width: 200,
                            //   marginHorizontal: 50,
                            //   marginVertical: 10,
                            // }}
                            // onPress={() => createCustomerOrder()}
                            onPress={() => {
                              setQuantity(quantity+1)
  
                              let totalPrice = modalProduct.price * (quantity + 1)
                              setProductPrice(totalPrice)
                            }}
                          /> */}
                </View>
                <Button
                title={"Add to cart"}
                onPress={() =>{ 
                  addNewProductToCart
                  (modalProduct._id, 
                  modalProduct.name,
                  modalProduct.grade,
                  modalProduct.price,
                  quantity,
                  jwt.user._id
                  )
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
        
        {/* <Modal
        animationType="slide"
        transparent={true}
        visible={cartModalVisible}
        onRequestClose={() => {
          setCartModalVisible(false);
        }}
        style={{height: '50%'}}
      > */}
{   !loading &&
        <View style={styles.vendor_cart_tab}>
                <Ionicons
                name='basket'
                size={20}
                color='#fff'
                />
                
                <Text style={{color:'#fff', fontWeight:'bold', width: '30%'}}>
                  { cartQuantity ? cartQuantity : "Empty Cart"}
                  { cartQuantity && (cartQuantity > 1 ? " items" : " item")}
                </Text>

                <Pressable
                style={{
                  flexDirection:'row'
                }}
                onPress={() => proceedCheckout()}
                >
                  <Text style={{color:'#fff', fontWeight:'bold'}}>View  cart</Text>
                  <Ionicons
                  name='arrow-forward'
                  size={20}
                  color='#fff'
                  style={{marginLeft: 2}}
                  />
                </Pressable>

        </View>}

      {/* </Modal> */}




          
          
    </View>
  )
}

const styles = StyleSheet.create({
  vendor_container: {
    flex: 1,
    marginTop: 2,
    margin: 6,
    backgroundColor:'#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 30,
    shadowColor:'gray'
  },
  vendor_list: {
    width: '100%',
    marginBottom: 40
  },
  vendor_item: {
    aspectRatio: 1,
    width: 30,
    flex: 1,
    borderRadius: 50
  },
  vendor_modal: {
    // height: '50%', //half screen modal
    height:'100%',
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
  vendor_single_img: {
    width: '50%',
    aspectRatio: 1,
    borderRadius: 5
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
  },
  vendor_card: {
    flexDirection:'row',
    justifyContent:'space-around',
  },
  vendor_subcard_1:{
    width:'50%'
  },
  vendor_card_header: {
    fontSize: 22,
    fontWeight:'bold',
    color:'black',
    textTransform:'uppercase'
  },
  vendor_modal_card_header: {
    fontSize: 25,
    fontWeight:'bold',
    color:'black',
    textTransform:'uppercase',
    marginTop: 10
  },
  vendor_card_price: {
    fontSize: 22,
    fontWeight:'bold',
    color:'green',
  },
  vendor_cart_tab: {
    backgroundColor:'#36c93e',
    padding: 10,
    flexDirection:'row',
    justifyContent:'space-around',
    height: '7%',
    position:"absolute",
    bottom: 0,
    width:'100%'
  },
  checkout_content: {
    backgroundColor:'#ffff', 
    width:'65%', 
    textAlign:'center',
    color:'black',
    padding:5,
  },
  product_img:{
    width:100,
    aspectRatio:1,
    borderRadius: 10,
    // marginLeft:220,
    // marginBottom:200,
    // position:'absolute',
    // marginTop:-75

  },
  vendor_product_details_button: {
    // positon:"relative",
    // alignItems: "center",
    alignItems:"center",
    backgroundColor: "#DDDDDD",
    padding: 20,
    margin: 25,
    // height:110,
    textAlign:'center',
    backgroundColor:'#fff',
       
    elevation:30,
    shadowColor: 'gray',
    borderRadius:20,
  },

  });