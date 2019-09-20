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

export default class JobFreelancerDescription extends React.Component {
  static navigationOptions = {
    title: 'Detalhes'
  };

  constructor(props){
    super(props);

		this.item = this.props.navigation.getParam('item')
    this.job = firebase.firestore().collection('jobs').doc(this.item.id)
    this.offers = firebase.firestore().collection('offers')

    
    this.state = {
			offer: false,
      email: this.props.navigation.getParam('email'),
      myOffer: '',
      value: '',
      deadline: ''
		}
    
    this.offers
      .where('job', '==', this.item.id)
      .where('email', '==', this.props.navigation.getParam('email')).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({myOffer: doc.id})
          this.setState({value: doc.data().value})
          this.setState({deadline: doc.data().deadline})
        })

      })
      .then()
  }

  


  render() {
    if(this.state.offer == false){

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
            
    			</ScrollView>
          <Layout style={[styles.button, {backgroundColor: '#47DA69'}]}>
            <TouchableOpacity 
              onPress={() => this.setState({offer: true})}
            >
              <FontAwesome 
                size={40}
                name={'usd'}
                color="white"
              />
            </TouchableOpacity>
          </Layout>
        </Layout>
      )
    }
    else{
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
            <Text style={styles.label}>Valor da Oferta</Text>
            <Input
              onChangeText={(text) => this.setState({value: text})} 
              value={this.state.value}
              keyboardType={'numeric'}
            />
            <Text style={styles.label}>Prazo</Text>
            <Input
              onChangeText={(text) => this.setState({deadline: text})} 
              value={this.state.deadline}
              keyboardType={'numeric'}
            />
            
          </ScrollView>
          <Layout style={[styles.button, {backgroundColor: '#47DA69'}]}>
            <TouchableOpacity 
              onPress={this.save.bind(this)}
            >
              <FontAwesome 
                size={40}
                name={'save'}
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
          <Layout style={[styles.button, {backgroundColor: '#4da6ff', bottom: 100}]}>
            <TouchableOpacity 
              onPress={() => this.setState({offer: false})}
            >
              <FontAwesome 
                size={40}
                name={'arrow-left'}
                color="white"
              />
            </TouchableOpacity>
          </Layout>
        </Layout>
      )
    }
	}

  delete = () => {
    Alert.alert(
      'Cancelar oferta',
      'Deseja realmente cancelar esta oferta?', [{
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () => {

            if(this.state.myOffer == ''){
              alert('Não há oferta para ser cancelada.');
            }
            else{
              this.offers.doc(this.state.myOffer).delete()
              .then(() => {
                alert('Oferta cancelada!')
                this.props.navigation.goBack()
              })
              .catch((err) => {
                alert('Erro ao cancelar oferta')
                console.log(err)
              })
            }
          }
      }, ], {
          cancelable: false
      }
    )
    return true;
  }

  save = () => {
    Alert.alert(
      'Enviar oferta',
      'Deseja realmente enviar esta oferta?', [{
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () => {

            if(this.state.myOffer == ''){
              this.offers.add({
                job: this.item.id,
                value: parseFloat(this.state.value.replace(',','.')).toFixed(2),
                deadline: this.state.deadline,
                email: this.state.email,
              })
              .then(() => {
                alert('Oferta enviada com sucesso!')
                this.props.navigation.goBack()
              })
              .catch((err) => {
                alert('Erro ao enviar oferta')
                console.log(err)
              })
            }
            else{
              this.offers.doc(this.state.myOffer).update({
                value: parseFloat(this.state.value.replace(',','.')).toFixed(2),
                deadline: this.state.deadline,
              })
              .then(() => {
                alert('Oferta atualizada!')
                this.props.navigation.goBack()
              })
              .catch((err) => {
                alert('Erro ao enviar oferta')
                console.log(err)
              })
            }
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
