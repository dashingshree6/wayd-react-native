import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button, Card} from '@rneui/themed';
const image = {
  uri: 'https://cdn1.iconfinder.com/data/icons/minicons-4/64/box_split_cross-512.png',
};

const CashCollection = () => {
  return (
    <>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'center',

          fontWeight: 'bold',
        }}>
        Cash Collection
      </Text>
      <View style={styles.container}>
        <View style={({position: 'relative'}, styles.card)}>
          {/* <Card.Divider /> */}
          <Image
            style={{width: '100%', height: 100}}
            resizeMode="contain"
            source={{
              uri: 'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4',
            }}
          />
          <Text style={styles.content}>Name:</Text>
          <Text style={styles.content}>Category:</Text>
          <Text style={styles.content}>Due Amount :</Text>
          <Button title="Update Amount" />
        </View>
        <View style={({position: 'relative'}, styles.card)}>
          <Image
            style={{width: '100%', height: 100}}
            resizeMode="contain"
            source={{
              uri: 'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4',
            }}
          />
          <Text style={styles.content}>Name:</Text>
          <Text style={styles.content}>Category:</Text>
          <Text style={styles.content}>Due Amount :</Text>
          <Button title="Update Amount" />
        </View>
      </View>
      <View style={styles.container}>
        <View style={({position: 'relative'}, styles.card)}>
          {/* <Card.Divider /> */}
          <Image
            style={{width: '100%', height: 100}}
            resizeMode="contain"
            source={{
              uri: 'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4',
            }}
          />
          <Text style={styles.content}>Name:</Text>
          <Text style={styles.content}>Category:</Text>
          <Text style={styles.content}>Due Amount :</Text>
          <Button title="Update Amount" />
        </View>
        <View style={({position: 'relative'}, styles.card)}>
          <Image
            style={{width: '100%', height: 100}}
            resizeMode="contain"
            source={{
              uri: 'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4',
            }}
          />
          <Text style={styles.content}>Name:</Text>
          <Text style={styles.content}>Category:</Text>
          <Text style={styles.content}>Due Amount :</Text>
          <Button title="Update Amount" />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  card: {
    margin: 10,
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  content: {
    textAlign: 'left',
    marginVertical: 3,
    padding: 3,
  },
});

export default CashCollection;
