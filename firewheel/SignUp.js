import React from 'react';
import {Button, StyleSheet, View, Text, Alert, Image} from 'react-native'
import t from 'tcomb-form-native';
import { Firebase, FirebaseRef } from './lib/firebase';
import ErrorMessages from './constants/errors';

const Form = t.form.Form;

var options = {
  fields: {
    password: {
      secureTextEntry: true
    }
  }
};

const User = t.struct({
  name: t.String,
  email: t.String,
  password: t.String,
});

class SignUp extends React.Component {
  state={
    errorMessage: ''
  }
  static navigationOptions = {
    title: 'Welcome',
  };

  handleSubmit = () => {
    const value = this._form.getValue();
    const {
      email,
      password,
      password2,
      firstName,
      lastName,
    } = value;


    Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          // Send user details to Firebase database
          if (res && res.uid) {
            FirebaseRef.child(`users/${res.uid}`).set({
              firstName,
              lastName,
              signedUp: Firebase.database.ServerValue.TIMESTAMP,
              lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
            }).then(() => statusMessage(dispatch, 'loading', false).then(resolve))
            ;
          }
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    ;

  }

  handleSignin = () => {
    this.props.navigation.navigate('SignIn')
  }


  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={require('./logo.png')} style={{width:100, height:100, }} />
          <Text>FireWheel</Text>
        </View>

        <Text style={{color:'red'}}>{this.state.errorMessage}</Text>
        <Text>{this.props.email} </Text>
        <Form type={User} ref={ c => this._form = c } options={options}/>
        <Button title="Create" onPress={this.handleSubmit}/>
        <Button title="I have an account already" onPress={this.handleSignin}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 0
  },
  logo:{
    alignItems: 'center',
    padding:10
  }
});


export default SignUp ;
