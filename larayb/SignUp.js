import React from 'react';
import {Button, StyleSheet, View, Text, Alert, Image} from 'react-native'
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
        <View style={styles.logo}>
          <Image source={require('./logo.png')} style={{width:100, height:100, }} />
          <Text>LARAYB</Text>
        </View>

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
  logo:{
    alignItems: 'center',
    padding:10
  }
});


export default SignUp ;
