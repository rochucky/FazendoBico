import React from 'react';
import MainTabNavigator from '../navigation/MainTabNavigator';
import ClientTabNavigator from '../navigation/ClientTabNavigator';
import {YellowBox} from 'react-native';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

YellowBox.ignoreWarnings(['Setting a timer']);

export default class Main extends React.Component {

	static navigationOptions = {
		title: 'Application Name',
		headerLeft: null
	};

	constructor(props){
		super(props)
	}

	render(){

		const {navigation} = this.props;
		const usertype = navigation.getParam('type', 0);

		console.log(usertype);

		if(usertype == 'cliente'){
			return(
				<ClientTabNavigator screenProps={this.props.navigation}/>
			)	
		}
		if(usertype == 'freelancer'){
			return(
				<MainTabNavigator />
			);	
		}
	}
}