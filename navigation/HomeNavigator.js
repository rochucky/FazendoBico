import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';


import HomeScreen from '../screens/HomeScreen'

const HomeNavigator = createStackNavigator(
	{
		HomeScreen: HomeScreen
	},
  {
		initialRouteName: "HomeScreen",
		defaultNavigationOptions: {
	    headerStyle: {
	      backgroundColor: '#1899DA',
	    },
	    headerTintColor: '#fff',
	  },
  }
);

export default createAppContainer(HomeNavigator);