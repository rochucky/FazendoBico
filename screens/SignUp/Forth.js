import React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Dimensions, Keyboard, View, ScrollView, Text } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import { Button, Input } from '../../components/CustomComponents'
import Colors from '../../constants/Colors'

export default class Forth extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      pass: '',
      ...this.props.navigation.state.params
    }
    this.users = firebase.firestore().collection('users');
  }

  render(){

    const {navigation} = this.props
    const name = navigation

    return(
      <KeyboardAvoidingView style={{height: '100%', backgroundColor: Colors.mainColor}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <Text style={styles.bigText}>{this.state.name.split(' ')[0]}</Text>
            <Text style={styles.text}>Digite uma Senha</Text>
            <Input 
              style={styles.input}
              placeholder='' 
              onChange={(text) => this.setState({pass: text})}
              value={this.state.pass}
              textAlign='center'
              color='white'
              secureTextEntry={true}
            />
            {this.state.error &&
              <Text style={{color: 'red', textAlign: 'center'}}>{this.state.errorMessage}</Text>
            }
            <Button 
              text='Avançar'
              ref="btnNext"
              onPress={this.Next.bind(this)}
              type='secondary'
            />
            <Button 
              text='< Voltar'
              fontColor='red'
              onPress={() => {
                this.props.navigation.pop()
              }}
              type='secondary'
            />
            <Text style={{color: 'white'}}>*A Senha deve ter pelo menos 6 caracteres entre números e letras</Text>
            <Text style={styles.steps}>...<Text style={{color: Colors.primaryDark}}>.</Text>..</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }

  Next = () => {
    if(this.state.pass == ''){
      this.setState({error: true, errorMessage: 'Obrigatório o preenchimento do pass'})
    }
    else if(this.state.pass.length < 6){
      this.setState({error: true, errorMessage: 'Senha inválida, Verifique as regras abaixo'})
    }
    else{
      this.setState({error: false, errorMessage: ''}, () => {
       this.props.navigation.navigate('Fifth', {...this.state})
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

