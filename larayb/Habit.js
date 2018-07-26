import React from 'react'
import PropTypes from 'prop-types'
import { View , StyleSheet, TextInput, Text, Button} from 'react-native'
import { Icon, Card, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements'
import { Firebase } from './lib/firebase'
import {connect} from 'react-redux'
import { deleteHabitFromStore, editTimeInStore, editNameInStore, logHabitInStore } from './actions'
import Modal from "react-native-modal";
import TimePicker from 'react-native-simple-time-picker';

class Habit extends React.Component {
  state = {
    modalVisible: false,
  };

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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  logHabit(key, hours, minutes){
      this.props.logHabit(key, hours, minutes)
      this.setModalVisible(false);
  }


  render () {
    console.log("prionting habit ptopert");
    console.log(this.props);
    const { habit } = this.props;
    const cardTitle = habit.name + ' | ' + habit.time + ' min';

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
         <TimePicker
           selectedHours={selectedHours}
           selectedMinutes={selectedMinutes}
           onChange={(hours, minutes) => this.setState({ selectedHours: hours, selectedMinutes: minutes })}
         />
       <Button title="Save" onPress={() => this.logHabit(habit.key, this.state.selectedHours, this.state.selectedMinutes) }></Button>
       </View>
      </Modal>

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
              onPress={() => this.setModalVisible(!this.state.modalVisible)}
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
    logHabit: (key, hours, minutes) => { dispatch(logHabitInStore(key, hours, minutes)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Habit);
