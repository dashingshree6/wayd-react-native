import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { Button, } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';

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


export default function OrderStatus() {
    const [value, setValue] = useState(null);

  return (
    <View style={styles.order_status_view}>
        <ScrollView>
                <Text style={styles.order_status_header}>Order ID : 57430FUDF9080</Text>
                <View style={styles.order_status_btn_grp}>
                        <Button
                        title={'Download'}
                        containerStyle={{
                            width: '40%',
                            // marginHorizontal: 50,
                            // marginVertical: 10,
                        }}
                        />
                </View>
                <View style={styles.order_status_modal}>
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
                        placeholder="Order Status"
                        searchPlaceholder="Search..."
                        value={value}
                        onChange={item => {
                        setValue(item.value);
                        }}
                        // renderLeftIcon={() => (
                        // <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                        // )}
                    />
                </View>

                    <View style={styles.order_status_table_header}>
                        <View style={{ width: '10%'}}>
                            <Text style={styles.order_status_header_cell}>#</Text>
                        </View>
                        <View style={{ width: '30%'}}>
                            <Text style={styles.order_status_header_cell}>Count</Text>
                        </View>
                        <View style={{ width: '30%'}}>
                            <Text style={styles.order_status_header_cell}>Name</Text>
                        </View>
                        <View style={{ width: '30%'}}>
                            <Text style={styles.order_status_header_cell}>Amount</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '10%',}}>
                            <Text style={{ fontSize: 16, textAlign: 'center'}}>1</Text>
                        </View>
                        <View style={{ width: '30%'}}>
                            <Text style={{ fontSize: 16, textAlign: 'center'}}>10</Text>
                        </View>
                        <View style={{ width: '30%'}}>
                            <Text style={{ fontSize: 16, textAlign: 'center'}}>Mango</Text>
                        </View>
                        <View style={{ width: '30%'}}>
                            <Text style={{ fontSize: 16, textAlign: 'center'}}>Rs.1000</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '10%',}}>
                            <Text style={{ fontSize: 16, textAlign: 'center'}}>2</Text>
                        </View>
                        <View style={{ width: '30%'}}>
                            <Text style={{ fontSize: 16, textAlign: 'center'}}>10</Text>
                        </View>
                        <View style={{ width: '30%'}}>
                            <Text style={{ fontSize: 16, textAlign: 'center'}}>Mango</Text>
                        </View>
                        <View style={{ width: '30%'}}>
                            <Text style={{ fontSize: 16, textAlign: 'center'}}>Rs.1000</Text>
                        </View>
                    </View>

                    <View style={styles.order_status_amount}>
                        <Text>Total: Rs.1500</Text>
                    </View>

                    <Text style={styles.order_status_header}>Order Details :</Text>

                    <Text style={styles.order_status_details}>Name: Hotels</Text>

                    <Text style={styles.order_status_details}>Shop Name: Hotel Marriott</Text>

                    <Text style={styles.order_status_details}>Phone Number : 654676575</Text>

                    <Text style={styles.order_status_details}>Address : Madapur</Text>

                    <Text style={styles.order_status_details}>Date Ordered : 09/12/22</Text>

                    <Text style={styles.order_status_details}>Due Amount : Rs.1233</Text>


        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    order_status_view:{
        padding: 20
    },
    order_status_header: {
        fontSize: 20,
        fontWeight:'bold',
        textAlign:'center',
        margin: 5
    },
    order_status_btn_grp: {
        flexDirection:'row',
        justifyContent:'space-evenly',
        padding: 10
    },
    order_status_table_header:{
        flexDirection:"row",
        borderBottomColor:'black',
        borderBottomWidth: 1,
        margin: 6
    },
    order_status_header_cell: {
        fontWeight:'bold',
        marginBottom: 5,
        fontSize: 16,
        textAlign: 'center',
    },
    order_status_amount:{
        alignItems:'flex-end',
        padding: 10,
        borderTopColor:'black',
        borderTopWidth: 1,
        margin: 10,
        borderBottomColor:'black',
        borderBottomWidth: 1,
    },
    order_status_modal: {
        borderColor:'gray',
        borderWidth: 1,
        padding: 5,
        margin: 5
    },
    order_status_details: {
        fontSize: 15,
        fontWeight:'bold',
        textAlign:'left',
        margin: 5
    },

    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
      },
      icon: {
        marginRight: 5,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
})