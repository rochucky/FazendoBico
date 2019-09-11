import React from 'react';
import {
  Image,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';
import { SQLite } from 'expo';
import {YellowBox} from 'react-native';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

YellowBox.ignoreWarnings(['Setting a timer']);

const db = SQLite.openDatabase('bicos');

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home'
  };

  constructor(props){
    super(props);

    this.state = {
      name: '',
      type: '',
      loading: true
    }

    AsyncStorage.multiGet(['name','type'])
      .then( async (items) => {
        await this.setState({name: items[0][1]})
        await this.setState({type: items[1][1]})
        await this.setState({loading: false})
      })
  }

  render(){
    if(this.state.loading == true){
      return(
        <Layout style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </Layout>
      )
    }
    else{

      return(
        <Layout style={styles.container}>
          <Image style={styles.thumb} source={{uri: 'http://img.clipartlook.com/super-mario-face-clipart-1-super-mario-clipart-520_386.jpg'}} />
          <Text
            // style={styles.title}
            category='h4'
            status='info'
          >{this.state.name}</Text>
          <Text
            // style={styles.title}
            category='p1'
          >{this.state.type}</Text>
          <Text
            style={styles.content}
            category='h3'
          >à combinar conteúdo</Text>
          
        </Layout>
      )
    }

  }
  
  logout = () => {
    alert('teste');
  }

  _load = async () => {
    await AsyncStorage.multiGet(['name','type']).then((response) => {
      this.setState({type: response[2][1]})
      this.setState({name: response[0][1]})
    })
  }
  
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  container: {
    flex: 1,
    flexDirection:'column',
    alignItems:'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  thumb: {
    marginTop: 20,
    marginBottom: 20,
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
  logout: {
    position: "absolute",
    paddingTop: 15,
    top: 20,
    right: 20
  }
});
