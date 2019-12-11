import React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Dimensions, Keyboard, View, ScrollView, Text, ActivityIndicator, BackHandler } from 'react-native';
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
            <Text style={styles.bigText}>{this.state.name.split(' ')[0]},</Text>
            <Text style={styles.text}>Seu cadastro foi realizado com sucesso.</Text>
            <Text style={styles.text}>Você receberá um email para ativar o seu cadastro.</Text>
                        
            <Button 
              text='Finalizar'
              fontColor='red'
              onPress={() => {
                this.props.navigation.popToTop()
              }}
              type='secondary'
            />
              
            <Text style={styles.steps}>.....<Text style={{color: Colors.primaryDark}}>.</Text></Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    this.props.navigation.popToTop();
    return true;
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

