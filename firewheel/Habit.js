import React from 'react'
import PropTypes from 'prop-types'
import { View , StyleSheet, TextInput, Text, TouchableHighlight} from 'react-native'
import { Icon, Card, FormInput, FormLabel, FormValidationMessage, Button } from 'react-native-elements'
import { Firebase } from './lib/firebase'
import {connect} from 'react-redux'
import { deleteHabitFromStore, editHabitInStore, logHabitInStore } from './actions'
import Modal from "react-native-modal";
import TimePicker from 'react-native-simple-time-picker';
import * as Progress from 'react-native-progress';
import { Dimensions } from "react-native";
import t from 'tcomb-form-native';

const Form = t.form.Form;

const HabitModel = t.struct({
  name: t.String,
  time: t.Number
});

class Habit extends React.Component {
  state = {
    modalVisible: false,
    editHabitModalVisible : false,
    logDescription: '',
    habit: { name: this.props.habit.name, time: this.props.habit.time}
  };

  constructor(props) {
    super(props);

  }

  deleteHabit(key){
    this.props.deleteHabit(key)
  }

  editHabit(){
    const newValue = this._form.getValue();
    if (newValue) {

      this.props.editHabit(this.props.habit.key, newValue);
      this.setEditHabitModalVisible(false);
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setEditHabitModalVisible(visible) {
    this.setState({editHabitModalVisible: visible});
  }

  logHabit(key, hours, minutes){
      this.props.logHabit(key, hours, minutes, this.state.logDescription)
      this.setModalVisible(false);
  }

  changeHabit(value) {

      this.setState({habit: value});
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
          <Text style={{fontWeight: 'bold', fontSize: 30, textAlign: 'center',}}>Log Time</Text>
          <FormLabel>Duration (hours : minutes)</FormLabel>

          <TimePicker
            selectedHours={selectedHours}
            selectedMinutes={selectedMinutes}
            onChange={(hours, minutes) => this.setState({ selectedHours: hours, selectedMinutes: minutes })}
            />

          <FormLabel>Description</FormLabel>

          <View style={styles.textAreaContainer} >
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Type something"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
              onChangeText={(value) => this.setState({ logDescription: value })}
            />
          </View>

          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
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
        </View>
      </Modal>

      <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.editHabitModalVisible}
      onRequestClose={() => {
        alert('Modal has been closed.');
      }}>
      <View style={{marginTop: 22}}>
        <View>
          <Form type={HabitModel} ref={ c => this._form = c } value={this.props.habit} onChange={() => this.changeHabit }/>
          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <Button
              onPress={() => {
                this.editHabit();
              }}
              title='Save'
              style={styles.button}
              backgroundColor='green'>
            </Button>

            <Button
              onPress={() => {
                this.setEditHabitModalVisible(!this.state.editHabitModalVisible);
              }}
              title='Cancel'
              style={styles.button}
              backgroundColor='red'>
            </Button>
          </View>
        </View>
      </View>
    </Modal>

      <Card containerStyle={styles.cardStyle}>

        <Progress.Bar progress={habit.time == 0 ? 0 : habit.totalTime/habit.time}  color={'#243350'}  width={width-60}/>

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
          <View >
          <TouchableHighlight onPress={() => this.setModalVisible(!this.state.modalVisible)}>
            <Icon
              name='fire'
              type='simple-line-icon'
            />
          </TouchableHighlight>
          </View>

          <View >
          <TouchableHighlight onPress={() => this.props.navigation.navigate('HabitDailyLog', {
              habitKey: habit.key
              })}>
            <Icon
              name='list-ul'

              type='font-awesome'
            />
          </TouchableHighlight>
          </View>

          <View >
            <TouchableHighlight onPress={() => this.setEditHabitModalVisible(true)}>
              <Icon
                name='edit'
              />
            </TouchableHighlight>
          </View>

          <View >
            <TouchableHighlight onPress={() => this.deleteHabit(habit.key)}>
              <Icon
                name='delete'
              />
            </TouchableHighlight>
          </View>
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
  cardStyle:{
    backgroundColor: '#eeeeee'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    justifyContent:'space-between'
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
      borderRadius: 5,
      width: 100
  },
  habitText:{
    flex: 1,
    flexDirection: 'row',
    alignItems:'center' ,
    justifyContent:'center'
  },
  textAreaContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  }

});

function mapStateToProps(state){
  return{
  }
}

function mapDispatchToProps(dispatch){
  return {
    deleteHabit :  (key) =>  { dispatch(deleteHabitFromStore(key)) },
    editHabit :  (key, habitObject) =>  { dispatch(editHabitInStore(key, habitObject)) },
    logHabit: (key, hours, minutes, description) => { dispatch(logHabitInStore(key, hours, minutes, description)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Habit);
