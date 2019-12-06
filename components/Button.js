import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors'

export default class Button extends React.Component {
	
	constructor(props){
		super(props)

		this.text = this.props.text
		this.fontColor = this.props.fontColor || 'white'
		this.backgroundColor = this.props.backgroundColor || Colors.mainColor
		this.width = this.props.width || '100%'
		this.fontSize = this.props.fontSize || 20
		this.marginTop = this.props.marginTop || this.props.margin || 5
		this.marginBottom = this.props.marginBottom || this.props.margin || 5
		this.marginRight = this.props.marginRight || this.props.margin || 0
		this.marginLeft = this.props.marginLeft || this.props.margin || 0
		this.bottom = this.props.bottom
	}

	render() {
		return(
			<View style={[styles.buttonContainer, {
				width: this.width,
				marginTop: this.marginTop,
				marginBottom: this.marginBottom,
				marginLeft: this.marginLeft,
				marginRight: this.marginRight,
				backgroundColor: this.backgroundColor,
				bottom: 0
			}]}>
				<TouchableOpacity
					style={[styles.button, {}]}
					onPress={this.props.onPress}
				>
				<Text style={[styles.buttonText, {
					color: this.fontColor
				}]}>
					{this.text.toUpperCase()}
				</Text>
				</TouchableOpacity>
			</View>
		)

	}
}


const styles = StyleSheet.create({
	buttonContainer: {
		height: 50,
		borderBottomWidth: 1.6,
		borderRightWidth: 1.6,
		borderColor: '#CCC'
	},
	button: {
		width: '100%',
		height: '100%',
		alignItems:'center',
    justifyContent:'center',
	},
	buttonText: {
		fontWeight: 'bold',
		fontSize: 20,
		letterSpacing: 1.4
	}
})