import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, ToastAndroid, Alert} from 'react-native';
import {SafeAreaView, TextInput} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button, Stack, ButtonGroup} from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { Avatar } from 'react-native-paper';
import { createaProduct } from '../../ApiCalls/ApiCalls';
import { isAuthenticated } from '../../Login';
import Toast from 'react-native-toast-message'
import { API } from '../../backend';

const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
// import axios from 'axios';
const AddProducts = () => {
  const {
    user
    // token
  } = isAuthenticated();
  // const API = 'https://6732-49-205-239-58.in.ngrok.io/api/product/create';
  // const TOKEN ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzc4N2U0OGUwNzQwYjJlZTAxMzNhZmQiLCJpYXQiOjE2NzIwOTI0ODJ9.8bnlI-QesPf_i06qME_ziPJEo4TuSanrS13USBq4OR8';


  const [productValue, setproductValue] = useState('A');
  const [categoryValue, setCategoryValue] = useState('Juice');
  const [pic, setPic] = React.useState('');
  const setToastMsg = msg =>{
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  }
  
  const [values, setValues] = useState({
    name: "",
    description: "",
    category: "Fruit",
    grade: "A",
    stock: 0,
    price: 0,
    photo: "",
    // origanization: ""
    origanization: "63a3879cd8cb401254c4961d"

    // isPiece: "false",
    // categories: [],
    // loading: false,
    // error: "",
    // createdProduct: "",
    // getaRedirect: false,
    // formData: new FormData()
  });

  const {
    name,
    description,
    price,
    stock,
    // categories,
    grade,
    photo,
    category,
    origanization
    //loading,
    // error,
    // createdProduct,
    //getaRedirect,
    // formData
  } = values;



  const isValid = () => {
    if (
      !name.length > 0 &&
      !description.length > 0 &&
      // !category > 0 &&
      photo === "" &&
      !grade.length > 0 &&
      // !stock.length > 0 &&
      !price.length > 0
    ) {
      Toast.error("All Fields Are Mandatory", {
        position: Toast.POSITION.TOP_RIGHT
      });
      console.log("all fields are mandatory");
      return false;
    } else if (photo === "") {
      Toast.error("Image Required", { position: Toast.POSITION.TOP_RIGHT });
      return false;
    } else if (photo.size > 1000000) {
      Toast.error("image size larger than 1mb", {
        position: Toast.POSITION.TOP_RIGHT
      });
      return false;
    } else if (!photo.name.match(/\.(jpg|png|jpeg)$/)) {
      Toast.error("Invalid Image Format", {
        position: Toast.POSITION.TOP_RIGHT
      });
      return false;
    } else if (!name.length > 0) {
      Toast.error("Name Required", { position: Toast.POSITION.TOP_RIGHT });
      return false;
    } else if (!description.length > 0) {
      Toast.error("description required", {
        position: Toast.POSITION.TOP_RIGHT
      });
      return false;
    } else if (!price > 0) {
      Toast.error("Price Required", { position: Toast.POSITION.TOP_RIGHT });
      return false;
    // } else if (!category > 0) {
    //   Toast.error("Category Required", {
    //     position: Toast.POSITION.TOP_RIGHT
    //   });
    //   return false;
    // } else if (!stock > 0) {
    //   Toast.error("stock required", { position: Toast.POSITION.TOP_RIGHT });
    //   return false;
    } else if (!grade > 0) {
      Toast.error("Grade required", { position: Toast.POSITION.TOP_RIGHT });
      return false;
    }
    return true;
  };
  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  // const handleChange = name => event => {
  //   setValues({...values, error: false, [name]: event.target.value});
  // };

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        console.log("photo response", response)
        console.log("filename",response["assets"][0]["fileName"])
        setPic(response);
        setValues({
          ...values,
          photo: response,
        });
      }
    });
  };

  
  const onSubmit = () => {
    // event.preventDefault();
    // if (isValid()) {
      // setValues({ ...values, error: "", loading: true });
      let formData = new FormData();
      formData.append("name", values.name)
      formData.append("description", values.description)
      formData.append("category", values.category)
      formData.append("grade", values.grade)
      formData.append("stock", values.stock)
      formData.append("price", values.price)
      // formData.append("photo", blob, values["photo"]["assets"][0]["fileName"])
      formData.append('photo', {
        // uri: "file:///...",
        uri: values["photo"]["assets"][0]["uri"],
        type: 'image/jpg',
        // name: 'image.jpg',
        name: values["photo"]["assets"][0]["fileName"]
      });
      formData.append("origanization", values.origanization)

      // fetch(`https://6732-49-205-239-58.in.ngrok.io/api/product/add`, { 
      //   headers : { 
      //     "Accept" : "application/json",
      //     "Content-Type" : "multipart/form-data",
      //   },
      //   method: "POST",
      //   body : formData
      // })
        createaProduct( formData)
        .then(data => {
          console.log(formData);
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            props.onSuccessClose();
            Toast.success("Product Created Successfully", {
              position: Toast.POSITION.TOP_RIGHT
            });
            props.onReload();

            setValues({
              ...values,
              name: "",
              description: "",
              price: "",
              photo: "",
              stock: "",
              // organization: "",
              grade: "",
              loading: false,
              createdProduct: data.data.name
            });
          }
        })
        .catch(err => console.log(err));
    // }
  };


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
        setPic(response.assets[0].base64)
        /// new added
        setValues({
          ...values,
          photo: response,
        });
       }})}

  const removeImage=()=>{
    setPic('')
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
  source={{uri:'data:image/png;base64,' + pic}}
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
  onPress={()=> {
    uploadImage()
    
    }} 
  title="Upload Image"
 />
   <Button 
  mode='contained' 
  color="green"
  containerStyle={{
    borderRadius:5
  }}
  onPress={()=> {
    handleChoosePhoto()
    
    }} 
  title="Upload"
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
        
        <TextInput placeholder="Product Name"
       
        style={styles.inputStyle} 
        onChangeText={value => setValues({...values, error:false, name: value})}
        value={name}/>
      
        <TextInput 
        multiline={true} 
        maxLength={300} 
        placeholder="Product Description" 
        style={styles.inputStyle_description} 
        onChangeText={value => setValues({...values, error:false, description: value})}
        value={description}
        />
        <TextInput placeholder="Price" 
        style={styles.inputStyle_price} 
        onChangeText={value => setValues({...values, error:false, price: value})}
        // description={price}
        value={price}
        />
        <Picker
        style={styles.input}
        selectedValue={productValue}
        onValueChange={currentproductValue => setproductValue(currentproductValue)}
        onChangeText={value => setValues({...values, error:false, grade: value})}
        >
           <Picker.Item label="A" 
           value="A" 
          //  value={"A"}
           />
          <Picker.Item label="B" 
          // value="B" 
          value={"B"}
          />
          <Picker.Item label="C" 
          value="C" 
          // value={"C"}
          />
          {/* <Picker.Item label="STAPLE" value="Staple" /> */}
        </Picker>
        <TextInput placeholder="Stock" 
        style={styles.inputStyle_stock} 
        onChangeText={value => setValues({...values, error:false, stock: value})}
        // description={price}
        value={stock}
        />
        {/* <Picker
        style={styles.category_input}
        selectedValue={categoryValue}
        onValueChange={currentcategoryValue => setCategoryValue(currentcategoryValue)}
        onChangeText={value => setValues({...values, error:false, category: value})}
        >
          <Picker.Item label="Vegetable" value="Vegetable" />
          <Picker.Item label="Fruit" value="Fruit" />
          <Picker.Item label="Juice" value="Juice" />
          <Picker.Item label="Staple" value="Staple" />
        </Picker> */}
        <Button 
       title="CREATE"
       color="primary"
      containerStyle={{
        width:"100%",
        borderRadius:5,
        marginTop:30,

      }}
      //  onPress={() => alert('Product Created Succesfully!')}
      onPress={() => onSubmit()}
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
  },
  inputStyle: {   
    marginTop: 55,
    width: 310,
    height: 60,
    borderWidth:0.7,
    paddingHorizontal: 35,
    borderRadius: 5,
    backgroundColor: '#fff',
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
    height: 60,
    paddingHorizontal: 35,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth:1,
    shadowColor:'black',
    color:'black',
    paddingBottom:1,
  },
  inputStyle_stock: {   
    marginTop: 25,
    width: '50%',
    height: 60,
    paddingHorizontal: 35,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth:1,
    shadowColor:'black',
    color:'black',
    paddingBottom:1,
  },
  inputStyle_description: {   
    marginTop: 22,
    width: 310,
    height: 110,
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
  marginTop:278,
  marginHorizontal:160,
  color:"gray",
  elevation:10,
  shadowColor:"black"
}
,
category_input:{
  width:'50%', position:"absolute",
  marginTop:363,
  marginHorizontal:160,
  color:"gray",
  elevation:10,
  shadowColor:"black"
},
centerContent:{
  justifyContent:"center",
  alignItems:'center',
  marginTop:100,
  // borderRadius:20
}
});

export default AddProducts;
