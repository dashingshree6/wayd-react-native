import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import SyncStorage from 'sync-storage';
import {signout, isAuhenticated} from '../../Login/index';
import {API} from '../../backend';

export default function DeliveryDrawer(props) {
  const [data, setData] = React.useState({});

  const [syncStorageState, setSyncStorageState] = useState({
    token: '',
    user: {
      _id: '',
      username: '',
      phone_number: 3490579639,
      location: '',
      email: '',
      role: 2,
    },
  });

  useEffect(() => {
    const userDetail = SyncStorage.get('userDetail');
    setSyncStorageState(userDetail);
    const url = `${API}/user/${syncStorageState.user._id}`;
    axios
      .get(url, {headers: {Authorization: `Bearer ${syncStorageState.token}`}})
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 5,
        }}>
        User Details x
      </Text>
      <View
        style={{
          backgroundColor: 'silver',
          padding: 20,
          margin: 10,
        }}>
        <Text style={{marginLeft: 15}}>Id:{syncStorageState.user._id}</Text>
        <Text style={{marginLeft: 15}}>
          Name :{syncStorageState.user.username}
        </Text>
        <Text style={{marginLeft: 15}}>
          Phone Number : {syncStorageState.user.phone_number}
        </Text>
        <Text style={{marginLeft: 15}}>
          Email :{syncStorageState.user.email}
        </Text>
      </View>

      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('DeliveryHomepage')}
        icon={() => (
          <AntDesign
            name="right"
            size={15}
            style={{
              position: 'absolute',
              right: 10,
            }}
          />
        )}
      />

      <DrawerItem
        label="Logout"
        onPress={() => props.navigation.navigate('Login')}
        icon={() => (
          <AntDesign
            name="right"
            size={15}
            style={{
              position: 'absolute',
              right: 10,
            }}
          />
        )}
      />
    </>
  );
}
