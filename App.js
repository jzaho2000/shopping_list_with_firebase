import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as firebase from 'firebase';
//import useFloatingBottomTabBarHeight from '@react-navigation/bottom-tabs/lib/typescript/src/utils/useBottomTabBarHeight';

  // Estetään turha 

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB1R3dXbsjVZbC5ikMqsB9Y3R4qxjD3XUw",
    authDomain: "shoppinglisttest-37cc9.firebaseapp.com",
    databaseURL: "https://shoppinglisttest-37cc9-default-rtdb.firebaseio.com",
    projectId: "shoppinglisttest-37cc9",
    storageBucket: "shoppinglisttest-37cc9.appspot.com",
    messagingSenderId: "471619329879",
    appId: "1:471619329879:web:8bf180c7606b98d811a812",
    measurementId: "G-HHNGWSVWQP"
  };

  
  if (!firebase.apps.length) {
    console.log("Käynnistä Firebase");
    firebase.initializeApp(firebaseConfig);
  }

   


export default function App() {

  console.log("Käynnistä sovellus");

  const[product, setProduct] = React.useState('');
  const[amount, setAmount] = React.useState('');
  const[shoppinglist, setShoppinglist] = React.useState([]);
  
  // db.  transaction(callback, error, success)
  useEffect( () => {

    
      firebase.database().ref('items/').on(
          'value',  
          snapshot =>  {
            const data = snapshot.val();
            const prods= Object.values(data);
            //setShoppinglist([]);
            setShoppinglist(prods);
          }
     );
    
  }, []);



 


  const saveProduct = () => {

    if (product == null || product.trim() == '' )
      return;

    if (amount != null && amount.trim() == '')
      setAmount("");

    try {

      firebase.database().ref('items/').push(
          {'product': product, 'amount':amount}
      );

      } catch(error) {
        console.log(error.message());
      }
    setProduct("");
    setAmount("");

  }



  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      
      <TextInput style={styles.nfield} placeholder="Product" onChangeText={product => setProduct(product)} value={product} />
      <TextInput style={styles.nfield} placeholder="Amount" onChangeText={amount => setAmount(amount)} value={amount} />

      <View style={styles.container2}>
        <Button title="SAVE" onPress={() => saveProduct()} />
      </View>

      <View style={styles.container3} >
        <Text style={styles.header} >Shopping List</Text>
      </View>

      
      <FlatList nativeID="plist" 
               numColumns={1}
               style={styles.listStyle} 
               data={shoppinglist} 
               keyExtractor ={item => item.product.toString()}
               renderItem={({item}) => (
                  <View style={styles.litem}>
                      <Text style={styles.productText}>{item.product}, {item.amount}</Text>
                  </View>
               )}
               ItemSeparatorComponent={listSeparator} 
      />
     

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container2: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  container3 : {
    marginTop: 20,
    marginBottom: 0,
    width: '80%',
    alignItems: 'center'
    
  },
  header: {
    fontWeight: 'bold',
    //color: 'blue',
    fontSize: 17
  }, 

  nfield: {
    width: 200, 
    borderColor: 'gray', 
    borderWidth: 1,
    marginTop: 0,
    marginBottom: 10
  },

  listStyle: {
    flex: 1,
    width: '80%',
    paddingLeft: 5,
    paddingRight: 5
  }, 

  litem : {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  productText : {
    fontSize: 15
  },
  deleteText : {
    color: 'blue',
    fontSize: 12
  }
});
