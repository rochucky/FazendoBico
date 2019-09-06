import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Main from '../screens/Main';
import ForgotPassword from '../screens/ForgotPassword';

const AppNavigator = createStackNavigator(
	{
		Login: Login,
		SignUp: SignUp,
		ForgotPassword: ForgotPassword,
		Main: Main
	},
  {
	initialRouteName: "Login",
	headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);