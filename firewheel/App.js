import React from 'react';
import {
  createStackNavigator,
} from 'react-navigation';
import SignUp from './SignUp'
import SignIn from './SignIn'
import Home from './Home'
import Splash from './Splash'
import HabitHistory from './HabitHistory'
import History from './History'
import Stats from './Stats'
import {Provider} from 'react-redux'
import configureStore from './ConfigureStore'

const RootStack = createStackNavigator({
  Splash: { screen: Splash },
  SignUp: { screen: SignUp },
  SignIn: { screen: SignIn },
  Home: { screen: Home },
  HabitHistory: {screen: HabitHistory},
  History: {screen: History},
  Stats: {screen: Stats},
});

const store  = configureStore()

export default class APP extends React.Component{
  render(){
    return  <Provider store={store}>
                <RootStack/>
            </Provider>
  }
}