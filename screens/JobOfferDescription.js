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

export default class JobOfferDescription extends React.Component {
  static navigationOptions = {
    title: 'Detalhes'
  };

  constructor(props){
    super(props);

		this.offer = this.props.navigation.getParam('item');
    this.job = this.props.navigation.getParam('job');

  }

  render() {
    return (
      <Layout style={styles.container}>
        <ScrollView>
          <Layout style={styles.titleContainer}>
    				<Text
    					category='h3'
    				>{this.job.data.title}</Text>
    				<Text 
    					style={styles.value}
    					category='p2'
    				>{this.job.data.description}</Text>
          </Layout>
          <Layout style={styles.bodyContainer}>
            <Text style={styles.label}>Nome do Candidato</Text>
    				<Text style={styles.description}>{this.offer.data.name}</Text>
            <Text style={styles.label}>Valor do Bico</Text>
            <Text style={styles.description}>R$ {this.job.data.value}</Text>
            <Text style={styles.label}>Valor da Oferta</Text>
            <Text style={styles.description}>R$ {this.offer.data.value}</Text>
            <Text style={styles.label}>Avaliação do Candidato</Text>
            <Layout style={styles.rating}>
              <FontAwesome 
                size={34}
                name={'star'}
                color="#EBE300"
              />
              <FontAwesome 
                size={34}
                name={'star'}
                color="#EBE300"
              />
              <FontAwesome 
                size={34}
                name={'star-half-o'}
                color="#EBE300"
              />
              <FontAwesome 
                size={34}
                name={'star-o'}
                color="#EBE300"
              />
              <FontAwesome 
                size={34}
                name={'star-o'}
                color="#EBE300"
              />
            </Layout>
            <Text style={styles.description}></Text>
          </Layout>
          
  			</ScrollView>
        <Layout style={[styles.button, {backgroundColor: '#47DA69'}]}>
          <TouchableOpacity 
            onPress={this.accept.bind(this)}
          >
            <FontAwesome 
              size={40}
              name={'check'}
              color="white"
            />
          </TouchableOpacity>
          
        </Layout>
      </Layout>
    )
	}

  accept = () => {
    Alert.alert(
      'Aceitar',
      'Aceitar proposta?', [{
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () => {
            firebase.firestore().collection('jobs').doc(this.job.id)
              .set({
                freelancer: this.offer.data.email,
                freelancer_name: this.offer.data.name,
                freelancer_value: this.offer.data.value,
                freelancer_deadline: this.offer.data.deadline,
                status: 'Em Andamento'
              },{
                merge: true
              })
              .then(() => {
                alert('Bico aceito! Acompanhe o andamento do mesmo na aba "Em Andamento"');
                this.props.navigation.popToTop()
              })
              .catch((err) => {
                console.log(err);
                alert('Falha ao tentar aceitar proposta.');
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
    paddingTop: 10,
    fontSize: 24
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
  },
  rating: {
    paddingTop: 10,
    flex: 1,
    flexDirection: 'row'
  }
});
