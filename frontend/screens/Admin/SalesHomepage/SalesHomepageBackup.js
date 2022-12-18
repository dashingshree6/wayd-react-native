import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Icon, Input, Button, Tab, Text, TabView} from '@rneui/themed';

//
import axios from 'axios';

const API = 'https://0c63-49-205-239-58.in.ngrok.io/api/order/all';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzExMjgwMjF9.wif-XB3NuXqAFdZIj6os7Hfb2EU_Rm2_0cDahrsEXKg';

//

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Live Order 1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd94551aa97f63',
    title: 'Live Order 3',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571455e29d72',
    title: 'Live Order 3',
  },
];

const Item = props => (
  <TouchableOpacity
    style={styles.sales_live_button}
    // onPress={onPress}
  >
    <View
    // style={styles.item}
    >
      <Text style={styles.title}>Order Status: {props.order.status}</Text>
      <Text style={styles.title}>
        Payment Status: {props.order.payment_status}
      </Text>
      <Text style={styles.title}>
        No of items: {props.order.products.numberOfItem}
      </Text>
      <Text style={styles.title}>Cost: {props.order.products.cost}</Text>
      <Text style={styles.title}>
        Amount recieved: {props.order.orderReceivedAmount}
      </Text>
      <Text style={styles.title}>
        Amount remaining: {props.order.orderRemainingAmount}
      </Text>
    </View>
  </TouchableOpacity>
);

const SalesHomepage = ({navigation, route}) => {
  const [index, setIndex] = useState(0);

  const renderItem = ({item}) => <Item order={item} />;

  //
  const [data, setData] = useState([]);
  const [liveOrders, setLiveOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveOrdersDisplay, setLiveOrdersDisplay] = useState(true);

  const checklLiveOrder = date => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let todayDateYear = new Date().getFullYear();
    let todayDateMonth = new Date().getMonth();
    let month = months[todayDateMonth];
    let todayDate = new Date().getDate();
    let str = date;
    let strArr = str.split(' ');
    console.log('strArr', strArr);
    console.log('todayDate', todayDate);

    let monthCheck = strArr[0].includes(month);
    console.log('monthCheck', monthCheck);
    let dateCheck = strArr[1].includes(todayDate);
    console.log('dateCheck', dateCheck);
    let yearCheck = strArr[2].includes(todayDateYear);
    console.log('yearCheck', yearCheck);

    if (monthCheck && dateCheck && yearCheck) {
      return true;
    } else {
      return false;
    }

    //   let productDateArr = str.split(' ')
    //   let productYear = productDateArr[2]
    //   console.log(productYear)
    //   console.log(new Date().toDateString().split(' '))
    //   console.log(months[todayDateMonth])
    //   console.log(todayDate)
    //   console.log(todayDateYear)
    //   console.log('Month Check',strArr[0].includes(month))
    //   console.log('Date Check',strArr[1].includes(todayDate))
    //   console.log('Year Check',strArr[2].includes(todayDateYear))
    //   console.log(str[0].includes(''))
  };

  const getAllProducts = () => {
    setLoading(true);
    //  axios.get(API , { headers: {"Authorization" : `Bearer ${TOKEN}`} })
    axios
      .get(API)
      .then(res => {
        console.log(res.data);
        setData(res.data);
        setLiveOrders(
          res.data.filter(i => checklLiveOrder(i.ordered) === true),
        );
        setPastOrders(
          res.data.filter(i => checklLiveOrder(i.ordered) === false),
        );
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <View style={styles.sales_cont}>
      <View style={styles.sales_btn}>
        <Button
          title={'Create Sales Order'}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
        />
      </View>
      <Tab
        value={index}
        onChange={e => {
          setIndex(e);
          setLiveOrdersDisplay(!liveOrdersDisplay);
        }}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary">
        <Tab.Item
          title="Live Orders"
          titleStyle={{fontSize: 12}}
          // icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="Past Orders"
          titleStyle={{fontSize: 12}}
          // icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
        />
      </Tab>

      {/* <TabView value={index} onChange={setIndex} animationType="spring">
                        <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
                          <FlatList
                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                          />
                        </TabView.Item>
                        <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
                          <Text h1>Favorite</Text>
                        </TabView.Item>
                    </TabView> */}
      {liveOrdersDisplay ? (
        <FlatList
          data={liveOrders}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      ) : (
        <FlatList
          data={pastOrders}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sales_cont: {
    padding: 10,
  },
  sales_btn: {
    alignItems: 'center',
  },
  sales_orders_type: {
    display: 'flex',
    flexDirection: 'row',
  },
  sales_past_orders: {
    alignItems: 'flex-end',
  },
  item: {
    backgroundColor: 'silver',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  sales_live_button: {
    // alignItems: "center",
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 2,
  },
});

export default SalesHomepage;
