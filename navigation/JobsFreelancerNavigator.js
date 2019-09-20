import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import JobsFreelancerScreen from '../screens/JobsFreelancerScreen';
import NewJobScreen from '../screens/NewJobScreen';
import EditJobScreen from '../screens/EditJobScreen';
import JobFreelancerDescription from '../screens/JobFreelancerDescription';

const JobsNavigator = createStackNavigator(
	{
		JobsFreelancerScreen: JobsFreelancerScreen,
		JobFreelancerDescription: JobFreelancerDescription
	},
  {
	initialRouteName: "JobsFreelancerScreen"
  }
);

export default createAppContainer(JobsNavigator);