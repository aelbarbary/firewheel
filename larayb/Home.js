import React from 'react';
import {Button, View} from 'react-native'
import {Firebase} from './lib/firebase'

class Home extends React.Component {
  static navigationOptions  = ({navigation}) => ({
         title: navigation.state.params && navigation.state.params.title
  });

  constructor(props) {
    super(props);
    this.props.navigation.setParams({title: Firebase.auth().currentUser.email});
    console.log(Firebase.auth().currentUser.email);
    this.navigateToSplashScreen = this.navigateToSplashScreen.bind(this);
  }

  navigateToSplashScreen(){
        this.props.navigation.navigate('Loading')

  }

  logout(navigation){
    Firebase.auth().signOut().then(this.navigateToSplashScreen, function(error) {
    });
  }

  addGoal(){

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
      <Button
        title="Add a daily goal"
        onPress={this.addGoal}
      />

    <Button title="log out"
      onPress={this.logout}/>
    </View>
    );
  }
}

export default Home;
