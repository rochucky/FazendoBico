import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import HomeNavigator from './HomeNavigator';
import JobsFreelancerNavigator from './JobsFreelancerNavigator';
import JobsFreelancerInProgressNavigator from './JobsFreelancerInProgressNavigator';
import AdminNavigator from './AdminNavigator';

const HomeStack = createStackNavigator({
  Home: HomeNavigator
},{
  headerMode: 'none'
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <FontAwesome 
      size={32}
      name={'home'}
      color={focused ? "#1899DA" : 'grey'}
    />
  ),
  tabBarOptions: { activeTintColor:'#1899DA' }
};

const JobsStack = createStackNavigator({
  Jobs: JobsFreelancerNavigator,
},{
  headerMode: 'none'
});

JobsStack.navigationOptions = {
  tabBarLabel: 'Abertos',
  tabBarIcon: ({ focused }) => (
    <FontAwesome 
      size={32}
      name={'folder-open-o'}
      color={focused ? "#1899DA" : 'grey'}
    />
  ),
  tabBarOptions: { activeTintColor:'#1899DA' }

};

const JobsInProgressStack = createStackNavigator({
  JobsInProgress: JobsFreelancerInProgressNavigator,
},{
  headerMode: 'none'
});

JobsInProgressStack.navigationOptions = {
  tabBarLabel: 'Em Andamento',
  tabBarIcon: ({ focused }) => (
    <FontAwesome 
      size={32}
      name={'road'}
      color={focused ? "#1899DA" : 'grey'}
    />
  ),
  tabBarOptions: { activeTintColor:'#1899DA' }
};

const AdminStack = createStackNavigator({
  Admin: AdminNavigator,
},{
  headerMode: 'none'
});

AdminStack.navigationOptions = {
  tabBarLabel: 'Admin',
  tabBarIcon: ({ focused }) => (
    <FontAwesome 
      size={32}
      name={'users'}
      color={focused ? "#1899DA" : 'grey'}
    />
  ),
  tabBarOptions: { activeTintColor:'#1899DA' }
};

const Tabs = createBottomTabNavigator({
  HomeStack,
  JobsStack,
  JobsInProgressStack,
  AdminStack
});

export default createAppContainer(Tabs);

