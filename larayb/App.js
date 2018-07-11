import React from 'react';
import {
  createStackNavigator,
} from 'react-navigation';
import SignUp from './SignUp'
import SignIn from './SignIn'
import Home from './Home'
import Splash from './Splash'


const App = createStackNavigator({
  Splash: { screen: Splash },
  SignUp: { screen: SignUp },
  SignIn: { screen: SignIn },
  Home: { screen: Home },
});

export default App;
