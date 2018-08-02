import React from 'react'
import PropTypes from 'prop-types'
import { View , StyleSheet, TextInput, Text} from 'react-native'
import { Icon, Card, FormInput, FormLabel, FormValidationMessage, Button } from 'react-native-elements'
import { Firebase } from './lib/firebase'
import {connect} from 'react-redux'
import { deleteHabitFromStore, editTimeInStore, editNameInStore, logHabitInStore } from './actions'
import Modal from "react-native-modal";
import TimePicker from 'react-native-simple-time-picker';
import * as Progress from 'react-native-progress';

class Habit extends React.Component {
  state = {
    modalVisible: false,
    logDescription: ''
  };

  constructor(props) {
    super(props);

  }
  deleteHabit(key){
    this.props.deleteHabit(key)
  }

  editName(key, newName){
    this.props.editName(key, newName);
  }

  editTime(key, newTime){
    this.props.editTime(key, newTime);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  logHabit(key, hours, minutes){
      this.props.logHabit(key, hours, minutes, this.state.logDescription)
      this.setModalVisible(false);
  }


  render () {

    const { habit } = this.props;

    const { selectedHours, selectedMinutes } = this.state;
    return <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View >
          <FormLabel>Duration</FormLabel>
          <TimePicker
            selectedHours={selectedHours}
            selectedMinutes={selectedMinutes}
            onChange={(hours, minutes) => this.setState({ selectedHours: hours, selectedMinutes: minutes })}
            />

          <FormLabel>Description</FormLabel>
          <FormInput onChangeText={(text) => this.setState({logDescription : text}) }>

          </FormInput>

          <Button
            title="Save"
            onPress={() => this.logHabit(habit.key, this.state.selectedHours, this.state.selectedMinutes) }>
          </Button>
          <Button
            title="Cancel"
            onPress={() => this.setModalVisible(false) }>
          </Button>
        </View>
      </Modal>

      <Card>
        <Progress.Bar progress={habit.time == 0 ? 0 : habit.totalTime/habit.time}  width={300}  color={'gray'} />
        <View>
          <FormInput onChangeText={(text) => this.editName(habit.key, text)}>{habit.name}</FormInput>

          <FormLabel>Time</FormLabel>
          <FormInput onChangeText={(text) => this.editTime(habit.key, text)}>{habit.time}</FormInput>

        </View>

        <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.button}
              rightIcon={{name: 'access-time'}}
              title='Log' />

            <Button
              buttonStyle={styles.button}
              rightIcon={{name: 'close'}}
              title='Delete' />
        </View>

      </Card>
    </View>
  }
}

const styles = StyleSheet.create({

  colContainer: {
    flex: 1,
    flexDirection: 'column',

  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10
  },
  textInput:{
    borderColor:'gray',
    borderWidth: 1,
    padding: 5,
    margin: 5
  },
  button:{
    width:100
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
    logHabit: (key, hours, minutes, description) => { dispatch(logHabitInStore(key, hours, minutes, description)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Habit);
