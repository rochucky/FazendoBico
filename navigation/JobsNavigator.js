import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import JobsScreen from '../screens/JobsScreen';
import JobOffersScreen from '../screens/JobOffersScreen';
import NewJobScreen from '../screens/NewJobScreen';
import EditJobScreen from '../screens/EditJobScreen';
import JobDescription from '../screens/JobDescription';
import JobOfferDescription from '../screens/JobOfferDescription';

const JobsNavigator = createStackNavigator(
	{
		JobsScreen: JobsScreen,
		JobOffersScreen: JobOffersScreen,
		NewJobScreen: NewJobScreen,
		EditJobScreen: EditJobScreen,
		JobDescription: JobDescription,
		JobOfferDescription: JobOfferDescription
	},
  {
	initialRouteName: "JobsScreen"
  }
);

export default createAppContainer(JobsNavigator);