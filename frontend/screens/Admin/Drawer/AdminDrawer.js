import React, {useEffect, useState, useContext} from 'react';
import {Text, View} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import SyncStorage from 'sync-storage';
import {signout, isAuhenticated} from '../../Login/index';
import {AuthContext} from '../../../App';
import Ionicons from 'react-native-vector-icons/Ionicons';

const API =
  'https://e56d-49-205-239-58.in.ngrok.io/api/user/636a56f35c526e4144ad5773';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzA4NzQzODN9.p2pTjEY0jEMGK7qhJYDTRrpqS5mAQgv5Weo-QPRNi_4';

export default function AdminDrawer(props) {
  const {signOutContext} = useContext(AuthContext);

  const [data, setData] = useState({});

  const getUser = () => {
    axios
      .get(API, {headers: {Authorization: `Bearer ${TOKEN}`}})
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  //call useeffect outside function****
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <View
        style={{
          padding: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: 'grey',
          }}>
          Hey
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: 'black',
          }}>
          {SyncStorage.get('userName')}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: 'grey',
          }}>
          Have a nice day !!
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#f2f2f2',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 2,
        }}>
        <Ionicons name="mail" color={'green'} size={25} />
        <Text
          style={{
            fontWeight: 'bold',
            color: 'green',
            justifyContent: 'space-between',
            marginLeft: 15,
          }}>
          {SyncStorage.get('userEmsil')}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#f2f2f2',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 2,
        }}>
        <Ionicons name="call" color={'green'} size={25} />
        <Text
          style={{
            fontWeight: 'bold',
            color: 'green',
            justifyContent: 'space-between',
            marginLeft: 15,
          }}>
          {SyncStorage.get('userPhone')}
        </Text>
      </View>

      <DrawerItem
        label="Create User"
        onPress={() => props.navigation.navigate('Signup')}
        labelStyle={{
          fontSize: 15,
          color: 'black',
        }}
        icon={() => (
          // <AntDesign
          // name='right'
          // size={15}
          // style={{
          //   position: "absolute",
          //   right: 10,
          // }}
          // />
          <Ionicons
            name="person-add-sharp"
            color={'green'}
            size={25}
            style={{
              position: 'absolute',
              left: 0,
            }}
          />
        )}
      />

      <View
        style={{
          backgroundColor: '#f2f2f2',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 2,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'green',
            justifyContent: 'space-between',
            marginLeft: 15,
            textAlign: 'center',
          }}>
          ORDER
        </Text>
      </View>

      <DrawerItem
        label="Sales Order"
        onPress={() => props.navigation.navigate('SalesHomepage')}
        labelStyle={{
          fontSize: 15,
          color: 'black',
        }}
        icon={() => (
          // <AntDesign
          // name='right'
          // size={15}
          // style={{
          //   position: "absolute",
          //   right: 10,
          // }}
          // />
          <Ionicons
            name="menu"
            color={'green'}
            size={25}
            style={{
              position: 'absolute',
              left: 0,
            }}
          />
        )}
      />
      <DrawerItem
        label="Create Sales Order"
        onPress={() => props.navigation.navigate('SalesVendorForm')}
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
        label="Procurement Order"
        onPress={() => props.navigation.navigate('ProcurementHomepage')}
        labelStyle={{
          fontSize: 15,
          color: 'black',
        }}
        icon={() => (
          // <AntDesign
          // name='right'
          // size={15}
          // style={{
          //   position: "absolute",
          //   right: 10,
          // }}
          // />
          <Ionicons
            name="nuclear"
            color={'green'}
            size={25}
            style={{
              position: 'absolute',
              left: 0,
            }}
          />
        )}
      />

      <View
        style={{
          backgroundColor: '#f2f2f2',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 2,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'green',
            justifyContent: 'space-between',
            marginLeft: 15,
            textAlign: 'center',
          }}>
          PEOPLES
        </Text>
      </View>

      <DrawerItem
        label="Customers"
        onPress={() => props.navigation.navigate('Customers', {role: 0})}
        labelStyle={{
          fontSize: 15,
          color: 'black',
        }}
        icon={() => (
          // <AntDesign
          // name='right'
          // size={15}
          // style={{
          //   position: "absolute",
          //   right: 10,
          // }}
          // />
          <Ionicons
            name="person-circle-outline"
            color={'green'}
            size={25}
            style={{
              position: 'absolute',
              left: 0,
            }}
          />
        )}
      />
      <DrawerItem
        label="Suppliers"
        onPress={() => props.navigation.navigate('Suppliers', {role: 1})}
        labelStyle={{
          fontSize: 15,
          color: 'black',
        }}
        icon={() => (
          // <AntDesign
          // name='right'
          // size={15}
          // style={{
          //   position: "absolute",
          //   right: 10,
          // }}
          // />
          <Ionicons
            name="person-circle-sharp"
            color={'green'}
            size={25}
            style={{
              position: 'absolute',
              left: 0,
            }}
          />
        )}
      />
      <DrawerItem
        label="Delivery"
        onPress={() => props.navigation.navigate('Delivery', {role: 2})}
        labelStyle={{
          fontSize: 15,
          color: 'black',
        }}
        icon={() => (
          // <AntDesign
          // name='right'
          // size={15}
          // style={{
          //   position: "absolute",
          //   right: 10,
          // }}
          // />
          <Ionicons
            name="person-outline"
            color={'green'}
            size={25}
            style={{
              position: 'absolute',
              left: 0,
            }}
          />
        )}
      />

      <DrawerItem
        label="Category"
        onPress={() => props.navigation.navigate('Category')}
        labelStyle={{
          fontSize: 15,
          color: 'black',
        }}
        icon={() => (
          // <AntDesign
          // name='right'
          // size={15}
          // style={{
          //   position: "absolute",
          //   right: 10,
          // }}
          // />
          <Ionicons
            name="grid"
            color={'green'}
            size={25}
            style={{
              position: 'absolute',
              left: 0,
            }}
          />
        )}
      />

      <DrawerItem
        label="PriceAddition"
        onPress={() => props.navigation.navigate('PriceAddition')}
        labelStyle={{
          fontSize: 15,
          color: 'black',
        }}
        icon={() => (
          // <AntDesign
          // name='right'
          // size={15}
          // style={{
          //   position: "absolute",
          //   right: 10,
          // }}
          // />
          <Ionicons
            name="cash"
            color={'green'}
            size={25}
            style={{
              position: 'absolute',
              left: 0,
            }}
          />
        )}
      />

      <DrawerItem
        label="Stock"
        onPress={() => props.navigation.navigate('Stock')}
        labelStyle={{
          fontSize: 15,
          color: 'black',
        }}
        icon={() => (
          // <AntDesign
          // name='right'
          // size={15}
          // style={{
          //   position: "absolute",
          //   right: 10,
          // }}
          // />
          <Ionicons
            name="md-film"
            color={'green'}
            size={25}
            style={{
              position: 'absolute',
              left: 0,
            }}
          />
        )}
      />

      <DrawerItem
        label="Coupons"
        onPress={() => props.navigation.navigate('AddCoupon')}
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

      {SyncStorage.get('jwt') && (
        <DrawerItem
          label="Logout"
          onPress={() => {
            props.navigation.closeDrawer();
            signOutContext();
            signout();
          }}
          labelStyle={{
            fontSize: 15,
            color: 'black',
          }}
          icon={() => (
            // <AntDesign
            // name='right'
            // size={15}
            // style={{
            //   position: "absolute",
            //   right: 10,
            // }}
            // />
            <Ionicons
              name="log-out"
              color={'green'}
              size={25}
              style={{
                position: 'absolute',
                left: 0,
              }}
            />
          )}
        />
      )}
    </>
  );
}
