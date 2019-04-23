import React from 'react';
import MainTabNavigator from '../navigation/MainTabNavigator';
import ClientTabNavigator from '../navigation/ClientTabNavigator';
import {View} from 'react-native';

export default class Main extends React.Component {

	static navigationOptions = {
		title: 'Application Name',
		headerLeft: null
	};

	render(){

		const {navigation} = this.props;
		const usertype = navigation.getParam('usertype', 0);

		if(usertype == 1){
			return(
					<ClientTabNavigator />
			);	
		}
		if(usertype == 2){
			return(
					<MainTabNavigator />
			);	
		}
	}
}