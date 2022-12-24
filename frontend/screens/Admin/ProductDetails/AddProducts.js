import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, ToastAndroid, Alert} from 'react-native';
import {SafeAreaView, TextInput} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button, Stack, ButtonGroup} from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { Avatar } from 'react-native-paper';
const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
// import axios from 'axios';
const AddProducts = () => {
  const API = 'https://b8a3-49-205-239-58.in.ngrok.io/api/product/create';
  const TOKEN ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzc4N2U0OGUwNzQwYjJlZTAxMzNhZmQiLCJpYXQiOjE2NzE5MTI3ODV9.chdwqefITwSPwybND146mVXVxC64YiDtqjMxPNKZ2hU';

  // const [productName, setProductsName] = React.useState('');
  // const [productDescription, setProductDescription] = React.useState('');

  // const [price, setPrice] = React.useState('');
  // const [category, setCategory] = React.useState(['JUICE', 'FRUIT', 'VEGetable']);
  // const [stock, setStock] = React.useState('');
  // const [grade, setGrade] = React.useState(['A', 'B', 'C']);
  // console.log(productDescription);
  // console.log(productName);
  // console.log(price);
  // //   axios.post(
  // //     'http://rallycoding.herokuapp.com/api/music_albums',
  // //     {
  // //       param1: 'value1',
  // //       param2: 'value2',
  // //       //other data key value pairs
  // //     },
  // //     {
  // //       headers: {
  // //         'api-token': TOKEN,
  // //         //other header fields
  // //       },
  // //     },
  // //   );
  const [productValue, setproductValue] = useState('Category');
  const [Pic, SetPic] = React.useState('');
  const setToastMsg = msg =>{
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

  const uploadImage=()=>{
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setToastMsg("Cancelled image selection");
      } else if (response.errorCode == 'permission') {
        setToastMsg("permission not satisfied");
      } else if (response.errorCode == "others") {
        setToastMsg(response.errorMessage);
      } else if (response.assets[0].fileSize > 2097152) {
        Alert.alert(
          'Maximum image size exeeded',
          "Please choose image under 2 mb",
          [{text: "OK"}],
        );
      } else {
        SetPic(response.assets[0].base64)
      }
    })
  }

  const removeImage=()=>{
    SetPic('')
    setToastMsg("Image removed.")
  }


  return (
    <SafeAreaView style={styles.container}>
<View >
      {/* <Text style={styles.formLabel}> CREATE PRODUCT </Text> */}

{/*  Upload image View  */}
<View style={styles.centerContent}>
{/* <Text style={styles.formLabel}> CREATE PRODUCT </Text> */}
<TouchableHighlight
onPress={() => uploadImage()}
underlayColor="rgba(0,0,0,0)">
  <Avatar.Image
  size={92}
  source={{uri:'data:image/png;base64,' + Pic}}
  color='red'
  />
</TouchableHighlight>
</View>


<View style={[styles.centerContent, {marginTop:25, flexDirection:'row', justifyContent:'space-evenly'}]}>
  <Button 
  mode='contained' 
  color="green"
  containerStyle={{
    borderRadius:5
  }}
  onPress={()=> uploadImage()} 
  title="Upload Image"
  />
  <Button 
    color="#1B1A17"
  mode='contained' 

  containerStyle={{
    borderRadius:5
  }}
  onPress={()=> removeImage()} 
  title="Remove Image"/>
</View>

{/* Rest of the form other than upload img */}
      <View>
        
        <TextInput placeholder="Product Name" style={styles.inputStyle} />
        <TextInput multiline={true} maxLength={300} placeholder="Product Description" style={styles.inputStyle_description} />
        <TextInput placeholder="Price" style={styles.inputStyle_price} />
        <Picker
        style={styles.input}
          selectedValue={productValue}
          onValueChange={currentproductValue => setproductValue(currentproductValue)}>
          <Picker.Item label="Category" value="Category" />
          <Picker.Item label="VEG" value="Vegetable" />
          <Picker.Item label="FRUIT" value="Fruit" />
          <Picker.Item label="JUICE" value="Juice" />
          <Picker.Item label="STAPLE" value="Staple" />
        </Picker>
        {/* <Text
          style={{
            fontSize: 20,
            color: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          Selected: {productValue}
        </Text> */}
        <Button 
       title="CREATE"
       color="primary"
      containerStyle={{
        width:"100%",
        borderRadius:5,
        marginTop:30,

      }}
       onPress={() => alert('Product Created Succesfully!')}
      />
        
      </View>
    </View>


{/* <View style={styles.form_container}>
      <Text style={{fontSize: 16, marginHorizontal: 10, marginVertical: 10, color:'black'}}>
        Product Image
      </Text>
      <ButtonGroup
        buttons={['Choose File', 'No Choose File']}
        //   selectedIndex={selectedIndex}
        onPress={value => {

        }}
        containerStyle={{marginBottom: 20, backgroundColor:'#F6F6D9', fontSize:16, fontColor:"black"}}
      
      />

      <TextInput
        style={styles.input}
        placeholder="Product Name"
        onChangeText={e => setProductsName(e.target.value)}
        value={productName}
        leftIcon={
        <AntDesign
          name=''
          // size={24}
          color='gray'
        />
       
      }
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

      <Button 
       title="Create"
       color="#F98404"
      containerStyle={{
        width:320,
        borderRadius:50,
        textAlign:'center',
        justifyContent:'center',
        marginLeft:17
      }}
       
      />
    
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:130,
  },

  formLabel: {
    fontSize: 22,
    color: '#000',
    textAlign:"center",
    fontWeight:"bold",
    // paddingBottom:1
  },
  inputStyle: {   
    marginTop: 25,
    width: 310,
    height: 80,
    borderWidth:0.7,
    paddingHorizontal: 35,
    borderRadius: 5,
    backgroundColor: '#fff',
    // elevation:14,
    shadowColor:'black',
    color:'black',
    paddingBottom:1,
  },
 
  button_upload:{
    borderRadius:10
  }
  ,
  inputStyle_price: {   
    marginTop: 25,
    width: '50%',
    height: 80,
    paddingHorizontal: 35,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth:0.8,
    shadowColor:'black',
    color:'black',
    paddingBottom:1,
  },
  inputStyle_description: {   
    marginTop: 22,
    width: 310,
    height: 140,
    paddingHorizontal: 35,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth:1,
    shadowColor:'black',
    color:'black',
    paddingBottom:1,
  },
  formText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
     },
  text: {
    color: '#fff',
    fontSize: 20,
  },
input:{
  width:'50%', position:"absolute",
  marginTop:309,
  marginHorizontal:160,
  color:"gray",
  elevation:10,
  shadowColor:"black"
}
,
centerContent:{
  justifyContent:"center",
  alignItems:'center',
  marginTop:100,
  // borderRadius:20
}

//   input: {
//     width: '95%',
//     height: 50,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 8,
   
//     fontSize:15,
//     // elevation:1,
//     // shadowColor:''
//   },
//   form_container:{
//   width:'80%',
//   justifyContent:'center',
//   marginLeft:40,
// // padding:50
// margin:10
//   },

//   ButtonText: {
//     color: '#444',
//     textAlign: 'left',
//     fontSize:15
//   },
//   ropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
//   rowStyle: {
//     backgroundColor: '#EFEFEF',
//     width: '90%',
//     borderBottomColor: '#C5C5C5',
//   },
//   rowTextStyle: {color: '#444', textAlign: 'left'},
});

export default AddProducts;
