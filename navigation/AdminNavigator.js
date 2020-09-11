import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import MainMenu from '../screens/admin/MainMenu'
import ProfileEdit from '../screens/admin/ProfileEdit'
import Professions from '../screens/admin/Professions'


const AdminNavigator = createStackNavigator(
	{
		MainMenu: MainMenu,
    ProfileEdit: ProfileEdit,
		Professions: Professions
	},
  {
		initialRouteName: "MainMenu",
		defaultNavigationOptions: {
	    headerStyle: {
	      backgroundColor: '#1899DA',
	    },
	    headerTintColor: '#fff',
	  },
  }
);

export default createAppContainer(AdminNavigator);