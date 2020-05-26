import React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Dimensions, Keyboard, View, ScrollView, Platform, Text, ActivityIndicator } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import { Button, Input } from '../../components/CustomComponents'
import Colors from '../../constants/Colors'

import NetInfo from '@react-native-community/netinfo'

import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export default class Sixth extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      ...this.props.navigation.state.params
    }
    this.users = firebase.firestore().collection('users')
    this.images = firebase.firestore().collection('images')

    this.blob = '';
    this.url = '';
  }

  render(){

    const {navigation} = this.props
    const name = navigation

    return(
      <KeyboardAvoidingView style={{height: '100%', backgroundColor: Colors.mainColor}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <Text style={styles.bigText}>{this.state.name.split(' ')[0]}</Text>
            <Image style={styles.logo} source={this.state.image} />
            <Text style={styles.text}>Para finalizar, Precisamos de uma foto do seu rosto.</Text>

            {this.state.error &&
              <Text style={{color: 'red', textAlign: 'center'}}>{this.state.errorMessage}</Text>
            }

            {this.state.loading ? (
                <View></View>
              ) : (
                <Button 
                  text='Tirar Foto'
                  onPress={this.picture.bind(this)}
                  type='secondary'
                />
              )
            }

            {this.state.loading ? (
                <ActivityIndicator size="large" color="white" />  
              ) : (
                <Button 
                  text='Concluir'
                  ref="btnNext"
                  onPress={this.Next.bind(this)}
                  type='secondary'
                />
              )
              
            }
            {this.state.loading ? (
                <View></View>
              ) : (
                <Button 
                  text='< Voltar'
                  fontColor='red'
                  onPress={() => {
                    this.props.navigation.pop()
                  }}
                  type='secondary'
                />
              )
              
            }
            
            <Text style={styles.steps}>....<Text style={{color: Colors.primaryDark}}>.</Text></Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }

  picture = async () => {
    if(!this.getPermissionAsync()){
      alert('É preciso dar permissão para utilização da Câmera')
      return false
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      base64: false,
      quality: 0.7,
    })
    if(!result.cancelled){
      let response = await fetch(result.uri)
      this.blob = await response.blob()
    
      this.setState({image: {uri: result.uri}});
    }
  }

  getPermissionAsync = async () => {
    if (Platform.OS == 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        alert('É necessário permissão de câmera para prosseguir.')
        return false
      }
    }
    else{
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      if (status !== 'granted') {
        // alert('Sorry, we need camera permissions to make this work!')
        return false
      }
    }
    return true
  }

  Next = async () => {
    if(this.blob == ''){
      this.setState({error: true, errorMessage: 'A foto é obrigatória'})
    }
    else if(this.state.passConfirm != this.state.pass){
      this.setState({error: true, errorMessage: 'Confirmação e senha são diferentes'})
    }
    else{      
      this.setState({error: false, errorMessage: '', loading: true}, async () => {
        
        
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass).then((response) => {
          let date = new Date()
          let filename = this.state.email + '_' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + '.jpg'
          firebase.storage().ref().child(filename).put(this.blob)
            .then( async (snap) => {
            this.url = await snap.ref.getDownloadURL()
            this.users.add({
              name: this.state.name,
              email: this.state.email,
              type: this.state.type,
              image: this.url,
              profession: this.state.profession || ''
            })
            .then((result) => {
              this.setState({error: false, errorMessage: '', loading: false}, () => {
               this.props.navigation.navigate('Last', {...this.state})
              })
            })
            .catch((err) => {
              alert('Falha ao carregar arquivo!')
              console.log(err)
            })
          })
        })
        .catch((err) => {
          alert(err);
        })
      })
      
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  text: {
    marginVertical: 16,
  },
  input: {
    marginBottom: 20,
    color: 'white'
  },
  button: {
    width: '100%',
    marginBottom: 20
  },
  links: {
    marginTop: 20
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50
  },
  bigText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'white'
  },
  steps: {
    position: 'absolute',
    bottom: 20,
    fontSize: 44,
    fontWeight: 'bold',
    color: 'white'
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white'
  }
});

