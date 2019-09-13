import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import JobsScreen from '../screens/JobsScreen';
import NewJobScreen from '../screens/NewJobScreen';
import JobDescription from '../screens/JobDescription';

const JobsNavigator = createStackNavigator(
	{
		JobsScreen: JobsScreen,
		NewJobScreen: NewJobScreen,
		JobDescription: JobDescription
	},
  {
	initialRouteName: "JobsScreen"
  }
);

export default createAppContainer(JobsNavigator);