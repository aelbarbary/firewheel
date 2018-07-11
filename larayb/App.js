import React from 'react';
import {
  createStackNavigator,
} from 'react-navigation';
import SignUp from './SignUp'
import SignIn from './SignIn'
import ProfileScreen from './Profile'
import Loading from './Loading'


const App = createStackNavigator({
  Loading: { screen: Loading },
  SignUp: { screen: SignUp },
  SignIn: { screen: SignIn },
  Profile: { screen: ProfileScreen },
});

export default App;
