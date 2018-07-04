import React from 'react';
import {Button, StyleSheet, View, Text, Alert} from 'react-native'
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
  terms: t.Boolean
});

class SignUp extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };



  handleSubmit = () => {
    const value = this._form.getValue();
    console.log(value);
  }


  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>
        <Text>{this.props.emai} </Text>
        <Form type={User} ref={ c => this._form = c }/>
        <Button title="Sign up" onPress={this.handleSubmit}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});

export default SignUp ;
