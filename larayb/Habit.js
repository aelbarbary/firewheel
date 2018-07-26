import React from 'react'
import PropTypes from 'prop-types'
import { View , StyleSheet, TextInput, Text} from 'react-native'
import { Icon, Card, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements'
import { Firebase } from './lib/firebase'
import {connect} from 'react-redux'
import { deleteHabitFromStore, editTimeInStore, editNameInStore } from './actions'

class Habit extends React.Component {

  constructor(props) {
    super(props);
  }
  deleteHabit(key){
    console.log("priting key");
    console.log(key);
    this.props.deleteHabit(key)
  }

  editName(key, newName){
    this.props.editName(key, newName);
  }

  editTime(key, newTime){
    this.props.editTime(key, newTime);
  }

  render () {
    console.log("prionting habit ptopert");
    console.log(this.props);
    const { habit } = this.props;
    const cardTitle = habit.name + ' | ' + habit.time + ' min';

    return <View>
      <Card >
        <View >
          <FormLabel>Name</FormLabel>
          <FormInput onChangeText={(text) => this.editName(habit.key, text)}>{habit.name}</FormInput>

          <FormLabel>Time</FormLabel>
          <FormInput onChangeText={(text) => this.editTime(habit.key, text)}>{habit.time}</FormInput>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.buttonContainer}>
            <Icon
              reverse
              name='close'
              type='font-awesome'
              color='#f50'
              onPress={() => this.deleteHabit(habit.key)}
              />
          </View>

          <View style={styles.buttonContainer}>
            <Icon
              reverse
              name='access-time'
              color='#f50'
              onPress={() => console.log('hello')}
              />
          </View>
        </View>
      </Card>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  habitInfo:{
    flex: 1,
    flexDirection: 'row'
  },
  textInput:{
    borderColor:'gray',
    borderWidth: 1,
    padding: 5,
    margin: 5
  }
});


function mapStateToProps(state){
  return{
  }
}

function mapDispatchToProps(dispatch){

  return {
    deleteHabit :  (key) =>  { dispatch(deleteHabitFromStore(key)) },
    editName :  (key, newName) =>  { dispatch(editNameInStore(key, newName)) },
    editTime :  (key, newTime) =>  { dispatch(editTimeInStore(key, newTime)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Habit);
