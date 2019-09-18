import React from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView, AsyncStorage, TouchableOpacity, Alert } from 'react-native';
import {
  Layout,
	Text,
	Input,
	Button
} from 'react-native-ui-kitten';
import { FontAwesome } from '@expo/vector-icons';
import * as firebase from 'firebase'
import firestore from 'firebase/firestore';

export default class JobDescription extends React.Component {
  static navigationOptions = {
    title: 'Detalhes'
  };

  constructor(props){
    super(props);

		this.item = this.props.navigation.getParam('item');

    this.job = firebase.firestore().collection('jobs').doc(this.item.id);

    // this.state = {
		// 	item: ''
		// }

  }

  


  render() {
    return (
      <Layout style={styles.container}>
        <ScrollView>
  				<Text 
  					style={styles.title}
  					category='h3'
  				>{this.item.data.title}</Text>
  				<Text 
  					style={styles.value}
  					category='h6'
  				>R$ {this.item.data.value}</Text>
          <Text style={styles.label}>Descrição</Text>
  				<Text style={styles.description}>{this.item.data.description}</Text>
          <Text style={styles.label}>Endereço</Text>
          <Text style={styles.description}>{this.item.data.address}, {this.item.data.number} - {this.item.data.neighborhood}</Text>
          <Text style={styles.label}>Cidade</Text>
          <Text style={styles.description}>{this.item.data.city} - {this.item.data.state}</Text>
          
  			</ScrollView>
      </Layout>
    )
	}

  edit = () => {
    this.props.navigation.push('EditJobScreen', {item: this.item});
  }

  delete = () => {
    Alert.alert(
      'Excluir',
      'Deseja excluir este bico?', [{
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () => {
            this.job.delete().then(() => {
              alert('Bico Excluido');
              this.props.navigation.goBack();
            })
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
    paddingTop: 10,
    paddingRight: 15,
    paddingLeft: 15,
    height: '100%'
  },  
  value: {
		borderBottomWidth: 1,
		borderColor: '#CCC',
		paddingBottom: 10
  },
  listItemTitle: {
    paddingBottom: 5
  },

  headerText: {
    fontSize: 20
	},
  label: {
    paddingTop: 25,
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
