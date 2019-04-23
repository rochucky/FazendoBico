import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Login from '../screens/Login';
import SignIn from '../screens/SignIn';
import Main from '../screens/Main';

const AppNavigator = createStackNavigator(
	{
    Login: Login,
	  SignIn: {
	  	screen: SignIn,
	  	title: "Cadastro"
	  },
	  Main: Main
	},
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);