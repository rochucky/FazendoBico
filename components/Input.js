import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/Colors'

export default class Input extends React.Component {
	
	constructor(props){
		super(props)

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
	}

	render() {
		return(
			<View style={[styles.inputContainer, {
				borderBottomColor: this.color,
				width: this.width,
				marginTop: this.marginTop,
				marginBottom: this.marginBottom,
				marginLeft: this.marginLeft,
				marginRight: this.marginRight
			}]}>
				<TextInput
					style={[styles.input, {
						textAlign: this.textAlign,
						fontSize: this.fontSize,
						color: this.color,
						keyboardType: this.type
					}]}
					placeholder={this.props.placeholder}
		      onChangeText={this.props.onChange} 
		      value={this.props.value}
		      secureTextEntry={this.secureText}
				/>
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
	}
})