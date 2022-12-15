import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    FlatList
  } from 'react-native';
import { Input, Button, Tab, TabView} from '@rneui/themed';
import { getAllUsers } from '../../ApiCalls/ApiCalls';

const Item = (props) => (
        <View style={{ flexDirection: 'row' }}>
           <View style={{ width: '33%',}}>
               <Text style={{ fontSize: 16, textAlign: 'center'}}>{props.user.username}</Text>
           </View>
           <View style={{ width: '33%'}}>
               <Text style={{ fontSize: 16, textAlign: 'center'}}>Rs.2500</Text>
           </View>
           <View style={{ width: '33%'}}>
               <Text style={{ fontSize: 16, textAlign: 'center'}}>15 days</Text>
           </View>
       </View>
  );

const Customers = ({ navigation, route  }) => {
    const [index, setIndex] = useState(0);
    const [users, setUsers] = useState([])
    const [userList, setUsersList] = useState([])
    const { role } = route.params;

    const renderItem = ({ item }) => (
        <Item 
        user={item}
        />
    );
    //
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const getUsersList = () => {
        setLoading(true)
        getAllUsers("get")
          .then((res) => {
            if (res.error) {
              console.log(res.error);
              setLoading(false)
            } else {
              setUsers(res.data);
              setUsersList(res.data.filter(i => i.role === 0))
              setLoading(false)
            }
          })
          .catch((err) => console.log(err));
      };
    
    const filterList = (userRole) => {
        let arr = []
        arr = users.filter(user => user.role === userRole)
        setUsersList(arr)
        console.log(arr)
    }
    
    useEffect(()=> {
        filterList(role)
        getUsersList()
    },[])
    //
    return (
        <SafeAreaView>
                <View>
                <Tab
                value={index}
                onChange={(e) => {
                    setIndex(e)
                    if(e == 0){
                        filterList(0)
                    } else if(e == 1) {
                        filterList(3)
                    } else {
                        filterList(2)
                    }
                    console.log(e)
                }}
                indicatorStyle={{
                    backgroundColor: 'white',
                    height: 3,
                }}
                variant="primary"
                >
                    <Tab.Item
                        title="Customers"
                        titleStyle={{ fontSize: 12 }}
                        // icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
                    />
                    <Tab.Item
                        title="Suppliers"
                        titleStyle={{ fontSize: 12 }}
                        // icon={{ name: 'heart', type: 'ionicon', color: 'white' }}

                    />
                    <Tab.Item
                        title="Delivery"
                        titleStyle={{ fontSize: 12 }}
                        // icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
                    />
                </Tab>

                <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
                
                
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
                    <Text>Favorite</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
                    <Text>Cart</Text>
                </TabView.Item>
                </TabView>

                    {/* <View style={styles.customers_table_header}>
                        <View style={{ width: '33%'}}>
                            <Text style={styles.customers_table_header_cell}>Name</Text>
                        </View>
                        <View style={{ width: '33%'}}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>Due</Text>
                        </View>
                        <View style={{ width: '33%'}}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>CC</Text>
                        </View>
                    </View> */}

                    {
                        loading ?
                        <ActivityIndicator size="large" />
                        :
                        <FlatList
                        data={userList}
                        // renderItem={renderItem}
                        keyExtractor={item => item._id}
                        renderItem={({item})=> (
                            <View style={styles.customers_card}>
                                    <Text style={{ fontSize: 16, textAlign: 'center'}}>Username: {item.username}</Text>
                             
                                    <Text style={{ fontSize: 16, textAlign: 'center'}}>Email: {item.email}</Text>
                            
                                    {/* <Text style={{ fontSize: 16, textAlign: 'center'}}>{item && item["address"]["pincode"]}</Text> */}
                             
                            </View>
                        )}
                        />
                    }

                </View>
        </SafeAreaView>
    )
}

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
    customers_card: {
        backgroundColor:'silver',
        padding: 10,
        margin: 5
    }
});

export default Customers;