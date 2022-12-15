import React, { useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Pressable,
    TextInput
  } from 'react-native';
  import { Icon, Input, Button, Tab, TabView } from '@rneui/themed';

  //
  import axios from 'axios';

  const API = 'https://474b-49-205-239-58.in.ngrok.io/api/discount'

  const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzEwNzE3Mzd9.JHsh5BapP604aRq4ymwryyX53v3-iwaaW89-3mRo0G8"


  const Item = ({code,description,_id}) => (
    <View>
    <TouchableOpacity
    style={styles.sales_live_button}

    > 
            <View 
            style={styles.item}
            >
        
              <Text style={styles.title}>Code : {_id}</Text>
              <Text style={styles.title}>Description : {code}</Text>
              <Text style={styles.title}>Discount : {description}</Text>
            </View>           


          <Button 
          title={'Edit'}
          containerStyle={{
            width:75,
            padding:2,
            marginLeft:290,
            // position:'absolute'
          
          }}
          />
          <Button 
          title={'Delete'}
          containerStyle={{
            width:75,padding:2,
            marginLeft:190,
            marginTop:-43
          
          }}
          />
    </TouchableOpacity>
          </View>
  );
  

const Coupons = ({ navigation, route  }) => {
  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
 
  const [values, setValues] = useState({
    code:'',
    description:'',
    discount: '',
    order_limit: '',
    status: '',
    // formData: new FormData()
  })
const onChangeCode = (value) => {
  setValues({ ...values, code: value });
};

const onChangeDescription = (value) => {
  setValues({ ...values, description: value });
};

const onChangeDiscount = (value) => {
  setValues({ ...values, discount: value });
};
const onChangeOrderLimit = (value) => {
  setValues({ ...values, order_limit: value });
};

const onChangeStatus = (value) => {
  setValues({ ...values, status: value });
};


const createCoupon =()=>{

  // 1
  // setLoading(true);
  // var myHeaders = new Headers();

  // myHeaders.append(
  //   'Authorization',
  //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzEwNjQ1Mjl9.d4KxtwgqTGJn6-c6tnxSfSW2peRDwBfjA7LnVhJmcoQ'
  // );
  // myHeaders.append('Content-Type', 'application/json');

  // fetch('https://5d27-49-205-239-58.in.ngrok.io/api/discount', {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: JSON.stringify({
  //     code: values.code,
  //     description: values.description,
  //     discount: values.discount,
  //     order_limit: values.order_limit,
  //     status: values.status,
  //   })
  // })
  //   .then((response) => {
  //     setLoading(false)
  //     response.text();
  //   })
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log(error));


// 2
// axios({
//   method: 'post',
//   url:'https://5d27-49-205-239-58.in.ngrok.io/api/discount',
//   data:{
//     status: true,
//     code: "coupon new 123",
//     order_limit: 5,
//     discount: 10,
//     description: "rate"
//   },
//   headers: {
//     "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzEwNjQ1Mjl9.d4KxtwgqTGJn6-c6tnxSfSW2peRDwBfjA7LnVhJmcoQ",
//     "Accept": "application/json",
//     "Content-Type":"application/json"
//   }
// })
// .then(function (response) {
//   console.log("response", JSON.stringify(response.data))
// })
// .catch(function (error) {
//   console.log("error", error)
// })



const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json','Accept': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzEwNzE3Mzd9.JHsh5BapP604aRq4ymwryyX53v3-iwaaW89-3mRo0G8'},
  data: JSON.stringify({ 
    status: true,
    code: "dark knight 123",
    order_limit: 1,
    discount: 18,
    description: "rate"
  })
};

fetch('https://474b-49-205-239-58.in.ngrok.io/api/discount', requestOptions)
.then((response) => response.json())
.then((json) => {
  console.log('Fetch API Response', json.data);
})
.catch((error) => {
console.error(error);
});



 }



