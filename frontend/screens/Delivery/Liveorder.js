import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Liveorder = () => {
  return (
    <View>
      {/* live orders  */}
      <View style={styles.container}>
        <Text style={styles.size}>Live Order</Text>
        <Text style={styles.size}>Past Order</Text>
      </View>

      {/* order details  */}
      {/* <View style={styles.container}>
        <Text style={(styles.boxlayout, styles.size)}>Live Order 1</Text>
      </View> */}
      <View style={[styles.card, styles.shadowProp]}>
        <View>
          <Text style={styles.heading}>Live Order 1</Text>
        </View>
        <Ionicons
          style={{
            textAlign: 'right',
            fontSize: 24,
          }}
          name="md-arrow-redo-circle"
          type="Ionicons"
        />
      </View>
      <View style={[styles.card, styles.shadowProp]}>
        <View>
          <Text style={styles.heading}>Live Order 1</Text>
        </View>
        <Ionicons
          style={{
            textAlign: 'right',
            fontSize: 24,
          }}
          name="md-arrow-redo-circle"
          type="Ionicons"
        />
      </View>
      <View style={[styles.card, styles.shadowProp]}>
        <View>
          <Text style={styles.heading}>Live Order 1</Text>
        </View>
        <Ionicons
          style={{
            textAlign: 'right',
            fontSize: 24,
          }}
          name="md-arrow-redo-circle"
          type="Ionicons"
        />
      </View>
      <View style={[styles.card, styles.shadowProp]}>
        <View>
          <Text style={styles.heading}>Live Order 1</Text>
        </View>
        <Ionicons
          style={{
            textAlign: 'right',
            fontSize: 24,
          }}
          name="md-arrow-redo-circle"
          type="Ionicons"
        />
      </View>
      <View style={[styles.card, styles.shadowProp]}>
        <View>
          <Text style={styles.heading}>Live Order 1</Text>
        </View>
        <Ionicons
          style={{
            textAlign: 'right',
            fontSize: 24,
          }}
          name="md-arrow-redo-circle"
          type="Ionicons"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    marginTop: 20,
    fontSize: '24px',
  },
  size: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
    color: 'black',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginHorizontal: 10,
    width: '95%',
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default Liveorder;
