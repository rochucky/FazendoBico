import React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Dimensions, Keyboard, View, ScrollView } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import { Button, Input } from '../components/CustomComponents'

export default class SignUp extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      pass: '',
      passConfirm: '',
      type: '',
      screenHeight: Math.round(Dimensions.get('window').height)
    }
    this.users = firebase.firestore().collection('users');
  }


  render(){
    if(this.state.type == ''){
      return(
        <View style={{height: this.state.screenHeight}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
              <Image style={styles.logo} source={require('../assets/images/tags.png')} />
              <Text style={styles.text} category='h4'>Cadastro</Text>
              <Button 
                text='Sou um Cliente'
                onPress={() => {
                  this.setState({type: 'cliente'})
                }}
              />
              <Button 
                text='Sou um Freelancer'
                onPress={() => {
                  this.setState({type: 'freelancer'})
                }}
              />
            </View>
          </ScrollView>
        </View>

      )
    }
    else{

      return(
        <View style={{height: this.state.screenHeight}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
              <Image style={styles.logo} source={require('../assets/images/tags.png')} />
              <Text style={styles.text} category='h4'>Cadastro</Text>
              <Input 
                style={styles.input}
                placeholder='Nome Completo' 
                onChange={(text) => this.setState({name: text})} 
                value={this.state.name}
                textAlign='center'
              />
              <Input 
                style={styles.input}
                placeholder='Email'
                keyboardType="email-address"
                onChange={(text) => this.setState({email: text})} 
                value={this.state.email}
                textAlign='center'
              />
              <Input 
                style={styles.input}
                placeholder='Senha' 
                onChange={(text) => this.setState({pass: text})} 
                value={this.state.pass}
                secureTextEntry={true}
                textAlign='center'
              />
              <Input 
                style={styles.input}
                placeholder='Confirme a Senha' 
                onChange={(text) => this.setState({passConfirm: text})} 
                value={this.state.passConfirm}
                secureTextEntry={true}
                textAlign='center'
              />
              <Button 
                text='Cadastrar'
                onPress={this.SignUp.bind(this)}
              />
              <Text
                style={styles.links}
                category='h5'
                status='info'
                onPress={() => {
                  this.props.navigation.goBack()
                }}
              >Voltar</Text>
            </View>
          </ScrollView>
        </View>
      )
    }
  }

  SignUp = () => {
    if(this.state.email == '' ||
       this.state.pass == '' ||
       this.state.passConfirm == '' ||
       this.state.name == ''){
      alert('Todos os campos são obrigatórios');
      return false;
    }
    if(this.state.pass !== this.state.passConfirm){
      alert('Senha e confirmação não batem');
      return false;
    }
    
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass).then((response) => {
      this.users.add({
        name: this.state.name,
        email: this.state.email.toLowerCase(),
        type: this.state.type
      })
      .then((result) => {
        alert('Usuário cadastrado com sucesso');
        this.props.navigation.goBack();
      })
      .catch((err) => {
        alert(err);
      })
    });
  }

  keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',(e) => {
    this.setState({screenHeight: this.state.screenHeight - e.endCoordinates.height})
  });
  keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',() => {
    this.setState({screenHeight: Math.round(Dimensions.get('window').height) })
  });
}

// const firebaseConfig = {
//   apiKey: "AIzaSyCexIdHYZJtx-yEcmuUTjCANQFNixUfd94",
//   authDomain: "bicos-6a1f2.firebaseapp.com",
//   databaseURL: "https://bicos-6a1f2.firebaseio.com",
//   projectId: "bicos-6a1f2",
//   storageBucket: "",
//   messagingSenderId: "355946700353",
//   appId: "1:355946700353:web:d9c15b38e81f433f4d70c0"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

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
    marginBottom: 20
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
  }
});

