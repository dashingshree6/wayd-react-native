import { 
  View, 
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,  
  Pressable
} from 'react-native'
import React, { useState } from 'react'
import { 
  Image, 
  Input,
  Modal,

} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Potato',
    grade: 'A',
    rate: 'Rs.45',
    photo: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTUNYRJGfr6dAmrrvtz8mF5qV0ojVV9cuEFzswwOcfqxd4EDeDD05eO-KSs2uLidN92YVgeCdcpdthCF4E"
  
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Potato',
    grade: 'A',
    rate: 'Rs.45',
    photo: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTUNYRJGfr6dAmrrvtz8mF5qV0ojVV9cuEFzswwOcfqxd4EDeDD05eO-KSs2uLidN92YVgeCdcpdthCF4E"
  
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Potato',
    grade: 'A',
    rate: 'Rs.45',
    photo: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTUNYRJGfr6dAmrrvtz8mF5qV0ojVV9cuEFzswwOcfqxd4EDeDD05eO-KSs2uLidN92YVgeCdcpdthCF4E"
  
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Potato',
    grade: 'A',
    rate: 'Rs.45',
    photo: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTUNYRJGfr6dAmrrvtz8mF5qV0ojVV9cuEFzswwOcfqxd4EDeDD05eO-KSs2uLidN92YVgeCdcpdthCF4E"
  
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571443443e29d72',
    title: 'Potato',
    grade: 'A',
    rate: 'Rs.45',
    photo: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTUNYRJGfr6dAmrrvtz8mF5qV0ojVV9cuEFzswwOcfqxd4EDeDD05eO-KSs2uLidN92YVgeCdcpdthCF4E"
  
  },
  {
    id: '58694a0f-3da1-471f-bd96-14557654461e29d72',
    title: 'Potato',
    grade: 'A',
    rate: 'Rs.45',
    photo: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTUNYRJGfr6dAmrrvtz8mF5qV0ojVV9cuEFzswwOcfqxd4EDeDD05eO-KSs2uLidN92YVgeCdcpdthCF4E"
  
  },
];

const Item = ({ title, grade, rate, photo }) => (
  <View style={styles.container}>
       <Image
            source={{ uri: photo }}
            containerStyle={styles.item}
            PlaceholderContent={<ActivityIndicator />}
          />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>Grade :{grade}</Text>
        <Text style={styles.title}>Rate :{rate}</Text>
  </View>
);

export default function VendorHomepage() {
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }) => (
    <Item 
    title={item.title} 
    grade={item.grade} 
    rate={item.rate} 
    photo={item.photo} 
    />
  );

  return (
    <View>
       <Input
          placeholder='Search'
          leftIcon={
            <AntDesign
              name='search1'
              size={24}
              color='gray'
            />
          }
        />
      <FlatList
        style={styles.list}
        numColumns={2}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
        {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setModalVisible(!modalVisible);
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 2,
    margin: 6
  },
  list: {
    width: '100%',
  },
  item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
  });