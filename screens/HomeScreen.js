import React from 'react';
import {
  Image,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  YellowBox,
  TouchableWithoutFeedback,
  Alert,
  BackHandler
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import NavigationService from '../navigation/NavigationService'
import { Layout, Text } from 'react-native-ui-kitten';
import { SQLite } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

YellowBox.ignoreWarnings(['Setting a timer']);

const db = SQLite.openDatabase('bicos');

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Bicos'
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
          <Layout style={styles.logout}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.logout()
              }}  
            >
              <FontAwesome 
                size={40}
                name={'power-off'} 
              />
            </TouchableWithoutFeedback>
          </Layout>
        </Layout>
      )
    }

  }
  
  logout = () => {
    Alert.alert(
      'Exit App',
      'Deseja fazer logout?', [{
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () => {
            db.transaction(tx => {
              tx.executeSql(
                'delete from config'
              );
            });
            NavigationService.navigate('Login');
          }
      }, ], {
          cancelable: false
      }
    )
    return true;
  }

  _load = async () => {
    await AsyncStorage.multiGet(['name','type']).then((response) => {
      this.setState({type: response[2][1]})
      this.setState({name: response[0][1]})
    })
  }

  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Deseja realmente Sair?', [{
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () => BackHandler.exitApp()
      }, ], {
          cancelable: false
      }
    )
    return true;
  } 

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    });
    this.blurListener = this.props.navigation.addListener('didBlur', () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    });
  }

  componentWillUnmount() {
    this.focusListener.removeEventListener()
    this.blirListener.removeEventListener()
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
    top: 10,
    right: 10
  }
});
