import React from 'react'
import {
  Image,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  YellowBox,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  BackHandler
} from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import NavigationService from '../navigation/NavigationService'
import { Layout, Text } from 'react-native-ui-kitten'
import { SQLite } from 'expo-sqlite'
import { FontAwesome } from '@expo/vector-icons'
import * as firebase from 'firebase'
import firestore from 'firebase/firestore'

import Colors from '../constants/Colors'

YellowBox.ignoreWarnings(['Setting a timer'])

const db = SQLite.openDatabase('bicos')

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Bicos',
    headerStyle: {
      backgroundColor: '#1899DA',
    },
    headerTintColor: '#fff',
  }

  constructor(props){
    super(props)

    this.state = {
      name: '',
      type: '',
      id: '',
      loading: true
    }

    AsyncStorage.multiGet(['name','type','id'])
      .then((items) => {
        this.setState({name: items[0][1]})
        this.setState({type: items[1][1]})
        this.setState({id: items[2][1]})
        this.setState({loading: false})
      })
      .then(() => {
        this.user = firebase.firestore().collection('users').doc(this.state.id)
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
            style={styles.name}
            category='h4'
          >{this.state.name}</Text>
          <Layout style={styles.usertype}>
            <Text
              style={{paddingRight: 10}}
              category='h6'
            >{this.state.type.toUpperCase()}</Text>
            <Layout style={[styles.change, {backgroundColor: '#cc0000'}]}>
              <TouchableOpacity 
                onPress={this.changeUserType.bind(this)}
              >
                <FontAwesome 
                  size={20}
                  name={'exchange'}
                  color="white"
                />
              </TouchableOpacity>
            </Layout>
          </Layout>
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
              )
            })
            NavigationService.navigate('Login')
          }
      }, ], {
          cancelable: false
      }
    )
    return true
  }

  changeUserType = () => {
    Alert.alert(
      'Trocar',
      'Deseja alternar o tipo de usuário?', [{
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () => {
            let newType = 'cliente'
            if(this.state.type == 'cliente'){
              newType = 'freelancer'
            }
            this.user.update({
              type: newType
            })
            .then(() => {
              NavigationService.navigate('Login')
            })
          }
      }, ], {
          cancelable: false
      }
    )
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
    return true
  } 

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
    })
    this.blurListener = this.props.navigation.addListener('didBlur', () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
    })
  }

  componentWillUnmount() {
    this.focusListener.removeEventListener()
    this.blurListener.removeEventListener()
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
  },
  name: {
    color: "#1899DA"
  },
  usertype: {
    flex: 1,
    flexDirection: 'row'
  },
  change: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:30,
    height:30,
    borderRadius:15
  }
})
