import React, { Component } from 'react';
import {
  Layout,
  Input,
  Button
} from 'react-native-ui-kitten';
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

import Colors from '../../constants/Colors';

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

export default class Professions extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
         title: 'Cadastro de Profissões'
    }
  }

  constructor(props){
    super(props);

    this.state = {
      professions: [],
      professionInput: '',
      professionId: null
    }
    
    this.obj = firebase.firestore().collection('professions');
    
    

  }

  componentDidMount() {
    this.load()
  }

  render() {
    return (
        <Layout style={styles.container}>
          <Input 
            label="Adicionar profissão"
            onChangeText={(text) => this.setState({professionInput: text})} 
            value={this.state.professionInput}
            onBlur={this.save.bind(this)}
          />
          <Text style={{backgroundColor: Colors.secondary}}>Profissões Cadastradas</Text>
          {this.state.professions.map((item, index) => {
            return (
              <Layout key={index} style={styles.option}>
                <Layout style={styles.optionContainer}>
                  <Text style={styles.optionText}>{item.name}</Text>
                  <FontAwesome name="remove" size={40} color={'red'} style={styles.optionIcon} onPress={this.delete.bind(this, item.id, item.name)}/>
                </Layout>
                
              </Layout>
            )
          })}
          
        </Layout>
    )
  }

  load = async () => {
    await this.obj.orderBy('name').get()
      .then((querySnapshot) => {
        if(querySnapshot.size > 0){
          var professionsArray = [];
          querySnapshot.forEach((doc) => {
            professionsArray.push({id: doc.id, ...doc.data()})
          })
          this.setState({professions: professionsArray, professionInput: ''});
        }
        else{
          alert('Não há profissões cadastradas ainda');
        }
      })
      .catch(err => {
        alert('Erro au buscar dados do usuario');
        console.log(err);
      })
  }

  delete(id, name){
    Alert.alert(
      'Excluir Profissão',
      'Deseja realmente excluir a profissão "'+name+'"?',
      [
        {
          text: 'Sim',
          onPress: async () => {
            await this.obj.doc(id).delete().
            then((docRef) => {
              this.load();
            })
            .catch(err => {
              alert('Falha ao deletar profissão');
              console.log(err);
            })
          }
        },
        {
          text: 'Não'
        }
      ]
    )
  }

  save() {
    Alert.alert(
      'Salvar Profissão',
      'Deseja realmente salvar a profissão "'+this.state.professionInput+'"?',
      [
        {
          text: 'Sim',
          onPress: async () => {
            await this.obj.add({
              name: this.state.professionInput
            }).
            then((docRef) => {
              console.log('Criado com Id: '+docRef.id);
              this.load();
            })
            .catch(err => {
              alert('Falha ao salvar profissão');
              console.log(err);
            })
          }
        },
        {
          text: 'Não'
        }
      ]
    )
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