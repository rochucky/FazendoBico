import React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Dimensions, Keyboard, View, ScrollView, Text } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import { Button, Input } from '../../components/CustomComponents'
import Colors from '../../constants/Colors'

export default class Second extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      type: '',
      profession: '',
      email: '',
      pass: '',
      passConfirm: '',
      image: require('../assets/images/no-image.png'),
      error: false,
      errorMessage: ''
    }
    this.users = firebase.firestore().collection('users');
  }

  render(){
    return(
      <KeyboardAvoidingView style={{height: '100%', backgroundColor: Colors.mainColor}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <Text style={styles.bigText}>Bem vindo!</Text>
            <Text style={styles.text}>Vamos começar com seu nome:</Text>
            <Input 
              style={styles.input}
              placeholder='Digite aqui'
              onChange={(text) => this.setState({name: text})}
              value={this.state.name}
              textAlign='center'
              color='white'
            />
            {this.state.error &&
              <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
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
            <Text style={styles.steps}><Text style={{color: Colors.primaryDark}}>.</Text>.....</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }

  Next = () => {
    if(this.state.name == ''){
      this.setState({error: true, errorMessage: 'Obrigatório o preenchimento do Nome'})
    }
    else if(this.state.name.indexOf(' ') < 0){
      this.setState({error: true, errorMessage: 'Informe o nome e sobre nome.'})
    }
    else{
      this.setState({error: false, errorMessage: ''}, () => {
       this.props.navigation.navigate('Second', {...this.state})
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

