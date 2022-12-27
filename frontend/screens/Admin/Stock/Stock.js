import { View, Text, FlatList, Modal, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, ListItem, Icon, Avatar, Input, CheckBox   } from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const list2 = [
    {
        "isPiece": false,
        "stock": 35,
        "sold": 0,
        "_id": "61a8c81b1e5a79501663f912",
        "name": "Plum",
        "description": "healthy",
        "category": "fruits",
        "grade": "B",
        "price": 40,
        "packages": [],
        "stock_daily": [],
        "createdAt": "2021-12-02T13:20:27.933Z",
        "updatedAt": "2021-12-02T13:20:27.933Z",
        "__v": 0
    },
]

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

export default function Stock() {
    const [expanded,setExpanded] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState(null);
    const [check2, setCheck2] = useState(false);

  return (
    <View>
           <Button
            onPress={() => setModalVisible(true)}
              title={'Update Stock'}
              containerStyle={{
                // width: 200,
                // marginHorizontal: 50,
                // marginVertical: 10,
                flexDirection:'row',
                justifyContent:'center',
                margin: 15
              }}
            />

            <FlatList
            data={list2}
            // keyExtractor={(item) => item.id}
            // extraData={selectedId}
            renderItem={({item}) => (

           

                        <ListItem.Accordion
                        content={
                            <>
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                            </ListItem.Content>
                            </>
                        }
                        isExpanded={expanded}
                        onPress={() => {
                            setExpanded(!expanded);
                        }}
                        icon={<AntDesign name={'down'} size={20}/> }
                        >
                        {list2.map((l, i) => (
                            <ListItem 
                            key={i} 
                            // onPress={log}
                            bottomDivider>
                            {/* <Avatar title={l.name[0]} source={{ uri: l.avatar_url }} /> */}
                            <ListItem.Content>
                                <ListItem.Title>Stock : {item.stock}</ListItem.Title>
                                <ListItem.Title>Extra : {l.name}</ListItem.Title>
                                <ListItem.Title>Sold : {item.sold}</ListItem.Title>
                                <ListItem.Title>Price : {item.price}</ListItem.Title>
                                <ListItem.Title>Samples : {l.name}</ListItem.Title>
                                <ListItem.Title>Waste : {l.name}</ListItem.Title>
                                <ListItem.Title>Soldable : {l.name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                            </ListItem>
                        ))}
                        </ListItem.Accordion>

            )}
            />

        <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView>
            <View style={styles.centerContent}>

            
            <View>
          
                <Text style={styles.stock_header} >Stock In/out</Text>
                <Dropdown
                    style={styles.stock_dropdown}
                    placeholderStyle={styles.stock_placeholderStyle}
                    selectedTextStyle={styles.stock_selectedTextStyle}
                    inputSearchStyle={styles.stock_inputSearchStyle}
                    iconStyle={styles.stock_iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Product"
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={item => {
                    setValue(item.value);
                    }}
                    // renderLeftIcon={() => (
                    // <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                    // )}
                />

                <Dropdown
                    style={styles.stock_dropdown}
                    placeholderStyle={styles.stock_placeholderStyle}
                    selectedTextStyle={styles.stock_selectedTextStyle}
                    inputSearchStyle={styles.stock_inputSearchStyle}
                    iconStyle={styles.stock_iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select"
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={item => {
                    setValue(item.value);
                    }}
                    // renderLeftIcon={() => (
                    // <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                    // )}
                />

                <TextInput 
                
                style={styles.inputStyle}
                
                placeholder="Amount of Stock In/Out"
                // leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={value => this.setState({ comment: value })}
                />

                <TextInput style={styles.inputStyle}
                placeholder="Add Sampled Stock"
                // leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={value => this.setState({ comment: value })}
                />

                <TextInput style={styles.inputStyle}
                placeholder="Add Waste Stock"
                // leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={value => this.setState({ comment: value })}
                />

                <TextInput style={styles.inputStyle}
                placeholder="Add Extra Stock"
                // leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={value => this.setState({ comment: value })}
                />

                <TextInput style={styles.inputStyle}
                placeholder="Change Price"
                // leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={value => this.setState({ comment: value })}
                />

                <CheckBox
                center
                title="Log stock for the day?"
                checkedIcon={<FontAwesome name='dot-circle-o' size={20}/>}
                uncheckedIcon={<FontAwesome name='circle-o' size={20}/>}
                checked={check2}
                onPress={() => setCheck2(!check2)}
                />

            <Button
              title={'Add Stock'}
              containerStyle={{
                flexDirection:'row',
                justifyContent:'center',
                // margin: 15
                marginRight:140
              }}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <Button
              title={'Close'}
              containerStyle={{
            width:100,
            marginLeft:210,
            position:'absolute',
            marginTop:600
              }}
              color='black'
              onPress={() => setModalVisible(!modalVisible)}
            />
                        <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
                >
                </Pressable>
            </View>

            </View>
            </ScrollView>
        </Modal>
        <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
        >
            {/* <Text style={styles.textStyle}>Show Modal</Text> */}
        </Pressable>

        </View>
  )
}

const styles = StyleSheet.create({
  inputStyle: {   
    marginTop: 25,
    width: 310,
    height: 50,
    borderWidth:1.1,
    paddingHorizontal: 35,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor:'black',
    color:'black',
    paddingBottom:1,
    marginHorizontal:50
  },
  centerContent:{
    justifyContent:"center",
    alignItems:'stretch',
    marginTop:50,
    width:"100%"
  }  ,
  stock_header:{
        fontSize: 25,
        fontWeight:'bold',
        textAlign:"center",
        borderBottomColor:'black',
        // borderBottomWidth:1,
        width:310,
        marginHorizontal:50
    },
    stock_dropdown: {
        margin: 10,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.6,
        width:310,
        marginHorizontal:50
      },
      ant_close:{
        position:'absolute',
        // justifyContent:'flex-start'
        marginHorizontal:50
      },
      stock_icon: {
        marginRight: 5,
      },
      stock_placeholderStyle: {
        fontSize: 16,
      },
      stock_selectedTextStyle: {
        fontSize: 16,
      },
      stock_iconStyle: {
        width: 20,
        height: 20,
      },
      stock_inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
  });