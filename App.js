import React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import AppNavigator from './navigation/AppNavigator';
import NavigationService from './navigation/NavigationService';
import * as firebase from 'firebase';
import {YellowBox} from 'react-native';



YellowBox.ignoreWarnings(['Setting a timer']);

const firebaseConfig = {
    apiKey: "",
    databaseURL: "",
    authDomain: "",
    projectId: "3",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const App = () => (
    <ApplicationProvider
        mapping={mapping}
        theme={lightTheme}>
        <AppNavigator ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}/>
    </ApplicationProvider>
);

export default App;
