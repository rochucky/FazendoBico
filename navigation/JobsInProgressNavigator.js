import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import JobsInProgressScreen from '../screens/JobsInProgressScreen';
import JobInProgressDescription from '../screens/JobInProgressDescription';

const JobsInProgressNavigator = createStackNavigator(
	{
		JobsInProgressScreen: JobsInProgressScreen,
		JobDescription: JobInProgressDescription
	},
  {
	initialRouteName: "JobsInProgressScreen"
  }
);

export default createAppContainer(JobsInProgressNavigator);