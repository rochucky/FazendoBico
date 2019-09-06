import React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Layout, Text, Button, Input } from 'react-native-ui-kitten';
import * as firebase from 'firebase';

export default class Login extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      login: '',
      pass: ''
    }
  }


  render(){
    return(
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Image style={styles.logo} source={require('../assets/images/tags.png')} />
        {/* <Text style={styles.text} category='h4'>Welcome to UI Kitten</Text> */}
        <Input 
          style={styles.input}
          placeholder='Login' 
          onChangeText={(text) => this.setState({login: text})} 
          value={this.state.login}
        />
        <Input 
          style={styles.input}
          placeholder='Senha' 
          onChangeText={(text) => this.setState({pass: text})} 
          value={this.state.pass}
          secureTextEntry={true}
        />
        <Button 
          style={styles.button}
          onPress={this.Login.bind(this)}
          title='Login' 
        >Login</Button>
        <Text 
          style={styles.links}
          category='h5'
          status='info'
          onPress={() => {
            this.props.navigation.navigate('ForgotPassword')
          }}
        >Esqueceu a senha?</Text>
        <Text
          style={styles.links}
          category='h5'
          status='info'
          onPress={() => {
            this.props.navigation.navigate('SignUp')
          }}
        >Cadastre-se</Text>
      </KeyboardAvoidingView>
    )
  }


  Login = () => {
    if(this.state.login == ''){
      alert('Preencha o Login');
      return false;
    }
    if(this.state.pass == ''){
      alert('Preencha a Senha');
      return false;
    }
    try {
      firebase.auth().signInWithEmailAndPassword(this.state.login, this.state.pass);
      firebase.auth().onAuthStateChanged(user => {
        if(!user){
          alert('Usuário ou senha incorretos.');
        }
        else{
          this.props.navigation.navigate('Main');
        }
        console.log(user);
      })
    } catch (error) {
      console.log(error.toString(error));
    }
  };
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

