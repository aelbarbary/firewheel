import React from 'react'
import PropTypes from 'prop-types'
import { View , StyleSheet, TextInput, Text, TouchableHighlight} from 'react-native'
import { Icon, Card, FormInput, FormLabel, FormValidationMessage, Button } from 'react-native-elements'
import { Firebase } from './lib/firebase'
import {connect} from 'react-redux'
import { deleteHabitFromStore, editTimeInStore, editNameInStore, logHabitInStore } from './actions'
import Modal from "react-native-modal";
import TimePicker from 'react-native-simple-time-picker';
import * as Progress from 'react-native-progress';
import { Dimensions } from "react-native";

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
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    return <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View>
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
            onPress={() => this.logHabit(habit.key, this.state.selectedHours, this.state.selectedMinutes) }
            style={styles.button}>
          </Button>
          <Button
            title="Cancel"
            onPress={() => this.setModalVisible(false)
             }
             style={styles.button}>
          </Button>
        </View>
      </Modal>

      <Card style={{padding:0}}>

        <Progress.Bar progress={habit.time == 0 ? 0 : habit.totalTime/habit.time}  color={'gray'}  width={width-60}/>

        <View>
          {/*
          <FormInput onChangeText={(text) => this.editName(habit.key, text)}>{habit.name}</FormInput>

          <FormLabel>Time</FormLabel>
          <FormInput onChangeText={(text) => this.editTime(habit.key, text)}>{habit.time}</FormInput>
          */}
          <View style={styles.habitText}>
            <Text style={{fontSize:20, fontWeight: 'bold'}}>{habit.name}</Text>
            <Text style={{fontSize:20, color:'red'}}> for </Text>
            <Text style={{fontSize:20, }}>{habit.time} minutes</Text>
          </View>

        </View>

        <View style={styles.buttonContainer}>

          <TouchableHighlight onPress={() => this.setModalVisible(!this.state.modalVisible)}>
            <Icon
              name='access-time'
            />
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.props.navigation.navigate('HabitHistory', {
              habitKey: habit.key
              })}>
            <Icon
              name='edit'
            />
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.deleteHabit(habit.key)}>
            <Icon
              name='delete'
            />
          </TouchableHighlight>

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
    marginTop: 0
  },
  textInput:{
    borderColor:'gray',
    borderWidth: 1,
    padding: 5,
    margin: 5
  },
  button:{
      padding: 5,
      borderWidth: 0,
      borderRadius: 5
  },
  habitText:{
    flex: 1,
    flexDirection: 'row',
    alignItems:'center' ,
    justifyContent:'center'
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
