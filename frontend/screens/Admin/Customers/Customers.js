import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import { Input, Button} from '@rneui/themed';
// import { Cell, Section, TableView } from 'react-native-tableview-simple';

const Customers = ({ navigation, route  }) => {
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
                        <Text style={styles.customers_table_header_cell}>Name</Text>
                        <Text style={styles.customers_table_header_cell}>Due</Text>
                        <Text style={styles.customers_table_header_cell}>CC</Text>
                    </View>
                    <View style={styles.customers_table_row}>
                        <Text>Pallavi</Text>
                        <Text>Rs.2500</Text>
                        <Text>15 days</Text>
                    </View>
                    <View style={styles.customers_table_row}>
                        <Text>Pallavi</Text>
                        <Text>Rs.2500</Text>
                        <Text>15 days</Text>
                    </View>
                    <View style={styles.customers_table_row}>
                        <Text>Pallavi</Text>
                        <Text>Rs.2500</Text>
                        <Text>15 days</Text>
                    </View>
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
        display:"flex",
        flexDirection:"row",
        justifyContent:'space-around',
        borderBottomColor:'black',
        borderBottomWidth: 1,
        margin: 6
    },
    customers_table_header_cell: {
        fontWeight:'bold',
        marginBottom: 5
    },
    customers_table_row:{
        display:"flex",
        flexDirection:"row",
        justifyContent:'space-around'
    }
});

export default Customers;