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
  BackHandler,
  Modal,
  View
} from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation';
import NavigationService from '../navigation/NavigationService';
import { Text } from 'react-native-ui-kitten';
import * as SQLite from 'expo-sqlite';
import { FontAwesome } from '@expo/vector-icons';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import { ImageModal, Button } from '../components/CustomComponents';

YellowBox.ignoreWarnings(['Setting a timer'])

const db = SQLite.openDatabase('bicos')

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Bicos'
  }

  constructor(props){
    super(props)

    this.state = {
      name: '',
      type: '',
      id: '',
      image: '',
      email: '',
      proofession: '',
      modalVisible: false,
      loading: true
    }

    this.type_alias = {
      'freelancer': 'Freelancer',
      'cliente': 'Cliente'
    };

    AsyncStorage.multiGet(['name','type','id', 'image', 'email', 'profession'])
      .then( async (items) => {
        await this.setState({name: items[0][1]})
        await this.setState({type: items[1][1]})
        await this.setState({id: items[2][1]})
        await this.setState({image: items[3][1]})
        await this.setState({email: items[4][1]})
        await this.setState({profession: items[5][1]})
        await this.setState({loading: false})
      })
      .then(() => {
        this.user = firebase.firestore().collection('users').doc(this.state.id)
      })

  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render(){
    if(this.state.loading == true){
      return(
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    else{

      return(
        <View style={styles.container}>
          <ImageModal modalVisible={this.state.modalVisible} image={this.state.image} setModalVisible={this.setModalVisible.bind(this)}></ImageModal>
          <TouchableOpacity onPress={() => this.setModalVisible(true)}>
            {this.state.image == '' ?
            (
              <View style={styles.thumb}>               
                  <FontAwesome 
                    size={150}
                    name={'user-circle'}
                    color="gray"
                  />
              </View>
            ):
            (
              <Image style={styles.thumb} source={{uri: this.state.image}} />
            )
            }
          </TouchableOpacity>
          <Text style={styles.title}>NOME</Text>
          <Text
            style={styles.name}
            category='h4'
          >{this.state.name}</Text>
          <Text style={styles.title}>EMAIL</Text>
          <Text
            style={styles.name}
            category='h4'
          >{this.state.email}</Text>
          <Text style={styles.title}>PROFISSÃO</Text>
          <Text
            style={styles.name}
            category='h4'
          >{this.state.profession || 'Não Informada'}</Text>
          <Text style={styles.title}>TIPO</Text>
          <Text
            style={styles.name}
            category='h4'
          >{this.type_alias[this.state.type]}</Text>
          <Button 
          type="secondary"
            text="Alternar Tipo"
            onPress={this.changeUserType.bind(this)}
          />
          <Button 
          type="secondary"
            text="Editar Perfil"
            onPress={() => {this.props.navigation.push('ProfileEdit')}}
          />
          <View style={styles.logout}>
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
          </View>
        </View>
      )
    }

  }
  
  logout = () => {
    Alert.alert(
      'Logout',
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
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
            NavigationService.navigate('Login')
          }
      }, ], {
          cancelable: false
      }
    )
    return true
  }

  changeUserType = () => {
    let tipo;
    if(this.state.type == 'cliente'){
      tipo = 'freelancer'
    }
    else{
      tipo = 'cliente'
    }
    Alert.alert(
      'Trocar',
      'Deseja alternar o tipo de usuário para '+ this.type_alias[tipo] +'?', [{
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () => {
            this.user.update({
              type: tipo
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
      'Sair',
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
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
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
    marginTop: 50,
    marginBottom: 50,
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
  pic: {
    width: 320,
    height: 320,
  },
  logout: {
    position: "absolute",
    top: 10,
    right: 10
  },
  name: {
    color: "#aaa",
    marginBottom: 10
  },
  title: {
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
  },
  modal: {
    flex: 1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'rgba(10,10,10,0.7)'
  }
})
