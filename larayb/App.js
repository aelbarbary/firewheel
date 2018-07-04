import React from 'react';
import {
  createStackNavigator,
} from 'react-navigation';
import SignUp from './SignUp'
import ProfileScreen from './Profile'


const App = createStackNavigator({
  SignUp: { screen: SignUp },
  Profile: { screen: ProfileScreen },
});

export default App;
