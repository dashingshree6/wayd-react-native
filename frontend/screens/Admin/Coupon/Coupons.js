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

  const API = 'https://852c-49-205-239-58.in.ngrok.io/api/discount'

  const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzEwNDIwNzB9.RRMyiWc0DqOgxn3qehN0jeX3JAk_I-xcn-mIbFzhGa4"


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
            marginLeft:260,
            // position:'absolute'
          }}
          />
          {/* <Button 
          title={'Delete'}
          containerStyle={{
            width:75,padding:2,
            marginLeft:250,
          
          }}
          /> */}
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
                          onPress={() => setModalVisible(true)}
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

              <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
                style={styles.procurement_modal}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                  <Input
                    placeholder="Coupon Code"
                    // onChangeText={value => setValues({ ...values, code: value })}
                    onChangeText={(value) => onChangeCode(value)}
                    />
                       <Input
                    placeholder="Order Number"
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
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => createCoupon()}
                    >
                      <Text style={styles.textStyle}>Submit</Text>
                    </Button>
                  </View>
                </View>
              </Modal>
        </SafeAreaView>
    )
}



export default Coupons;

const styles = StyleSheet.create({
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
  // width:1
}
});