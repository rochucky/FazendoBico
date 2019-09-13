import React from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView, AsyncStorage, Picker, View, Platform, Keyboard, Dimensions } from 'react-native';
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
			email: '',
			address: '',
			number: '',
			neighborhood: '',
			city: '',
			state: '',
			padding: 0
		}
		
		this.jobs = firebase.firestore().collection('jobs');
		AsyncStorage.getItem('email')
			.then((item) => {
				this.setState({email: item})
			})

  }

  render() {
    return (
				<KeyboardAvoidingView 
					style={[styles.container, {paddingBottom: this.state.padding}]}
					enabled
				>
					<ScrollView>

						<Text
							style={styles.label}
							category='p2'
						>Preciso de um:
						</Text>
						<View style={styles.pickerContainer}>
							<Picker
								style={styles.picker}
								selectedValue={this.state.title}
								onValueChange={(itemValue, itemIndex) =>
									this.setState({title: itemValue})
								}>
								<Picker.Item label="" value="" />
								<Picker.Item label="Pedreiro" value="pedreiro" />
								<Picker.Item label="Pintor" value="pintor" />
							</Picker>
						</View>
						
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
						<Input 
							label='Endereço'
							style={styles.input}
							onChangeText={(text) => this.setState({address: text})} 
							value={this.state.address}
						/>
						<Input 
							label='Numero'
							style={styles.input}
							onChangeText={(text) => this.setState({number: text})} 
							value={this.state.number}
						/>
						<Input 
							label='Bairro'
							style={styles.input}
							onChangeText={(text) => this.setState({neighborhood: text})} 
							value={this.state.neighborhood}
						/>
						<Text
							style={styles.label}
							category='p2'
						>PEstado:
						</Text>
						<View style={styles.pickerContainer}>
							<Picker
								style={styles.picker}
								selectedValue={this.state.state}
								onValueChange={(itemValue, itemIndex) =>
									this.setState({state: itemValue})
								}>
								<Picker.Item label="" value="" />
								<Picker.Item label="AC" value="AC" />
								<Picker.Item label="AL" value="AL" />
								<Picker.Item label="AP" value="AP" />
								<Picker.Item label="AM" value="AM" />
								<Picker.Item label="BA" value="BA" />
								<Picker.Item label="CE" value="CE" />
								<Picker.Item label="DF" value="DF" />
								<Picker.Item label="ES" value="ES" />
								<Picker.Item label="GO" value="GO" />
								<Picker.Item label="MA" value="MA" />
								<Picker.Item label="MT" value="MT" />
								<Picker.Item label="MS" value="MS" />
								<Picker.Item label="MG" value="MG" />
								<Picker.Item label="PA" value="PA" />
								<Picker.Item label="PB" value="PB" />
								<Picker.Item label="PR" value="PR" />
								<Picker.Item label="PE" value="PE" />
								<Picker.Item label="PI" value="PI" />
								<Picker.Item label="RJ" value="RJ" />
								<Picker.Item label="RN" value="RN" />
								<Picker.Item label="RS" value="RS" />
								<Picker.Item label="RO" value="RO" />
								<Picker.Item label="RR" value="RR" />
								<Picker.Item label="SC" value="SC" />
								<Picker.Item label="SP" value="SP" />
								<Picker.Item label="SE" value="SE" />
								<Picker.Item label="TO" value="TO" />
							</Picker>
						</View>
						<Input 
							label='Cidade'
							style={styles.input}
							onChangeText={(text) => this.setState({city: text})} 
							value={this.state.city}
						/>
						<Button 
							style={styles.button}
							title='Criar'
							onPress={this.createJob.bind(this)}
						>Criar</Button>
					</ScrollView>
				</KeyboardAvoidingView>
			
    )
	}
	
	keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',(e) => {
		this.setState({padding: e.endCoordinates.height + 30})
	});
	keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',() => {
		this.setState({padding: 0})
	});
	
	createJob = async () => {
		
		if(this.state.title == '' || 
			this.state.description == '' || 
			this.state.city == '' || 
			this.state.state == '' || 
			this.state.address == '' || 
			this.state.number == '' || 
			this.state.neighborhood == '' || 
			this.state.value == ''
		){
			alert('Todos os campos são obrigatórios');
			return false;
		}

		this.jobs.add({
			title: this.state.title,
			description: this.state.description,
			value: this.state.value,
			city: this.state.city,
			state: this.state.state,
			address: this.state.address,
			number: this.state.number,
			neighborhood: this.state.neighborhood,
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
	pickerContainer: {
		width: '100%',
		backgroundColor: '#f7f9fc',
		borderColor: '#edf1f7',
		borderWidth: 1,
		borderRadius: 5
	},
	picker: {
		width: '100%'
	},
	label: {
		color: '#8f9bb3',
		marginBottom: 5
	}

});
