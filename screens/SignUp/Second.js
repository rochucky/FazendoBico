import React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Dimensions, Keyboard, View, ScrollView, Text } from 'react-native';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import { Button, Input } from '../../components/CustomComponents'
import Colors from '../../constants/Colors'

export default class First extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      type: '',
      ...this.props.navigation.state.params
    }
    this.users = firebase.firestore().collection('users');
  }

  render(){

    const {navigation} = this.props;

    return(
      <KeyboardAvoidingView style={{height: '100%', backgroundColor: Colors.mainColor}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <Text style={styles.bigText}>Obrigado, {this.state.name.split(' ')[0]}</Text>
            <Text style={styles.text}>Você deseja entrar na comunidade como um:</Text>
            <Button 
              text='Cliente'
              onPress={() => {
                this.setState({type: 'cliente'}, () => {
                  this.props.navigation.navigate('Third',{...this.state})
                })
              }}
              type='secondary'
            />
            <Button 
              text='Freelancer'
              onPress={() => {
                this.setState({type: 'freelancer'}, () => {
                  this.props.navigation.navigate('Profession',{...this.state})
                })
              }}
              type='secondary'
            />
            <Text style={styles.text}>*Esta opção poderá ser alternada futuramente</Text>
            <Text style={styles.steps}>.<Text style={{color: Colors.primaryDark}}>.</Text>....</Text>
            <Button 
              text='< Voltar'
              fontColor='red'
              onPress={() => {
                this.props.navigation.pop()
              }}
              type='secondary'
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    )
  
  }

  keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',(e) => {
    this.setState({screenHeight: this.state.screenHeight - e.endCoordinates.height})
  });
  keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',() => {
    this.setState({screenHeight: Math.round(Dimensions.get('window').height) })
  });
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
    fontSize: 16,
    marginBottom: 20,
    marginTop: 20,
    color: 'white'
  }
});

