import React, { Component } from 'react';
import {
  Layout,
  Input,
  Button
} from 'react-native-ui-kitten';
import { StyleSheet, TouchableOpacity, Text, View, AsyncStorage } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

import Colors from '../../constants/Colors';

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

export default class MainMenu extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
         title: 'Área Administrativa'
    }
  }

  constructor(props){
    super(props);

    this.state = {
      is_admin: false
    }
    
    this.configs = [
      {
        title: 'Editar meu perfil',
        screen: 'ProfileEdit'
      }
    ]

    this.admin = [
      {
        title: 'Cadastro de Profissões',
        screen: 'Professions'
      }
    ]


    AsyncStorage.getItem('id')
      .then((val) => {
        firebase.firestore().collection('users').doc(val).get()
          .then((doc) => {
              this.setState({'is_admin': doc.data().is_admin})
          })
          .catch(err => {
            alert('Erro au buscar dados do usuario');
            console.log(err);
          })
      })
    

  }

  render() {
    return (
        <Layout style={styles.container}>
          <Text style={{backgroundColor: Colors.secondary}}>Minhas Configurações</Text>
          {this.configs.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={this.select.bind(this, item.screen)} style={styles.option}>
                <Layout style={styles.optionContainer}>
                  <Text style={styles.optionText}>{item.title}</Text>
                  <FontAwesome name="arrow-right" size={40} color={Colors.primary} style={styles.optionIcon}/>
                </Layout>
                
              </TouchableOpacity>
            )
          })}
          {this.state.is_admin && 
          (
            <View>
              <Text style={{backgroundColor: Colors.secondary}}>Configurações do Admin</Text>
              {this.admin.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={this.select.bind(this, item.screen)} style={styles.option}>
                    <Layout style={styles.optionContainer}>
                      <Text style={styles.optionText}>{item.title}</Text>
                      <FontAwesome name="arrow-right" size={40} color={Colors.primary} style={styles.optionIcon}/>
                    </Layout>
                    
                  </TouchableOpacity>
                )
              })}
            </View>
          )
          }
          
          
        </Layout>
    )
  }

  select(screen) {
    this.props.navigation.push(screen);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  option: {
    height: 50,
    justifyContent: 'center',
    paddingRight: 5,
    paddingLeft: 5,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary
  },
  optionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center"
  },
  optionText:{
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.primaryDark,
  },
  optionIcon: {
    position: 'absolute',
    right: 0
    
  },
  label: {
    backgroundColor: Colors.secondary
  }

})