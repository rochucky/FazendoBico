import React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';
import { Button, Input } from '../components/CustomComponents'

export default class ForgotPassword extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      email: ''
    }
  }


  render(){
    return(
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Image style={styles.logo} source={require('../assets/images/tags.png')} />
        <Text style={styles.text} category='h4'>Reset de senha</Text>
        <Text style={styles.text} category='p1'>Nos informe o email cadastrado</Text>
        <Input 
          placeholder='Email'
          type="email-address"
          onChange={(text) => this.setState({email: text})} 
          value={this.state.email}
          textAlign='center'
        />
        <Button 
          onPress={this.reset.bind(this)}
          text='Enviar' 
        />
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


  reset = () => {
    alert('Você receberá um e-mail com as instruções para o reset de senha.');
    this.props.navigation.goBack();
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

