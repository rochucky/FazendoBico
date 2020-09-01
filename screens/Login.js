import React from 'react';
import { StyleSheet, Image, Keyboard, AsyncStorage, ActivityIndicator, View, Picker, ScrollView, Dimensions, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Layout, Text } from 'react-native-ui-kitten';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as SQLite  from 'expo-sqlite'
import { Input, Button } from '../components/CustomComponents'


const db = SQLite.openDatabase('bicos');

export default class Login extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      login: '',
      pass: '',
      type: '',
      loading: true,
      screenHeight: Math.round(Dimensions.get('window').height)
    }

  }


  render(){

    if(this.state.loading == true){
      return(
        <Layout style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </Layout>
      )
    }
    else{

      return(
        <KeyboardAvoidingView style={{height: this.state.screenHeight}}>
          
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            
            <Image style={styles.logo} source={require('../assets/images/tags.png')} />
            {/* <Text style={styles.text} category='h4'>Welcome to UI Kitten</Text> */}
            <Input 
              style={styles.input}
              placeholder='Login' 
              onChange={(text) => this.setState({login: text})} 
              value={this.state.login}
              textAlign='center'
            />
            <Input 
              style={styles.input}
              placeholder='Senha' 
              onChange={(text) => this.setState({pass: text})} 
              value={this.state.pass}
              secureTextEntry={true}
              textAlign='center'
            />
            <Button 
              onPress={this.Login.bind(this)}
              text='Entrar' 
              marginTop={20}
            />
            <Button 
              onPress={() => {
                this.props.navigation.navigate('ForgotPassword')
              }}
              text='Esqueceu a Senha?'
              type='secondary'
              fontSize={16}
              marginTop={20}
            />
            <Button 
              onPress={() => {
                this.props.navigation.navigate('SignUp')
              }}
              text='Cadastre-se'
              type='secondary'
              fontSize={16}
            />
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      )
    }
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.setState({loading: true});
      db.transaction(tx => {
        tx.executeSql(
          'select * from config', [],
          (_, {rows}) => {
            // alert('Ok');
            if(rows.length == 1){
              firebase.auth().signInWithEmailAndPassword(rows._array[0].email.toLowerCase(), rows._array[0].pass)
              .then(async (user) => {
                firebase.firestore().collection('users').where('email', '==', rows._array[0].email.toLowerCase()).get()
                .then((querySnapshot) => {
                  querySnapshot.forEach( async (doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    await AsyncStorage.setItem('name', doc.data().name)
                    await AsyncStorage.setItem('type', doc.data().type)
                    await AsyncStorage.setItem('email', doc.data().email)
                    await AsyncStorage.setItem('profession', doc.data().profession)
                    await AsyncStorage.setItem('image', doc.data().image)
                    await AsyncStorage.setItem('id', doc.id);
                    this.setState({pass: ''});
                    this.props.navigation.navigate('Main', {type: doc.data().type})
                  });
                })
                .catch((err) => {
                  alert('error')
                  console.log(err)
                })
              })
              .catch(() => {
                db.transaction(tx => {
                  tx.executeSql(
                    'delete from config'
                  );
                });
                alert('Falha nas credenciais, por favor logue novamente');
              })
            }
            if(rows.length > 1){
              db.transaction(tx => {
                tx.executeSql(
                  'delete from config'
                );
              });
            }
            if(rows.length == 0){
              this.setState({loading: false});  
              db.transaction(tx => {
                tx.executeSql(
                  'create table if not exists config (id integer primary key not null, email text, pass text, name text, type int);'
                );
              });
            }
          },
          () => {
            this.setState({loading: false});  
            db.transaction(tx => {
              tx.executeSql(
                'create table if not exists config (id integer primary key not null, email text, pass text, name text, type int);'
              );
            });
          }
        );
      });
    });
  }

  Login = async () => {
    this.setState({loading: true});
    const pass = this.state.pass;
    firebase.auth().signInWithEmailAndPassword(this.state.login.toLowerCase(), this.state.pass)
    .then((user) => {

      db.transaction(tx => {
        tx.executeSql(
          "insert into config (email, pass, type) values ( ?, ?, ?)", [this.state.login, this.state.pass, this.state.type],
          () => {}
        );
      });
      firebase.firestore().collection('users').where('email', '==', this.state.login.toLowerCase()).get()
        .then((querySnapshot) => {
          querySnapshot.forEach( async (doc) => {
              // doc.data() is never undefined for query doc snapshots
              await AsyncStorage.setItem('name', doc.data().name)
              await AsyncStorage.setItem('type', doc.data().type)
              await AsyncStorage.setItem('email', doc.data().email)
              await AsyncStorage.setItem('profession', doc.data().profession)
              await AsyncStorage.setItem('image', doc.data().image)
              this.setState({pass: ''});
              this.props.navigation.navigate('Main', {type: doc.data().type})
          });
        })
        .catch((err) => {
          this.setState({loading: false});
          alert('error')
          console.log(err)
        })
      
    })
    .catch((err) => {
      if(err == 'Error: The email address is badly formatted.'){
        alert('Email inválido');
        this.setState({loading: false});
      }
      if(err == 'Error: The password is invalid or the user does not have a password.'){
        alert('Senha incorreta');
        this.setState({loading: false});
      }
      if(err == 'Error: There is no user record corresponding to this identifier. The user may have been deleted.'){
        alert('Usuário não existe, por favor verifique o login e senha novamente');
        this.setState({loading: false});
      }
      // console.log(err);
    });
      
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
  },
  pickerContainer: {
		width: '100%',
		backgroundColor: '#f7f9fc',
		borderColor: '#edf1f7',
		borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20
	},
	picker: {
		width: '100%'
	},
	label: {
		color: '#8f9bb3',
		marginBottom: 5
	}
});

