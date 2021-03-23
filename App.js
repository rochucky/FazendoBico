import React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import AppNavigator from './navigation/AppNavigator';
import NavigationService from './navigation/NavigationService';
import * as firebase from 'firebase';
import {YellowBox} from 'react-native';



YellowBox.ignoreWarnings(['Setting a timer']);

const firebaseConfig = {
    apiKey: "AIzaSyDiT8YtegjnnksnNLhMIOPATE2A9r2EOaA",
    databaseURL: "https://procurase-bc443.firebaseio.com",
    authDomain: "procurase-bc443.firebaseapp.com",
    projectId: "procurase-bc443",
    storageBucket: "procurase-bc443.appspot.com",
    messagingSenderId: "34580308812",
    appId: "1:34580308812:web:c3f32d6733edea727225e9",
    measurementId: "G-7G14DVM0DV"
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