const renderItem = ({item}) => (
  <Item _id={item._id} code={item.code} description={item.description}/>
)  

  //
  
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const getCoupons= () => {
   
    axios.get(API , { headers: {"Authorization" : `Bearer ${TOKEN}`} })
    .then(res => {
    console.log(res.data);
    setData(res.data)
   
    }).catch((error) => {
    console.log(error)
   
    });
 }
  useEffect(()=> {
    getCoupons()
  },[])
 
    return (
        <SafeAreaView>
              <View style={styles.sales_cont}>
                  <View style={styles.sales_btn}>
                        <Button
                          title={'Coupons'}
                          containerStyle={{
                            width: 200,
                            marginHorizontal: 50,
                            marginVertical: 10,
                          }}
                          // onPress={() => setModalVisible(true)}
                          onPress={() => createCoupon()}

                        />
                    </View>
                    <Tab
                      value={index}
                      onChange={(e) => setIndex(e)}
                      indicatorStyle={{
                        backgroundColor: 'white',
                        height: 3,
                      }}
                      variant="primary"
                    >
                        <Tab.Item
                          title="Available Coupons"
                          titleStyle={{ fontSize: 12 }}
                          // icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
                        />
                        <Tab.Item
                          title="Add Coupons"
                          titleStyle={{ fontSize: 12 }}
                          // icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
                        />
                    </Tab>

                    {/* <TabView value={index} onChange={setIndex} animationType="spring">
                        <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
                          <Text h1>Recent</Text>
                        </TabView.Item>
                        <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
                          <Text h1>Favorite</Text>
                        </TabView.Item>
                    </TabView> */}
                    
          <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
/>         
                 

              </View>
              <View
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
                style={styles.procurement_modal}
                >
                <View style={styles.head}><Text>Add Your Coupon</Text></View>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                  <Input
                    placeholder="Coupon Code"
                    // onChangeText={value => setValues({ ...values, code: value })}
                    onChangeText={(value) => onChangeCode(value)}
                    />
                       <Input
                    placeholder="Order Limit"
                    // onChangeText={value => setValues({ ...values, description: value })}
                    onChangeText={(value) => onChangeOrderLimit(value)}
                    keyboardType='numeric'
                    />
                       <Input
                    placeholder="Discount"
                    // onChangeText={value => setValues({ ...values, discount: value })}
                    onChangeText={(value) => onChangeDiscount(value)}
                    keyboardType='numeric'
                    />
                             <Input
                    placeholder="Description"
                    // onChangeText={value => setValues({ ...values, order_limit: value })}
                    onChangeText={(value) => onChangeDescription(value)}
                    />
                             <Input
                    placeholder="Status"
                    // onChangeText={value => setValues({ ...values, status: value })}
                    onChangeText={(value) => onChangeStatus(value)}
                    />
                    
                    <Button
                      // style={[styles.button, styles.buttonClose]}
                      style={styles.button}
                      title="POST: Create Coupon"
                      onPress={() => createCoupon()}
                    >
                      <Text style={styles.textStyle}>Add Coupon</Text>
                      {/* <View style={{ backgroundColor: 'blue', padding: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Text>
        </View> */}
                    </Button>
                  </View>
                </View>
              </View>
        </SafeAreaView>
    )
}



export default Coupons;

const styles = StyleSheet.create({
  head:{
textAlign:'center',
alignItems:'center',
  },
  sales_cont: {
    padding:10
  },
  sales_btn: {
    alignItems:'center'
  },
  sales_orders_type: {
    display:'flex',
    flexDirection: 'row',
  },
  sales_past_orders:{
    alignItems:'flex-end'
  },
  item: {
    backgroundColor: 'silver',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  sales_live_button: {
    // alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 2
  },
  procurement_modal : {
    backgroundColor:'silver',
    padding:10
  },
  edit_btn:{

flexDirection:'column'
  },
  delete_btn:{
width:10,
height:20
  },
centeredView:{
  // alignItems:'center',

  justifyContent:'center',
  alignContent:'center'
},
button:{
  width:10,
  backgroundColor:'red',
},
textStyle:{
  color:'white'
}
});