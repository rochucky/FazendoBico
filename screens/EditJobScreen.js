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

export default class EditJobScreen extends React.Component {
  static navigationOptions = {
    title: 'Editar Bico'
  };

  constructor(props){
    super(props);
		
		this.item = this.props.navigation.getParam('item');

    this.state = {
			title: this.item.data.title,
			description: this.item.data.description,
			value: this.item.data.value,
			email: this.item.data.email,
			address: this.item.data.address,
			number: this.item.data.number,
			neighborhood: this.item.data.neighborhood,
			city: this.item.data.city,
			state: this.item.data.state,
			zipcode: this.item.data.zipcode,
			padding: 0
		}
		
		this.job = firebase.firestore().collection('jobs').doc(this.item.id);

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
								<Picker.Item label="Pedreiro" value="Pedreiro" />
								<Picker.Item label="Pintor" value="Pintor" />
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
							onChangeText={(text) => {
								this.setState({value: text})
							}} 
							value={this.state.value}
							keyboardType={'numeric'}
						/>
						<Input 
							label='CEP'
							style={styles.input}
							onChangeText={(text) => this.setState({zipcode: text})} 
							value={this.state.zipcode}
							keyboardType={'numeric'}
							maxLength={8}
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
						>Estado:
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
							title='Gravar'
							onPress={this.updateJob.bind(this)}
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
	
	updateJob = async () => {
		
		if(this.state.title == '' || 
			this.state.description == '' || 
			this.state.city == '' || 
			this.state.state == '' || 
			this.state.address == '' || 
			this.state.number == '' || 
			this.state.neighborhood == '' || 
			this.state.zipcode == '' || 
			this.state.value == ''
		){
			alert('Todos os campos são obrigatórios');
			return false;
		}

		this.job.update({
			title: this.state.title,
			description: this.state.description,
			value: text = parseFloat(this.state.value.replace(',','.')).toFixed(2),
			city: this.state.city,
			state: this.state.state,
			address: this.state.address,
			number: this.state.number,
			neighborhood: this.state.neighborhood,
			zipcode: this.state.zipcode
		})
		.then(() => {
			alert('Bico atualizado com sucesso!')
			this.props.navigation.goBack();
		})
		.catch((err) => {
			alert('Erro ao atualizar Bico')
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
