import { View, Text, SafeAreaView, StyleSheet, FlatList,Modal,Pressable, TouchableOpacity, } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Input, Button, Tab } from '@rneui/themed'
import axios from 'axios'


// const API="https://8a02-49-205-239-58.in.ngrok.io/api/discount"
// const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA5ODE0Mzl9.lRcod0OvG39rzWw85MTa5sQWN9TMGghQDlRlvzZ6CiE"


const Item = ({ code,description,_id }) => (
    
    <View style={{ flexDirection: 'row' }}>
    <View style={{ width: '33%',}}>
        <Text style={{ fontSize: 16, textAlign: 'center'}}>{_id}</Text>
       
    </View>
    <View style={{ width: '33%',}}>
        <Text style={{ fontSize: 16, textAlign: 'center'}}>{code}</Text>
       
    </View>
    <View style={{ width: '33%',}}>
        <Text style={{ fontSize: 16, textAlign: 'center'}}>{description}</Text>
       
    </View>
    
</View>
  );

const Coupon = () => {
  const [modalVisible, setModalVisible] = useState(false);
  // const [coupons, setCoupons] =  useState([])
  const [values, setValues] = useState({
    code:'',
    description:'',
    discount: '',
    order_limit: '',
    status: '',
    // formData: new FormData()
  })
  const [loading, setLoading] = useState(true)
// const {
//   code,
//   description,
//   discount,
//   order_limit,
//   formData
// } = values;


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
  // axios.post(API ,
  // {
  //   headers: {"Authorization" : `Bearer ${TOKEN}`},
  //   data: JSON.stringify(values)
  // })
  // .then(res => {
  //   console.log(res.data);
  // }).catch((error) => {
  //   console.log(error)
  //   setLoading(false)
  //   });


  //   setModalVisible(!modalVisible)
  setLoading(true);
  var myHeaders = new Headers();

  myHeaders.append(
    'Authorization',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA5ODE0Mzl9.lRcod0OvG39rzWw85MTa5sQWN9TMGghQDlRlvzZ6CiE'
  );

  myHeaders.append('Content-Type', 'application/json');

  fetch('https://8a02-49-205-239-58.in.ngrok.io/api/discount', {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      code: values.code,
      description: values.description,
      discount: values.discount,
      order_limit: values.order_limit,
      status: values.status,
    }),
  })
    .then((response) => {
      setLoading(false)
      response.text();
    })
    .then((result) => console.log(result))
    .catch((error) => console.log(error));


  }




    const renderItem = ({item}) => (
        <Item _id={item._id} code={item.code} description={item.description}/>
    )

  const [data,setData] = React.useState({});

    const getCoupon =()=>{
      axios.get(`https://8a02-49-205-239-58.in.ngrok.io/api/discount`, { headers : {"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA5ODE0Mzl9.lRcod0OvG39rzWw85MTa5sQWN9TMGghQDlRlvzZ6CiE`}})
    .then(res => {
        console.log(res.data)
        setData(res.data)
      }).catch((error) => {
        console.log(error)
      });
}
    useEffect(() => {
        getCoupon()
    },[])



  return (
<SafeAreaView>
  <View style={styles.live_orders_cont}>
                      <Text style={styles.live_orders_head}>Coupon</Text>
                      </View>
                       <View>
                     <View style={styles.customers_btn}>
                        <Button
                          title={'Create Coupon'}
                          containerStyle={{
                            width: 200,
                            marginHorizontal: 50,
                            marginVertical: 10,
                          }}
                          onPress={() => setModalVisible(true)}
                        />
                    </View>
                     
                         <View style={styles.customers_table_header}>
                        <View style={{ width: '33%'}}>
                            <Text style={styles.customers_table_header_cell}>Id</Text>
                        </View>
                        <View style={{ width: '33%'}}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>Code</Text>
                        </View>
                        <View style={{ width: '33%'}}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>Description</Text>
                        </View>
                    </View>
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
                    
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => createCoupon()}
                    >
                      <Text style={styles.textStyle}>Create</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
          </SafeAreaView>
  )
}

export default Coupon;


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
        backgroundColor:'silver'
      },
      customers_btn: {
        alignItems:'center'
      },
      customers_table_header:{
          flexDirection:"row",
          borderBottomColor:'black',
          borderBottomWidth: 1,
          margin: 6
      },
      customers_table_header_cell: {
          fontWeight:'bold',
          marginBottom: 5,
          fontSize: 16,
          textAlign: 'center',
      },
      customers_table_row:{
          display:"flex",
          flexDirection:"row",
          justifyContent:'space-around'
      },
      live_orders_head:{
        textAlign:'center',
        fontWeight:"bold",
        fontSize: 20,
        color:'#000',
    },
    content:{
        marginLeft:27
        // textAlign:'center',
        // justifyContent:'center',
    //   alignItems: "center",
  },
    live_orders_cont: {
      padding:10
    },
    sname:{
        fontWeight:"bold",
        fontSize: 16,
        color:'#000'
    },
    live_orders_btn: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 25,
      margin: 5,
      height:200,
      width:300,
      marginLeft:35
    }

});