import React from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import {Input, Icon} from '@rneui/themed';
const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
const CreateOrder = () => {
  return (
    <ScrollView>
      <View style={styles.fieldSet}>
        <Text style={styles.legend}>Vender</Text>
        <SelectDropdown
          buttonStyle={styles.select}
          buttonTextStyle={styles.ButtonText}
          defaultButtonText={'Select Vendor'}
          data={countries}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
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
      </View>
      <View style={styles.fieldSet}>
        <Text style={styles.legend}>Select Product</Text>
        <SelectDropdown
          buttonStyle={styles.select}
          buttonTextStyle={styles.ButtonText}
          defaultButtonText={'Select Product'}
          data={countries}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
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
      </View>
      <View style={styles.fieldSet}>
        <Text style={styles.legend}>Select Quantity </Text>
        <TextInput
          underlineColorAndroid="transparent"
          style={{paddingLeft: 15, fontSize: 20, textAlign: 'left'}}
          keyboardType="numeric"
          //     placeholder="Quantity"
        />
      </View>
      <View style={styles.fieldSet}>
        <Text style={styles.legend}>Grade</Text>
        <SelectDropdown
          buttonStyle={styles.select}
          buttonTextStyle={styles.ButtonText}
          defaultButtonText={'Select Grade'}
          data={countries}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
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
      </View>
      <Button
        styles={styles.btnAddToCartStyle}
        title="Add To Cart"
        onPress={() => Alert.alert('Right button pressed')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  select: {
    width: '100%',
    height: 50,
    marginTop: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    marginHorizontal: 5,
  },
  ButtonText: {
    color: '#444',
    textAlign: 'left',
  },
  fieldSet: {
    margin: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#000',
  },
  legend: {
    position: 'absolute',
    top: -10,
    left: 10,
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF',
  },
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  rowStyle: {
    backgroundColor: '#EFEFEF',
    width: '90%',
    borderBottomColor: '#C5C5C5',
  },
  rowTextStyle: {color: '#444', textAlign: 'left'},
  btnAddToCartStyle: {
    width: '80%',
  },
});

export default CreateOrder;
