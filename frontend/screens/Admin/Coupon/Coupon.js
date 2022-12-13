import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Row, Rows, Table, TableWrapper } from 'react-native-table-component'
import { Button } from '@rneui/themed'
import axios from 'axios'


const API="https://1c25-49-205-239-58.in.ngrok.io/api/discount"
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA4OTgzNzF9.Z1IEHG62Q_nab-nEXjdg3eiCy9w_S_nvDPlWL_eqstk"


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

    const renderItem = ({item}) => (
        <Item _id={item._id} code={item.code} description={item.description}/>
    )


    const [data,setData] = React.useState({});



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
          </SafeAreaView>
  )
}

export default Coupon;


const styles = StyleSheet.create({
    sales_cont: {
        padding:10
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