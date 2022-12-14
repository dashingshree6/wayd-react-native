import { View, 
    Text, 
    StyleSheet,
    FlatList,
    ActivityIndicator,
    ToastAndroid
} from 'react-native'
import React, { useState, useEffect } from 'react';
import { Input, Button, Overlay} from '@rneui/themed';
import { API } from '../../backend';
import { getPincodes, updatePincodes, createPincodes  } from '../../ApiCalls/ApiCalls';
import SyncStorage from 'sync-storage';
import Toast from 'react-native-toast-message'
// const Item = (props) => (
//     <View style={{ flexDirection: 'row' }}>
//        <View style={{ width: '33%',}}>
//            <Text style={{ fontSize: 16, textAlign: 'center'}}>{props.user.username}</Text>
//        </View>
//        <View style={{ width: '33%'}}>
//            <Text style={{ fontSize: 16, textAlign: 'center'}}>Rs.2500</Text>
//        </View>
//    </View>
// );


export default function PriceAddition() {
    const [pins, setPins] = useState([]);
    const [percent_add, setValues] = useState("");
    const [reload, setReload] = useState(false);
    const [id, setId] = useState("");
    const [newPincode, setNewPincode] = useState({
        pincode : "",
        percent_add : ""
      })
    const [visible, setVisible] = useState(false);
    const [] = useState("")


    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const doDisable = val => {
        if (id) {
          if (id !== val) {
            return true;
          }
        }
        return false;
    };

    const getAllPincodes = () => {
        setLoading(true)
        // axios.get(API , { headers: {"Authorization" : `Bearer ${TOKEN}`} })
        getPincodes()
        .then(res => {
        console.log(res.data);
        setPins(res.data)
        setLoading(false)
        }).catch((error) => {
        console.log(error)
        setLoading(false)
        });
    }

      // Create new pincode
  const createNewPincode = (data) => {
    setReload(false);
    if( data.pincode !== "" && data.percent_add !== "") {
      createPincodes(data)
      .then(res => {
        Toast.show({
            type: 'success',
            text1: "Pincode created Successfully"
          });
        // toast.success("Pincode created Successfully", {
        //   position: toast.POSITION.TOP_RIGHT
        // });
        // getAllPincodes()
        setReload(true);
        setNewPincode({
          pincode : "",
          percent_add : ""
        });
      })
      .catch(err =>
        Toast.show({
            type: 'error',
            text1: err
          })
        // toast.error(err.response.data.error, {
        //   position: toast.POSITION.TOP_RIGHT
        // })
        // console.log(err)
      );
    } else {
    //   toast.error("Please provide Pincode / Percent", {
    //     position: toast.POSITION.TOP_RIGHT
    //   });
      Toast.show({
        type: 'error',
        text1: "Please provide Pincode / Percent"
      })
    }
     
  };

  // Update Pincode
  const onSubmit = () => {
    if(percent_add >= 1 && percent_add <= 100) { // new added

      updatePincodes(percent_add, id)
        .then(res => {
            Toast.show({
                type: 'success',
                text1: "Updated Successfully"
              });
        //   toast.success("Updated Successfully", {
        //     position: toast.POSITION.TOP_RIGHT
        //   });
          getAllPincodes()
          setReload(true);
          
          setId("") // new added
        })
        .catch(err =>
            Toast.show({
                type: 'error',
                text1: err
              })
        //   toast.success(err.response.data.error, {
        //     position: toast.POSITION.TOP_RIGHT
        //   })
        //   console.log(err)
        );
  
      } else { // new added
        Toast.show({
            type: 'error',
            text1: "Please provide value between 1 to 100"
          })
        // toast.error("Please provide value between 1 to 100", 
        // { position: toast.POSITION.TOP_RIGHT });
      }
  };

    useEffect(()=>{
        getAllPincodes()
        console.log(SyncStorage.get("jwt")) 
    },[reload])

  return (
    <View style={styles.price_add_view}>
        {/* <Toast ref={(ref)=>{Toast.setRef(ref)}} /> */}
        <Toast 
        position='top'
        />
      <Text style={styles.price_add_header}>Price Addition </Text>
                    <View style={styles.price_add_table_header1}>
                        <View style={{ width: '50%'}}>
                                <Input
                                placeholder="Pincode"
                                value={newPincode.pincode}
                                onChangeText={(value) => {
                                    let pinValue = value;
                                    let pinsArr = pins && pins.filter(pin => pin.pincode === pinValue)
                                    if (pinsArr.length === 0) {
                                      setNewPincode({...newPincode, pincode: pinValue})
                                    } else {
                                    //   toast.error("Pincode already exists", {
                                    //     position: toast.POSITION.TOP_RIGHT
                                    //   });
                                    Toast.show({
                                        type: 'error',
                                        text1: "Pincode already exists"
                                      })
                                    setNewPincode({...newPincode, percent_add: ""})
                              
                                    }
                                }}
                                />      
                        </View>
                        <View style={{ width: '50%'}}>
                                <Input
                                placeholder="Percent"
                                value={newPincode.percent_add}
                                onChangeText={(value) => {
                                    let percentValue = value;
                                    if( percentValue >= 1 && percentValue <= 100) { // new added
                                        setNewPincode({...newPincode, percent_add: percentValue})
                                    } else {
                                        // toast.error("Please provide value between 1 to 100", 
                                        // { position: toast.POSITION.TOP_RIGHT });
                                        Toast.show({
                                            type: 'error',
                                            text1: "Please provide value between 1 to 100"
                                          })
                                        setNewPincode({...newPincode, percent_add: ""})
                                    }
                                }}
                                />      
                        </View>
                    </View>
                            <Button
                            title={'Create New Pincode'}
                            containerStyle={{
                                width: 200,
                                marginHorizontal: 20,
                                marginBottom: 10
                            }}
                            onPress={() => createNewPincode(newPincode)}
                            />  
                    <View style={styles.price_add_table_header}>
                        <View style={{ width: '50%'}}>
                            <Text style={styles.price_add_table_header_cell}>Pincode</Text>
                        </View>
                        <View style={{ width: '20%'}}>
                            <Text style={styles.price_add_table_header_cell}>% Addition</Text>
                        </View>
                    </View>
                    <Button
                            title={'Save'}
                            containerStyle={{
                                width: '100%',
                                justifyContent:'center'
                            }}
                            disabled={id ? false : true}
                            onPress={() => onSubmit()}
                        />  
                   {
                        loading ?
                        <ActivityIndicator size="large" />
                        :
                        <FlatList
                        data={pins}
                        // renderItem={renderItem}
                        keyExtractor={item => item._id}
                        renderItem={({item}) => (
                        <View style={styles.price_add_table_header}>
                            <View style={{ width: '50%'}}>
                                <Text style={styles.price_add_table_header_cell}>{item.pincode}</Text>
                            </View>
                            <View style={{ width: '20%'}}>
                                <Input
                                // placeholder="Pincode"
                                disabled={doDisable(item._id)}
                                defaultValue={`${item.percent_add}`}
                                // leftIcon={{ type: 'font-awesome', name: 'comment' }}
                                onChangeText={value =>{ 
                                    setValues(value)
                                    setId(item._id)
                                }}
                                />                            
                            </View>
                        </View>
                        )}
                        />
                    }
    </View>
  )
}

const styles = StyleSheet.create({
    price_add_view: {
        flex: 1
    },
    price_add_header:{
        fontSize: 25,
        fontWeight:'bold',
        textAlign:'center'
    },
    price_add_table_header:{
        flexDirection:"row",
        borderBottomColor:'black',
        borderBottomWidth: 1,
        // borderTopColor:'black',
        // borderTopWidth: 1,
        margin: 6,
        paddingTop: 5,
        paddingBottom: 5
    },
    price_add_table_header1:{
        flexDirection:"row",
        margin: 6
    },
    price_add_table_header_cell: {
        fontWeight:'bold',
        marginBottom: 5,
        fontSize: 16,
        textAlign: 'center',
    },
})