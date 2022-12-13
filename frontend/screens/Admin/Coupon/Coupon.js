import { View, Text, SafeAreaView, StyleSheet, FlatList,Modal,Pressable, TouchableOpacity, } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Input, Button, Tab } from '@rneui/themed'
import axios from 'axios'


const API="https://271f-49-205-239-58.in.ngrok.io/api/discount"
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA5NTg4NjB9._-vDej75MpK16LHIspr-Da9ALh2P4eMoLy4I4fj0ysM"


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
  const [coupons, setCoupon] = useState([])
    const renderItem = ({item}) => (
        <Item _id={item._id} code={item.code} description={item.description}/>
    )


   



    const [data,setData] = React.useState({});
    const [loading, setLoading] = useState(true)

    const getCoupon =()=>{
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
        getCoupon()
    },[])



  return (


<SafeAreaView>
                <View style={styles.live_orders_cont}>
                      <Text style={styles.live_orders_head}>Coupons</Text>
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
                    // onChangeText={value => setCoupon({ ...productForProcurement, name: value })}
                    />
                       <Input
                    placeholder="Order Number"
                    // onChangeText={value => setCoupon({ ...productForProcurement, count: value })}
                    keyboardType='numeric'
                    />
                       <Input
                    placeholder="Discount"
                    // onChangeText={value => setCoupon({ ...productForProcurement, extra_stock: value })}
                    keyboardType='numeric'
                    />
                             <Input
                    placeholder="Description"
                    // onChangeText={value => setCoupon({ ...productForProcurement, price_generated: value })}
                    />
                             <Input
                    placeholder="Status"
                    // onChangeText={value => setCoupon({ ...productForProcurement, price_generated: value })}
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