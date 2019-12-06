import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import JobsFreelancerInProgressScreen from '../screens/JobsFreelancerInProgressScreen';
import JobFreelancerInProgressDescription from '../screens/JobFreelancerInProgressDescription';
import Chat from '../screens/Chat';

const JobsInProgressNavigator = createStackNavigator(
	{
		JobsInProgressScreen: JobsFreelancerInProgressScreen,
		JobDescription: JobFreelancerInProgressDescription,
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