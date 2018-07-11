import React from 'react';
import {Button, View} from 'react-native'
import {Firebase} from './lib/firebase'

class Home extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  constructor(props) {
    super(props);
    this.navigateToSplashScreen = this.navigateToSplashScreen.bind(this);
  }

  navigateToSplashScreen(){
        this.props.navigation.navigate('Loading')

  }

  logout(navigation){
    Firebase.auth().signOut().then(this.navigateToSplashScreen, function(error) {
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
      <Button
        title="Hello"
        onPress={() =>
          navigate('Profile', { name: 'Jane' })
        }
      />

    <Button title="log out"
      onPress={this.logout}/>
    </View>
    );
  }
}

export default Home;
