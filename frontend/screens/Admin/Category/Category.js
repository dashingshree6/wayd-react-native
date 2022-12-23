import {View, Text, FlatList, StyleSheet, Modal, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Input, Icon, Button} from '@rneui/themed';
import axios from 'axios';
import {getCategories} from '../../ApiCalls/ApiCalls';

const API = 'https://27dc-49-205-239-58.in.ngrok.io/api';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzE4MTg2MDB9.QqYBuZs4YIbqsOOUsR1rD61mMNP0Bgxjo4-cc0P0H5U';

export default function Category() {
  const [categoryName, setCategoryName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState({});

  const getAllCategories = () => {
    getCategories()
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const createCategory = () => {
    let formData = new FormData();
    formData.append('name', categoryName);

    axios
      .post(`${API}/category/create`, {
        headers: {Authorization: `Bearer ${TOKEN}`},
        data: JSON.stringify(formData),
      })
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateCategory = id => {
    let formData = new FormData();
    formData.append('name', categoryName);

    axios
      .put(`${API}/category/${id}`, {
        headers: {Authorization: `Bearer ${TOKEN}`},
        data: JSON.stringify(formData),
      })
      .then(res => {
        setData(res.data);
        setModalVisible(!modalVisible);
      })
      .catch(error => {
        console.log(error);
        setModalVisible(!modalVisible);
      });
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <View>
      <Input
        placeholder="Enter the category"
        //   leftIcon={{ type: 'font-awesome', name: 'comment' }}
        onChangeText={value => setCategoryName(value)}
      />

      <Button
        title={'Create Category'}
        containerStyle={{
          width: 200,
          // marginHorizontal: 50,
          // marginVertical: 10,
        }}
        onPress={() => createCategory()}
      />

      <Text style={styles.category_list_head}>Category List</Text>
      <View style={styles.category_container}>
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View style={styles.category_item}>
            {/* <Text>Id: {item._id}</Text> */}
            <Text style={styles.category_name}>{item.name}</Text>
            <Button
              title={'Update'}
              containerStyle={
                {
                  marginHorizontal: 50,
                  marginVertical: 10,  
                  // borderRadius:10
                  // marginHorizontal: 20,
                  // marginVertical: 10,
                }
              }
              onPress={() => {
                setModalData(item);
                setModalVisible(true);
              }}
              color="#0F4C75"
            />
          </View>
        )}
      />
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setModalVisible(!modalVisible);
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Input
              placeholder="Enter the category"
              defaultValue={modalData.name}
              // value={modalData.name}
              //   leftIcon={{ type: 'font-awesome', name: 'comment' }}
              onChangeText={value => setCategoryName(value)}
            />
            <Button
              title={'Update'}
              containerStyle={{
                width: 200,
                
                // marginHorizontal: 50,
                // marginVertical: 10,
              }}
              onPress={() => updateCategory(modalData._id)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  category_list_head: {
    fontWeight: 'bold',
    margin: 5,
    fontSize: 25,
    textAlign: 'center',
    fontWeight:'bold'
    ,color:'#252A34'
  },
  category_item: {
    marginTop:30,
    backgroundColor: '#fff',
    padding: 20,
    width:350,
    margin: 6,
    height:110,
    marginLeft:'9%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    elevation: 8,
    shadowColor: 'black',
  },
  category_name:{
    padding:22,
    color:'#252A34',
    // fontWeight:'bold',
    fontSize:15
  }
});
