import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  Picker
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class SignIn extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      pass: '',
      type: ''
    }
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            
            <View style={styles.inputContainer}>
              <TextInput style={styles.inputStyle} placeholder="Teste" textContentType="emailAddress" onChangeText={(email) => this.setState({email})} value={this.state.email}/>
             </View>
             <View style={styles.inputContainer}>
              <TextInput style={styles.inputStyle} type="password" placeholder="Senha" secureTextEntry={true} onChangeText={(pass) => this.setState({pass})} value={this.state.pass}/>
             </View>
             <View style={styles.inputContainer}>
              <Picker
                selectedValue={this.state.type}
                style={styles.pickerStyle}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({type: itemValue})
                }>
                <Picker.Item label="Sou um cliente" value="1" />
                <Picker.Item label="Sou um Profissional" value="2" />
              </Picker>
             </View>
             <View style={styles.buttonContainer}>
              <Button style={styles.buttonStyle} onPress={this.login.bind(this)} title="Login"/>
             </View>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this.underMaintanance} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Esqueci minha senha!</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.underMaintanance} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  login(){
    if(this.state.email == ''){
      alert('Por favor preencher o email');
    }
    else if(this.state.pass == ''){
      alert('Por favor preencher a senha');
    }
    else{
      if(this.state.email === 'email@teste.com' && this.state.pass === '1234'){
        alert('Login efetuado!');
      }
      else{
        alert("Usuário ou senha incorretos\n"+this.state.email+" - "+this.state.pass);
      }
    }
  }

  underMaintanance(){
    alert('Em desenvolvimento');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  inputContainer:{
    width: '100%',
    borderBottomWidth: 2,
    borderColor: '#EDEDED',
    marginTop: 10,
    marginBottom: 10
  },
  inputStyle: {
    width: '100%',
    paddingLeft: 10,
    fontSize: 18
  },
  pickerStyle: {
    width: '100%',
    paddingLeft: 10
  },
  buttonContainer:{
    width: '100%',
    marginTop: 10,
    marginBottom: 10
  },
  buttonStyle: {
    width: '100%',
    fontSize: 18
  },
  image: {
    height: '80%'
  }
});
