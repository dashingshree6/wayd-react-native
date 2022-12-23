import React, {useState, useEffect} from 'react';
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
import { API, TOKEN } from '../../backend';

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Hari',
      ph_no: 9034505345,
      rating: 4.6
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Charan',
      ph_no: 883505345,
      rating: 4.5
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name: 'Amrut',
      ph_no: 9037742845,
      rating: 3.9
    },
    {
      id: '58694a0f-3da1-471f-bd96-005571e29d72',
      name: 'Shreyas',
      ph_no: 9037742845,
      rating: 3.9
    },
    {
      id: '58694a0f-3da1-471f-bd96-145573249d72',
      name: 'Parvej',
      ph_no: 9037742845,
      rating: 3.9
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571229d72',
      name: 'Amrut',
      ph_no: 9037742845,
      rating: 3.9
    },
  ];
  




 const Item = ({ name,ph_no,rating }) => (
    <TouchableOpacity
    style={styles.suppliers_button}
    // onPress={onPress}
    >
       <Image
                source={{ 
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&usqp=CAU" 
                }}
                containerStyle={styles.suppliers_img}
                // PlaceholderContent={<ActivityIndicator />}
            />
          <View 
          style={styles.parent}
          >
            <Text style={{
                fontWeight:'bold',
                fontSize: 19,
                color:'black'
              }}>{name}</Text>
            <Text style={{
                
                fontSize: 17,
                color:'black'
              }}>{ph_no}</Text>
            <Text style={{marginLeft:-6}}>
            {/* <Text style={styles.sup_rating}>  {rating}</Text> */}
            </Text>
          </View>
          <View>
           
          </View>
    </TouchableOpacity>
  );
  

const Suppliers = ({ navigation, route  }) => {
  const [ allUsers, setAllUser] = useState();
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
                    <Text style={styles.suppliers_head}>SUPPLIERS</Text>
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
        fontSize: 20,
        color:'black',
        padding:18,
        
        
        
        // backgroundColor:""
    },
    suppliers_cont: {
      padding:8,
      backgroundColor:'#ffffff',
      height:'100%',
      borderRadius:10
    },
    
    suppliers_button: {
      position:'relative',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems: "center",
      backgroundColor: "#ffffff",
      padding: 10,
      margin: 18,
      borderRadius:20,
      elevation:14,
      shadowColor: 'black',
      width:350,
      height:125,
      marginLeft:33
    },
    suppliers_img: {
        // borderRadius: 20
        width: 60,
        aspectRatio: 1,
        borderRadius: 10
    },
    sup_rating:{
      color:'#26b50f',
      fontWeight:'bold',
      
    },
    title:{
      color:'red'
    },
});

export default Suppliers;