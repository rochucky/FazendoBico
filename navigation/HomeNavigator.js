import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';


import HomeScreen from '../screens/HomeScreen'
import ProfileEdit from '../screens/ProfileEdit'

const HomeNavigator = createStackNavigator(
	{
		HomeScreen: HomeScreen,
		ProfileEdit: ProfileEdit
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