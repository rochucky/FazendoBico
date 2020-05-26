import React from 'react';
import { View, Picker, StyleSheet, TextInput, Text } from 'react-native';
import Colors from '../constants/Colors'

export default class Select extends React.Component {
	
	constructor(props){
		super(props)

		this.customStyles = {}

		this.picker = React.createRef()
		this.showPicker = this.showPicker.bind(this)
		this.options = this.props.options

		this.color = this.props.color || Colors.mainColor
		this.width = this.props.width || '100%'
		this.textAlign = this.props.textAlign || 'left'
		this.type = this.props.type || 'default'
		this.secureText = this.props.secureTextEntry || false
		this.fontSize = this.props.fontSize || 20
		this.marginTop = this.props.marginTop || this.props.margin || 5
		this.marginBottom = this.props.marginBottom || this.props.margin || 5
		this.marginRight = this.props.marginRight || this.props.margin || 5
		this.marginLeft = this.props.marginLeft || this.props.margin || 5
		if(this.props.backgroundColor){
			this.customStyles.backgroundColor = this.props.backgroundColor
		}
	}

	showPicker() {
		this.picker.current.click();
	}

	render() {
		return(
			<View style={[styles.inputContainer,this.customStyles, {
				borderBottomColor: this.color,
				width: this.width,
				marginTop: this.marginTop,
				marginBottom: this.marginBottom,
				marginLeft: this.marginLeft,
				marginRight: this.marginRight
			}]}>
				<Text style={[styles.label,  {
					color: this.color
				}]}>
					Teste
				</Text>
				<TextInput
					style={[styles.input, {
						textAlign: this.textAlign,
						fontSize: this.fontSize,
						color: this.color,
					}]}
					keyboardType={this.type}
					placeholder={'Selecionar'}
					enabled={false}
		      		onChangeText={this.props.onChange} 
		      		value={this.props.value}
		      		secureTextEntry={this.secureText}
				/>
				<Picker
					selectedValue={this.props.value}
				  style={{
				  		position: 'absolute', 
				  		width: '200%', 
				  		left: '-100%'}}
				  onValueChange={this.props.onChange}>{
				  	this.options.map((option) => {
				  		<Picker.Item label={option.label} value={option.value} />
				  	})
				  }
				</Picker>
			</View>
		)

	}
}


const styles = StyleSheet.create({
	inputContainer: {
		borderBottomWidth: 2,
		
		padding: 5
	},
	input: {
		width: '100%',
	},
	label: {
		width: '100%'
	}
})