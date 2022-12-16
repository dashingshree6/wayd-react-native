import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect} from 'react'
import { getAllUsers } from '../../ApiCalls/ApiCalls';

export default function SalesVendorForm() {
    const [userList, setUsersList] = useState([])    
    const [modalProduct, setModalProduct] = useState({})
    const [loading, setLoading] = useState(true)
  
    const getUsersList = () => {
        setLoading(true)
        getAllUsers("get")
          .then((res) => {
            if (res.error) {
              console.log(res.error);
              setLoading(false)
            } else {
              setUsersList(res.data.filter(i => i.role === 0))
              setLoading(false)
            }
          })
          .catch((err) => console.log(err));
      };
  
    useEffect(()=> {
        getUsersList()
    },[])
  return (
    <View>
      <Text>SalesVendorForm</Text>
      
                    {
                        loading ?
                        <ActivityIndicator size="large" />
                        :
                        <FlatList
                        data={userList}
                        // renderItem={renderItem}
                        keyExtractor={item => item._id}
                        renderItem={({item})=> (
                            <TouchableOpacity style={styles.customers_card}>
                                    <Text style={{ fontSize: 16, textAlign: 'center'}}>Username: {item.username}</Text>
                             
                                    <Text style={{ fontSize: 16, textAlign: 'center'}}>Email: {item.email}</Text>
                            
                                    {/* <Text style={{ fontSize: 16, textAlign: 'center'}}>{item && item["address"]["pincode"]}</Text> */}
                             
                            </TouchableOpacity>
                        )}
                        />
                    }
    </View>
  )
}

const styles = StyleSheet.create({
    customers_card: {
        backgroundColor:'silver',
        padding: 10,
        margin: 5
    }
});