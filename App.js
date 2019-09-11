import React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';
import AppNavigator from './navigation/AppNavigator';
import * as firebase from 'firebase';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Setting a timer']);

const firebaseConfig = {
    apiKey: "AIzaSyCexIdHYZJtx-yEcmuUTjCANQFNixUfd94",
    authDomain: "bicos-6a1f2.firebaseapp.com",
    databaseURL: "https://bicos-6a1f2.firebaseio.com",
    projectId: "bicos-6a1f2",
    storageBucket: "",
    messagingSenderId: "355946700353",
    appId: "1:355946700353:web:d9c15b38e81f433f4d70c0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const App = () => (
    <ApplicationProvider
        mapping={mapping}
        theme={lightTheme}>
        <AppNavigator />
    </ApplicationProvider>
);

export default App;