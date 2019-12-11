import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import Login from '../screens/Login'
import Main from '../screens/Main'
import ForgotPassword from '../screens/ForgotPassword'
import First from '../screens/SignUp/First'
import Second from '../screens/SignUp/Second'
import Third from '../screens/SignUp/Third'
import Forth from '../screens/SignUp/Forth'
import Fifth from '../screens/SignUp/Fifth'
import Last from '../screens/SignUp/Last'

const AppNavigator = createStackNavigator(
	{
		Login: Login,
		ForgotPassword: ForgotPassword,
		Main: Main,
		SignUp: First,
		Second: Second,
		Third: Third,
		Forth: Forth,
		Fifth: Fifth,
		Last: Last
	},
  {
	initialRouteName: "Login",
	headerMode: 'none'
  }
)

export default createAppContainer(AppNavigator)