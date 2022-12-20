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
  import SyncStorage from 'sync-storage';
  import { getAllProducts, addProductToCart } from '../../ApiCalls/ApiCalls';
  import Toast from 'react-native-toast-message'
  
  
  
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
  
  export default function AddProducts({navigation}) {
  const jwt = JSON.parse(SyncStorage.get("jwt"));
  console.log("Vendor Homepage jwt",jwt)
  
  const [orders, setOrders] = useState({
    products:"",
    originalAmount: "",
    user:"",
    address:"",
    coupon:null
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
  
  
  
    const [modalVisible, setModalVisible] = useState(false);
  
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
        navigation.navigate("SelectCustomerForm")
      // } 
    }
  
    const addNewProductToCart = (product_id, product_name, product_grade, product_price,product_quantity, userId) => {
      hideModal()
      let obj = {
        _id: product_id,
        name: product_name,
        grade: product_grade,
        price: product_price,
        quantity: product_quantity,
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
  
  
  
    useEffect(()=> {
        getProductsAll()
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
              /> */}
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
          />
        
        {loading ? 
        <ActivityIndicator size="large" />
        :
        <FlatList
        style={styles.vendor_list}
        numColumns={2}
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
  
                  <Text style={styles.vendor_head}>Product Name: {modalProduct.name}</Text>
  
                  <View style={styles.vendor_modal_content}>
                    <View>
                      <Text style={styles.vendor_modalText}>Grade: {modalProduct.grade} </Text>
                      <Text style={styles.vendor_modalText}>Quantity: {quantity} </Text>
                      <Text style={styles.vendor_modalText}>Price: {productPrice} </Text>                    
                    </View>
                    <Button
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
                          />
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