import React, {useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    FlatList,
    TouchableOpacity
  } from 'react-native';
  import { Icon, Input, Button, Tab, TabView } from '@rneui/themed';

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
  
  const Item = ({ title,stock,grade }) => (
    <TouchableOpacity
    style={styles.sales_live_button}
    // onPress={onPress}
    >
          <View 
          // style={styles.item}
          >
            <Text style={styles.title}>Product Name: {title}</Text>
            <Text style={styles.title}>Available Stock: {stock}</Text>
            <Text style={styles.title}>Grade : {grade}</Text>
          </View>
    </TouchableOpacity>
  );
  

const ProcurementHomepage = ({ navigation, route  }) => {
  const [index, setIndex] = useState(0);

  const renderItem = ({ item }) => (
    <Item 
    title={item.title} 
    stock={item.stock}
    grade={item.grade}
    />
  );
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

                    <TabView value={index} onChange={setIndex} animationType="spring">
                        <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
                          <Text h1>Recent</Text>
                        </TabView.Item>
                        <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
                          <Text h1>Favorite</Text>
                        </TabView.Item>
                    </TabView>
                    <FlatList
                      data={DATA}
                      renderItem={renderItem}
                      keyExtractor={item => item.id}
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