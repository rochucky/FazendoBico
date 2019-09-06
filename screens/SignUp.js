import React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Layout, Text, Button, Input } from 'react-native-ui-kitten';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

export default class SignUp extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      pass: '',
      passConfirm: '',
      type: ''
    }
    this.users = firebase.firestore().collection('users');
  }


  render(){
    if(this.state.type == ''){
      return(
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Image style={styles.logo} source={require('../assets/images/tags.png')} />
          <Text style={styles.text} category='h4'>Cadastro</Text>
          <Button 
            style={styles.button}
            onPress={() => {
              this.setState({type: 'cliente'})
            }}
          >Sou um Cliente</Button>
          <Button 
            style={styles.button}
            onPress={() => {
              this.setState({type: 'freelancer'})
            }}
          >Sou um Freelancer</Button>
        </KeyboardAvoidingView>

      )
    }
    else{

      return(
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Image style={styles.logo} source={require('../assets/images/tags.png')} />
          <Text style={styles.text} category='h4'>Cadastro</Text>
          <Input 
            style={styles.input}
            placeholder='Nome Completo' 
            onChangeText={(text) => this.setState({name: text})} 
            value={this.state.name}
          />
          <Input 
            style={styles.input}
            placeholder='Email' 
            onChangeText={(text) => this.setState({email: text})} 
            value={this.state.email}
          />
          <Input 
            style={styles.input}
            placeholder='Senha' 
            onChangeText={(text) => this.setState({pass: text})} 
            value={this.state.pass}
            secureTextEntry={true}
          />
          <Input 
            style={styles.input}
            placeholder='Confirme a Senha' 
            onChangeText={(text) => this.setState({passConfirm: text})} 
            value={this.state.passConfirm}
            secureTextEntry={true}
          />
          <Button 
            style={styles.button}
            onPress={this.SignUp.bind(this)}
            title='Login' 
          >Cadastrar</Button>
          <Text
            style={styles.links}
            category='h5'
            status='info'
            onPress={() => {
              this.props.navigation.goBack()
            }}
          >Voltar</Text>
        </KeyboardAvoidingView>
      )
    }
  }
  SignUp = () => {
    if(this.state.email == ''){
      alert('Preencha o email');
      return false;
    }
    try {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass).then((response) => {
        this.users.add({
          name: this.state.name,
          email: this.state.email,
          type: this.state.type
        }).then((result) => {
          alert('Usuário cadastrado com sucesso');
          this.props.navigation.goBack();
        });
      });
    } catch (error) {
      console.log(error.toString(error));
    }
  }
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

