import React from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import {
  Layout,
	Text,
	Input,
	Button
} from 'react-native-ui-kitten';
import * as firebase from 'firebase'
import firestore from 'firebase/firestore';

export default class NewJobScreen extends React.Component {
  static navigationOptions = {
    title: 'Novo Bico'
  };

  constructor(props){
    super(props);

    this.state = {
			title: '',
			description: '',
			value: '',
			email: ''
		}
		
		this.jobs = firebase.firestore().collection('jobs');
		AsyncStorage.getItem('email')
			.then((item) => {
				this.setState({email: item})
			})

  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
				<Input 
					label='Titulo'
          style={styles.input}
          onChangeText={(text) => this.setState({title: text})} 
          value={this.state.title}
					/>
				
				<Input 
					label="Descrição"
          style={styles.biginput}
          onChangeText={(text) => this.setState({description: text})} 
          value={this.state.description}
					multiline
        />

				<Input 
					label='Valor'
          style={styles.input}
          onChangeText={(text) => this.setState({value: text})} 
          value={this.state.value}
        />
        <Button 
          style={styles.button}
					title='Criar'
					onPress={this.createJob.bind(this)}
        >Criar</Button>
      </KeyboardAvoidingView>
    )
	}
	
	createJob = async () => {
		console.log(this.state.email);
		this.jobs.add({
			title: this.state.title,
			description: this.state.description,
			value: this.state.value,
			owner: this.state.email
		})
		.then(() => {
			alert('Bico criado com sucesso!')
			this.props.navigation.goBack();
		})
		.catch((err) => {
			alert('Erro ao criar Bico')
			console.log(err)
		})
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },  
  listItem: {
    paddingLeft: 10,
    borderBottomWidth: 1,
    paddingBottom: 10
    
  },
  listItemTitle: {
    paddingBottom: 5
  },

  headerText: {
    fontSize: 20
	}

});
