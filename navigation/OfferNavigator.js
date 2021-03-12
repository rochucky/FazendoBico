import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import OfferMenu from '../screens/offer/OfferMenu'


const OfferNavigator = createStackNavigator(
	{
		OfferMenu: OfferMenu,
	},
  {
		initialRouteName: "OfferMenu",
		defaultNavigationOptions: {
	    headerStyle: {
	      backgroundColor: '#1899DA',
	    },
	    headerTintColor: '#fff',
	  },
  }
);

export default createAppContainer(OfferNavigator);