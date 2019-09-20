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
import firestore from 'firebase/firestore';

export default class JobDescription extends React.Component {
  static navigationOptions = {
    title: 'Detalhes'
  };

  constructor(props){
    super(props);

    this.state = {
     offers: ''
    }

		this.item = this.props.navigation.getParam('item');

    this.job = firebase.firestore().collection('jobs').doc(this.item.id);
    firebase.firestore().collection('offers').where('job', '==', this.item.id).get()
      .then((snap) => {
        this.setState({offers: snap.size})
      })
    

  }

  


  render() {
    return (
      <Layout style={styles.container}>
        <ScrollView>
          <Layout style={styles.title}>
    				<Text 
    					style={styles.title}
    					category='h3'
    				>{this.item.data.title}</Text>
            <Layout style={[styles.button, {backgroundColor: '#FFFFFF', bottom: 0, right: 0, height: 40, width: 40}]}>
              <TouchableOpacity 
                onPress={() => {
                  this.props.navigation.navigate('JobOffersScreen', {item: this.item})
                }}
              >
                <Text
                  category='h3'
                  color= 'white'
                >{this.state.offers}</Text>
              </TouchableOpacity>
            </Layout>
          </Layout>
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
        <Layout style={[styles.button, {backgroundColor: '#4da6ff'}]}>
          <TouchableOpacity 
            onPress={this.edit.bind(this)}
          >
            <FontAwesome 
              size={40}
              name={'pencil'}
              color="white"
            />
          </TouchableOpacity>
          
        </Layout>
        <Layout style={[styles.button, {backgroundColor: '#cc0000', right: 100}]}>
          <TouchableOpacity 
            onPress={this.delete.bind(this)}
          >
            <FontAwesome 
              size={40}
              name={'trash-o'}
              color="white"
            />
          </TouchableOpacity>
        </Layout>
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
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  } ,
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
