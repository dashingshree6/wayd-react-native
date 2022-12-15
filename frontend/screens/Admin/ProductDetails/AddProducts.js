import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView, TextInput} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {Button, Stack, ButtonGroup} from '@rneui/themed';
const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
// import axios from 'axios';
const AddProducts = () => {
  const API = 'https://f5b6-49-205-239-58.in.ngrok.io/api/product/create';
  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA3MTAzODd9.jIhWWHg1Zh3nChGzUZbgMiGj3oVcrQkVbwEUz-PTtyc';

  const [productName, setProductsName] = React.useState('');
  const [productDescription, setProductDescription] = React.useState('');

  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState(['Juice', 'FRUIT', 'VEG']);
  const [stock, setStock] = React.useState('');
  const [grade, setGrade] = React.useState(['A', 'B', 'C']);
  console.log(productDescription);
  console.log(productName);
  console.log(price);
  //   axios.post(
  //     'http://rallycoding.herokuapp.com/api/music_albums',
  //     {
  //       param1: 'value1',
  //       param2: 'value2',
  //       //other data key value pairs
  //     },
  //     {
  //       headers: {
  //         'api-token': TOKEN,
  //         //other header fields
  //       },
  //     },
  //   );

  return (
    <SafeAreaView>
      <Text style={{fontSize: 15, marginHorizontal: 10, marginVertical: 10}}>
        Product Image
      </Text>
      <ButtonGroup
        buttons={['Choose File', 'No Choose File']}
        //   selectedIndex={selectedIndex}
        onPress={value => {
          //     setSelectedIndex(value);
        }}
        containerStyle={{marginBottom: 20}}
      />

      <TextInput
        style={styles.input}
        placeholder="Product Name"
        onChangeText={e => setProductsName(e.target.value)}
        value={productName}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Description"
        onChangeText={e => setProductDescription(e.target.value)}
        value={productDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        onChangeText={e => setPrice(e.target.value)}
        value={price}
      />
      <SelectDropdown
        buttonStyle={styles.input}
        buttonTextStyle={styles.ButtonText}
        defaultButtonText={'Select Category'}
        data={category}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          setCategory(selectedItem);
        }}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        onChangeText={e => setStock(e.target.value)}
        value={stock}
      />
      <SelectDropdown
        buttonStyle={styles.input}
        buttonTextStyle={styles.ButtonText}
        defaultButtonText={'Select Grade'}
        data={grade}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          setGrade(selectedItem);
        }}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
      <Button title="Submit" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '95%',
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },

  ButtonText: {
    color: '#444',
    textAlign: 'left',
  },
  ropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  rowStyle: {
    backgroundColor: '#EFEFEF',
    width: '90%',
    borderBottomColor: '#C5C5C5',
  },
  rowTextStyle: {color: '#444', textAlign: 'left'},
});

export default AddProducts;
