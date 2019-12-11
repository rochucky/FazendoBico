import React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Dimensions, Keyboard, View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import { Button, Input } from '../../components/CustomComponents'
import Colors from '../../constants/Colors'

import NetInfo from '@react-native-community/netinfo'

export default class Forth extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      passConfirm: '',
      loading: false,
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
            <Text style={styles.text}>Digite a senha novamente:</Text>
            <Input 
              style={styles.input}
              placeholder='' 
              onChange={(text) => this.setState({passConfirm: text})}
              value={this.state.passConfirm}
              textAlign='center'
              color='white'
              secureTextEntry={true}
            />
            {this.state.error &&
              <Text style={{color: 'red', textAlign: 'center'}}>{this.state.errorMessage}</Text>
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
            
            <Text style={{color: 'white'}}>*A Senha deve ter pelo menos 6 caracteres entre números e letras</Text>
            <Text style={styles.steps}>....<Text style={{color: Colors.primaryDark}}>.</Text>.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }

  Next = () => {
    if(this.state.passConfirm == ''){
      this.setState({error: true, errorMessage: 'Obrigatório o preenchimento da confirmação de senha'})
    }
    else if(this.state.passConfirm != this.state.pass){
      this.setState({error: true, errorMessage: 'Confirmação e senha são diferentes'})
    }
    else{
      this.setState({error: false, errorMessage: '', loading: true}, () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass).then((response) => {
          this.users.add({
            name: this.state.name,
            email: this.state.email.toLowerCase(),
            type: this.state.type
          })
          .then((result) => {
            this.setState({error: false, errorMessage: ''}, () => {
             this.props.navigation.navigate('Last', {...this.state})
            })
          })
          .catch((err) => {
            alert(err);
          })
        });
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

