import React from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, AsyncStorage, ActivityIndicator } from 'react-native';
import { Layout, Text, Button, Input } from 'react-native-ui-kitten';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import { SQLite } from 'expo';


const db = SQLite.openDatabase('bicos');

export default class Login extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      login: '',
      pass: '',
      loading: true
    }

    db.transaction(tx => {
      tx.executeSql(
        'select * from config', [],
        (_, {rows}) => {
          // alert('Ok');
          if(rows.length == 1){
            firebase.auth().signInWithEmailAndPassword(rows._array[0].email, rows._array[0].pass)
            .then(async (user) => {
              firebase.firestore().collection('users').where('email', '==', rows._array[0].email).get()
              .then((querySnapshot) => {
                querySnapshot.forEach( async (doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    await AsyncStorage.setItem('name', doc.data().name)
                    await AsyncStorage.setItem('type', doc.data().type)
                    await AsyncStorage.setItem('email', rows._array[0].email)
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
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Image style={styles.logo} source={require('../assets/images/tags.png')} />
          {/* <Text style={styles.text} category='h4'>Welcome to UI Kitten</Text> */}
          <Input 
            style={styles.input}
            placeholder='Login' 
            onChangeText={(text) => this.setState({login: text})} 
            value={this.state.login}
          />
          <Input 
            style={styles.input}
            placeholder='Senha' 
            onChangeText={(text) => this.setState({pass: text})} 
            value={this.state.pass}
            secureTextEntry={true}
          />
          <Button 
            style={styles.button}
            onPress={this.Login.bind(this)}
            title='Login' 
          >Login</Button>
          <Text 
            style={styles.links}
            category='h5'
            status='info'
            onPress={() => {
              this.props.navigation.navigate('ForgotPassword')
            }}
          >Esqueceu a senha?</Text>
          <Text
            style={styles.links}
            category='h5'
            status='info'
            onPress={() => {
              this.props.navigation.navigate('SignUp')
            }}
          >Cadastre-se</Text>
        </KeyboardAvoidingView>
      )
    }
  }


  Login = () => {
    const pass = this.state.pass;
    firebase.auth().signInWithEmailAndPassword(this.state.login, this.state.pass)
    .then((user) => {
      db.transaction(tx => {
        tx.executeSql(
          "insert into config (email, pass, type) values ( ?, ?, ?)", [this.state.login, this.state.pass, 1],
          () => {
            this.props.navigation.navigate('Main', {email: this.state.login});
          },
          (err) => {
            alert('Falha');
            console.log(err);
          }
        );
      });
      
    })
    .catch((err) => {
      if(err == 'Error: The email address is badly formatted.'){
        alert('Email inválido');
      }
      if(err == 'Error: The password is invalid or the user does not have a password.'){
        alert('Senha incorreta');
      }
      if(err == 'Error: There is no user record corresponding to this identifier. The user may have been deleted.'){
        alert('Usuário não existe, por favor verifique o login e senha novamente');
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
  }
});

