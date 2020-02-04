import React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Dimensions, Keyboard, View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import { Button, Select } from '../../components/CustomComponents'
import Colors from '../../constants/Colors'

import NetInfo from '@react-native-community/netinfo'

export default class Profession extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
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
            <Text style={styles.text}>Qual a sua profissão?</Text>
            <Select
              style={styles.input}
              onChange={(text,index) => this.setState({profession: text})}
              value={this.state.profession}
              textAlign='center'
              color='white'
            />
            {this.state.error &&
              <Text style={{color: 'red', textAlign: 'center'}}>{this.state.errorMessage}</Text>
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
            <Text style={styles.steps}>.<Text style={{color: Colors.primaryDark}}>.</Text>....</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }

  Next = () => {
    if(this.state.profession == ''){
      this.setState({error: true, errorMessage: 'Selecione uma profissão'})
    }
    else{
      this.setState({error: false, errorMessage: ''}, () => {
        this.props.navigation.navigate('Third', {...this.state})
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

