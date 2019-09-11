import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import JobsScreen from '../screens/JobsScreen';
import NewJobScreen from '../screens/NewJobScreen';

const JobsNavigator = createStackNavigator(
	{
		JobsScreen: JobsScreen,
		NewJobScreen: NewJobScreen,
	},
  {
	initialRouteName: "JobsScreen"
  }
);

export default createAppContainer(JobsNavigator);