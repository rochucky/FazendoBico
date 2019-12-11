import React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Dimensions, Keyboard, View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import { Button, Input } from '../../components/CustomComponents'
import Colors from '../../constants/Colors'

import NetInfo from '@react-native-community/netinfo';

export default class Third extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      email: '',
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
            <Text style={styles.text}>Você pode nos informar seu email?</Text>
            <Input 
              style={styles.input}
              placeholder='' 
              onChange={(text) => this.setState({email: text})}
              value={this.state.email}
              textAlign='center'
              color='white'
            />
            {this.state.error &&
              <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
            }
            {this.state.loading ? (
                <ActivityIndicator size="large" color="white" />  
              ) : (
                <Button 
                  text='Avançar'
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
            <Text style={styles.steps}>..<Text style={{color: Colors.primaryDark}}>.</Text>...</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }

  Next = () => {
    if(this.state.email == ''){
      this.setState({error: true, errorMessage: 'Obrigatório o preenchimento do Email'})
    }
    else if(this.state.email.indexOf('@') < 0){
      this.setState({error: true, errorMessage: 'Email inválido'})
    }
    else{
      this.setState({error: false, errorMessage: '', loading: true}, () => {
        NetInfo.isConnected.fetch().done((isConnected) =>{
          if(isConnected){
            this.users.where('email', '==', this.state.email).get()
              .then(snap => {
                if(snap.size > 0){
                  this.setState({error: true, errorMessage: 'Este e-mail já foi cadastrado', loading: false})
                }
                else{
                  this.setState({error: false, errorMessage: '', loading: false}, () => {
                   this.props.navigation.navigate('Forth', {...this.state})
                  })
                }
              })
          }
          else{
            this.setState({'error': true, errorMessage: 'Falha na conexão', loading: false})
          }
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

