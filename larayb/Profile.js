import React from 'react';
import {Button, View} from 'react-native'
import {Firebase} from './lib/firebase'

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  constructor(props) {
    super(props);
    this.navigateToHome = this.navigateToHome.bind(this);
  }

  navigateToHome(){
        this.props.navigation.navigate('Loading')

  }

  logout(navigation){
    Firebase.auth().signOut().then(this.navigateToHome, function(error) {
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

export default ProfileScreen;
