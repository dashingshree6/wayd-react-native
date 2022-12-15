// import React from 'react';
// import {View, Text, Image, StyleSheet} from 'react-native';
// import {Button, Card} from '@rneui/themed';
// const image = {
//   uri: 'https://cdn1.iconfinder.com/data/icons/minicons-4/64/box_split_cross-512.png',
// };

// const CashCollection = () => {
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json','Accept': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA3ZjRmM2VmOTRjMTAwMjQ4ODI1N2QiLCJpYXQiOjE2NzEwNzE3Mzd9.JHsh5BapP604aRq4ymwryyX53v3-iwaaW89-3mRo0G8'},
//     data: JSON.stringify({ 
//       status: true,
//       code: "dark knight 123",
//       order_limit: 1,
//       discount: 18,
//       description: "rate"
//     })
//   };
  
//   fetch('https://474b-49-205-239-58.in.ngrok.io/api/discount', requestOptions)
//   .then((response) => response.json())
//   .then((json) => {
//     console.log('Fetch API Response', json.data);
//   })
//   .catch((error) => {
//   console.error(error);
//   });
  
  
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
}
  
//    }
  
//   return (
//     <>
//       <Text
//         style={{
//           fontSize: 20,
//           textAlign: 'center',

//           fontWeight: 'bold',
//         }}>
//         Cash Collection
//       </Text>
//       <View style={styles.container}>
//         <View style={({position: 'relative'}, styles.card)}>
//           {/* <Card.Divider /> */}
//           <Image
//             style={{width: '100%', height: 100}}
//             resizeMode="contain"
//             source={{
//               uri: 'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4',
//             }}
//           />
//           <Text style={styles.content}>Name:</Text>
//           <Text style={styles.content}>Category:</Text>
//           <Text style={styles.content}>Due Amount :</Text>
//           <Button title="Update Amount" />
//         </View>
//         <View style={({position: 'relative'}, styles.card)}>
//           <Image
//             style={{width: '100%', height: 100}}
//             resizeMode="contain"
//             source={{
//               uri: 'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4',
//             }}
//           />
//           <Text style={styles.content}>Name:</Text>
//           <Text style={styles.content}>Category:</Text>
//           <Text style={styles.content}>Due Amount :</Text>
//           <Button title="Update Amount" />
//         </View>
//       </View>
//       <View style={styles.container}>
//         <View style={({position: 'relative'}, styles.card)}>
//           {/* <Card.Divider /> */}
//           <Image
//             style={{width: '100%', height: 100}}
//             resizeMode="contain"
//             source={{
//               uri: 'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4',
//             }}
//           />
//           <Text style={styles.content}>Name:</Text>
//           <Text style={styles.content}>Category:</Text>
//           <Text style={styles.content}>Due Amount :</Text>
//           <Button title="Update Amount" />
//         </View>
//         <View style={({position: 'relative'}, styles.card)}>
//           <Image
//             style={{width: '100%', height: 100}}
//             resizeMode="contain"
//             source={{
//               uri: 'https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4',
//             }}
//           />
//           <Text style={styles.content}>Name:</Text>
//           <Text style={styles.content}>Category:</Text>
//           <Text style={styles.content}>Due Amount :</Text>
//           <Button title="Update Amount" />
//         </View>
//       </View>
//     </>
//   );


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     marginTop: 10,
//   },
//   card: {
//     margin: 10,
//     borderWidth: 2,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   content: {
//     textAlign: 'left',
//     marginVertical: 3,
//     padding: 3,
//   },
// });

// export default CashCollection;
