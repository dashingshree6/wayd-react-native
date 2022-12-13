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
import { Input, Button} from '@rneui/themed';
// import { Cell, Section, TableView } from 'react-native-tableview-simple';

//
import axios from 'axios';
const API = 'https://2171-49-205-239-58.in.ngrok.io/api/users'

const TOKEN= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA4MjY5NDB9.IjTKrEnXuu3d_aiUUIG5LrSu3v3XZfgFrT7kkQXkFps"


//

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

    const renderItem = ({ item }) => (
        <Item 
        user={item}
        />
    );
    //
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const getAllProducts= () => {
        setLoading(true)
        axios.get(API , { headers: {"Authorization" : `Bearer ${TOKEN}`} })
        .then(res => {
        console.log(res.data);
        setData(res.data.filter(i => i.role === 0))
        setLoading(false)
        }).catch((error) => {
        console.log(error)
        setLoading(false)
        });
    }
    
    useEffect(()=> {
        getAllProducts()
    },[])
    //
    return (
        <SafeAreaView>
                <View>
                     <View style={styles.customers_btn}>
                        <Button
                          title={'Create Customer'}
                          containerStyle={{
                            width: 200,
                            marginHorizontal: 50,
                            marginVertical: 10,
                          }}
                        />
                    </View>
                    {/* <TableView appearance="light">
                        <Section header="Customers List" footer="A Footer">
                            <Cell cellStyle="Basic" title="Basic" />
                            <Cell cellStyle="RightDetail" title="RightDetail" detail="Detail" />
                            <Cell cellStyle="LeftDetail" title="LeftDetail" detail="Detail" />
                            <Cell
                            cellStyle="Subtitle"
                            title="Subtitle"
                            detail="No linebreakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
                            />
                            <Cell
                            cellStyle="Basic"
                            title="Pressable w/ accessory"
                            accessory="DisclosureIndicator"
                            // onPress={() => console.log('Heyho!')}
                            />
                        </Section>
                    </TableView> */}
                    <View style={styles.customers_table_header}>
                        <View style={{ width: '33%'}}>
                            <Text style={styles.customers_table_header_cell}>Name</Text>
                        </View>
                        <View style={{ width: '33%'}}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>Due</Text>
                        </View>
                        <View style={{ width: '33%'}}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>CC</Text>
                        </View>
                    </View>

                    {
                        loading ?
                        <ActivityIndicator size="large" />
                        :
                        <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
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
    }
});

export default Customers;