import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import JobsNavigator from './JobsNavigator';
import JobsInProgressNavigator from './JobsInProgressNavigator';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
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
  Jobs: JobsNavigator,
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
  JobsInProgress: JobsInProgressNavigator,
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

const Tabs = createBottomTabNavigator({
  HomeStack,
  JobsStack,
  JobsInProgressStack,
});

export default createAppContainer(Tabs);

