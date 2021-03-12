import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import FindMenu from '../screens/find/FindMenu';
import ServiceScreen from '../screens/find/Services';
import Service from '../screens/find/Service';
import NewService from '../screens/find/NewService';




const FindNavigator = createStackNavigator(
	{
		FindMenu: FindMenu,
		ServiceScreen: ServiceScreen,
		NewService: NewService,
		Service: Service
	},
  {
		initialRouteName: "FindMenu",
		defaultNavigationOptions: {
	    headerStyle: {
	      backgroundColor: '#1899DA',
	    },
	    headerTintColor: '#fff',
	  },
  }
);

export default createAppContainer(FindNavigator);