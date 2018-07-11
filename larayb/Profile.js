import React from 'react';
import {Button, View} from 'react-native'
import {Firebase} from './lib/firebase'

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(navigation){
    Firebase.auth().signOut().then(function() {
        this.props.navigation.navigate('Loading')
    }, function(error) {
    // An error happened.
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
