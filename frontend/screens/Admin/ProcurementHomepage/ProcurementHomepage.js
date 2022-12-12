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
    ActivityIndicator
  } from 'react-native';
  import { Icon, Input, Button, Tab, TabView } from '@rneui/themed';

  //
  import axios from 'axios';
  const API = 'https://789f-49-205-239-58.in.ngrok.io/api/order/procure'
  
  const TOKEN= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA2NTQxNjZ9.0hJtqKtOvHWzFo7xpevgtcsFPznS8sSZXxIff_O2y4E"
  //

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Potato',
      stock: 10,
      grade: "A"
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Carrot',
      stock: 10,
      grade: "A"
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Spinach',
      stock: 10,
      grade: "A"
    },
  ];
  
  const Item = (props) => (
    <TouchableOpacity
    style={styles.sales_live_button}
    // onPress={onPress}
    >
          <FlatList
          data={props.procurement.list}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <View 
            // style={styles.item}
            >
              <Text style={styles.title}>Product Name: {item.name}</Text>
              <Text style={styles.title}>Available Stock: {item.extra_stock}</Text>
              <Text style={styles.title}>Count : {item.count}</Text>
            </View>
          )}
          />
    </TouchableOpacity>
  );
  

const ProcurementHomepage = ({ navigation, route  }) => {
  const [index, setIndex] = useState(0);

  const renderItem = ({ item }) => (
    <Item 
    procurement={item}
    />
  );

   //
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const getAllProcurements= () => {
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
    getAllProcurements()
  },[])
 
    return (
        <SafeAreaView>
              <View style={styles.sales_cont}>
                  <View style={styles.sales_btn}>
                        <Button
                          title={'Log Procurement'}
                          containerStyle={{
                            width: 200,
                            marginHorizontal: 50,
                            marginVertical: 10,
                          }}
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
                          title="Fruits"
                          titleStyle={{ fontSize: 12 }}
                          // icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
                        />
                        <Tab.Item
                          title="Vegetables"
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
                      keyExtractor={item => item._id}
                    />
              </View>
        </SafeAreaView>
    )
}

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
    }
});

export default ProcurementHomepage;