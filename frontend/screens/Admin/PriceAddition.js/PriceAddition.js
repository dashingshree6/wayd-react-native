import { View, 
    Text, 
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native'
import React, { useState, useEffect } from 'react';
import { Input, Button} from '@rneui/themed';

const Item = (props) => (
    <View style={{ flexDirection: 'row' }}>
       <View style={{ width: '33%',}}>
           <Text style={{ fontSize: 16, textAlign: 'center'}}>{props.user.username}</Text>
       </View>
       <View style={{ width: '33%'}}>
           <Text style={{ fontSize: 16, textAlign: 'center'}}>Rs.2500</Text>
       </View>
   </View>
);


export default function PriceAddition() {
    const [pins, setPins] = useState([]);
    const [percent_add, setValues] = useState("");
    const [reload, setReload] = useState(false);
    const [id, setId] = useState("");
    const [newPincode, setNewPincode] = useState({
        pincode : "",
        percent_add : ""
      })

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

  return (
    <View>
      <Text style={styles.price_add_header}>Price Addition </Text>
                    <View style={styles.price_add_table_header1}>
                        <View style={{ width: '50%'}}>
                                <Input
                                placeholder="Pincode"
                                onChangeText={value => this.setState({ comment: value })}
                                />      
                        </View>
                        <View style={{ width: '50%'}}>
                                <Input
                                placeholder="Percent"
                                onChangeText={value => this.setState({ comment: value })}
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
                            />  
                    <View style={styles.price_add_table_header}>
                        <View style={{ width: '50%'}}>
                            <Text style={styles.price_add_table_header_cell}>Pincode</Text>
                        </View>
                        <View style={{ width: '50%'}}>
                            <Text style={styles.price_add_table_header_cell}>% Addition</Text>
                        </View>
                    </View>
                   {
                        loading ?
                        <ActivityIndicator size="large" />
                        :
                        <FlatList
                        data={data}
                        // renderItem={renderItem}
                        keyExtractor={item => item._id}
                        renderItem={({item}) => (
                        <View style={styles.price_add_table_header}>
                            <View style={{ width: '50%'}}>
                                <Text style={styles.price_add_table_header_cell}>Pincode</Text>
                            </View>
                            <View style={{ width: '50%'}}>
                                <Input
                                placeholder="Comment"
                                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                                onChangeText={value => this.setState({ comment: value })}
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
    price_add_header:{
        fontSize: 25,
        fontWeight:'bold',
        textAlign:'center'
    },
    price_add_table_header:{
        flexDirection:"row",
        borderBottomColor:'black',
        borderBottomWidth: 1,
        borderTopColor:'black',
        borderTopWidth: 1,
        margin: 6,
        paddingTop: 10,
        paddingBottom: 10
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