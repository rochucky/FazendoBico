import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import JobsInProgressScreen from '../screens/JobsInProgressScreen';
import JobsFreelancerInProgressScreen from '../screens/JobsFreelancerInProgressScreen';
import JobInProgressDescription from '../screens/JobInProgressDescription';
import Chat from '../screens/Chat';

const JobsInProgressNavigator = createStackNavigator(
	{
		JobsInProgressScreen: JobsInProgressScreen,
		JobsFreelancerInProgressScreen: JobsFreelancerInProgressScreen,
		JobDescription: JobInProgressDescription,
		Chat: Chat
	},
  {
		initialRouteName: "JobsInProgressScreen",
		defaultNavigationOptions: {
	    headerStyle: {
	      backgroundColor: '#1899DA',
	    },
	    headerTintColor: '#fff',
	  },
  }
);

export default createAppContainer(JobsInProgressNavigator);