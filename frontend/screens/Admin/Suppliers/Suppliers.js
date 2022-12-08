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
  import { Icon, Input, Button, Tab, TabView, Image } from '@rneui/themed';
  import AntDesign from "react-native-vector-icons/AntDesign";
  import Ionicons from "react-native-vector-icons/Ionicons";

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Charan',
      ph_no: 9034505345,
      rating: 4.6
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Charan',
      ph_no: 9034505345,
      rating: 4.6
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name: 'Charan',
      ph_no: 9034505345,
      rating: 4.6
    },
  ];
  
  const Item = ({ name,ph_no,rating }) => (
    <TouchableOpacity
    style={styles.suppliers_button}
    // onPress={onPress}
    >
          <View 
          // style={styles.item}
          >
            <Text style={styles.title}>Product Name: {name}</Text>
            <Text style={styles.title}>Available Stock: {ph_no}</Text>
            <Text style={styles.title}>Grade : {rating}</Text>
          </View>
          <View>
            <Image
                source={{ 
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&usqp=CAU" 
                }}
                containerStyle={styles.suppliers_img}
                // PlaceholderContent={<ActivityIndicator />}
            />
          </View>
    </TouchableOpacity>
  );
  

const Suppliers = ({ navigation, route  }) => {
  const [index, setIndex] = useState(0);

  const renderItem = ({ item }) => (
    <Item 
    name={item.name} 
    ph_no={item.ph_no}
    rating={item.rating}
    />
  );
    return (
        <SafeAreaView>
              <View style={styles.suppliers_cont}>
                    <Text style={styles.suppliers_head}>Suppliers</Text>
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
    suppliers_head:{
        textAlign:'center',
        fontWeight:"bold",
        fontSize: 20
    },
    suppliers_cont: {
      padding:10
    },
    suppliers_button: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      // alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
      margin: 2,
    },
    suppliers_img: {
        // borderRadius: 20
        width: 30,
        aspectRatio: 1,
        borderRadius: 10
    }
});

export default Suppliers;