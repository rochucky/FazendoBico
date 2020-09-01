import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import JobsFreelancerScreen from '../screens/JobsFreelancerScreen';
import JobFreelancerDescription from '../screens/JobFreelancerDescription';

const JobsNavigator = createStackNavigator(
	{
		JobsFreelancerScreen: JobsFreelancerScreen,
		JobFreelancerDescription: JobFreelancerDescription
	},
  {
		initialRouteName: "JobsFreelancerScreen",
		defaultNavigationOptions: {
	    headerStyle: {
	      backgroundColor: '#1899DA',
	    },
	    headerTintColor: '#fff',
	  },
  }
);

export default createAppContainer(JobsNavigator);