import React from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import {
  Layout,
  Text,
  Input,
  Button
} from 'react-native-ui-kitten';
import { FontAwesome } from '@expo/vector-icons';
import * as firebase from 'firebase'
import firestore from 'firebase/firestore'
import Colors from '../constants/Colors'

export default class JobFreelancerInProgressDescription extends React.Component {
  static navigationOptions = {
    title: 'Detalhes'
  };

  constructor(props){
    super(props);

    this.state = {
     offers: ''
    }

    this.item = this.props.navigation.getParam('item');

    console.log(this.item);
    

  }

  


  render() {
    return (
      <Layout style={styles.container}>
        <ScrollView>
          <Layout style={styles.titleContainer}>
            <Text 
              style={styles.title}
              category='h3'
            >{this.item.data.title}</Text>
            <Text 
              style={styles.value}
              category='h6'
            >R$ {this.item.data.freelancer_value}</Text>
          </Layout>
          <Layout style={styles.bodyContainer}>
            <Text style={styles.label}>Descrição</Text>
            <Text style={styles.description}>{this.item.data.description}</Text>
            <Text style={styles.label}>Endereço</Text>
            <Text style={styles.description}>{this.item.data.address}, {this.item.data.number} - {this.item.data.neighborhood}</Text>
            <Text style={styles.label}>Cidade</Text>
            <Text style={styles.description}>{this.item.data.city} - {this.item.data.state}</Text>
            <Text style={styles.label}>Solicitante</Text>
            <Text style={styles.description}>{this.item.data.owner}</Text>
          </Layout>
        </ScrollView>
        <Layout style={[styles.button, { backgroundColor: Colors.mainColor }]}>
          <TouchableOpacity 
            onPress={this.chat.bind(this)}
          >
            <FontAwesome 
              size={40}
              name={'comments'}
              color="white"
            />
          </TouchableOpacity>
        </Layout>
      </Layout>
    )
  }

  chat = () => {
    this.props.navigation.push('Chat', {job_id: this.item.id, job: this.item.data});
  }

  pay = () => {
    Alert.alert(
      'Pagar',
      'Deseja realizar o pagamento?', [{
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () => {
            alert('Realizar lógica de pagamento...')
          }
      }, ], {
          cancelable: false
      }
    )
    return true;
    
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
  titleContainer: {
    paddingTop: 10,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: '#E1F9FF',
    borderBottomWidth: 1,
    borderColor: '#CCC'
  },
  bodyContainer: {
    paddingRight: 15,
    paddingLeft: 15
  },
  value: {
    paddingBottom: 10
  },
  listItemTitle: {
    paddingBottom: 5
  },

  headerText: {
    fontSize: 20
  },
  label: {
    paddingTop: 15,
    paddingBottom: 5,
    color: '#CACACA'
  },
  description: {
    fontSize: 20
  },
  button: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:70,
    height:70,
    borderRadius:50,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  }

});
