import React from 'react';
import { View, TouchableHighlight, Text, ScrollView, StyleSheet} from 'react-native'
import { Button, Card, ListItem, Icon } from 'react-native-elements'
import {Firebase} from './lib/firebase'
import { fetchHabitsFromStore, addHabitToStore } from './actions'
import { connect } from 'react-redux'
import Modal from "react-native-modal";
import t from 'tcomb-form-native';
import Habit  from './Habit'

const Form = t.form.Form;

const HabitModel = t.struct({
  name: t.String,
  time: t.Number
});

class Home extends React.Component {
  state = {
    modalVisible: false,
    isEditing: false
  };

  static navigationOptions  = ({navigation}) => ({
         title: navigation.state.params && navigation.state.params.title
  });

  constructor(props) {
    super(props);
    this.props.navigation.setParams({title: Firebase.auth().currentUser.email});
    this.navigateToSplashScreen = this.navigateToSplashScreen.bind(this);
  }

  navigateToSplashScreen(){
        this.forceUpdate();
        this.props.navigation.navigate('Loading')
  }

  logout(navigation){
    Firebase.auth().signOut().then(this.navigateToSplashScreen, function(error) {
    });
  }

  componentDidMount(){
    this.props.getHabits()
  }

  addHabit(){
    const value = this._form.getValue();
    if (value) {
      this.props.addHabit(value.name, value.time)
      this.setModalVisible(!this.state.modalVisible);
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const { navigate } = this.props.navigation;
    const { habits } = this.props.habits;

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Form type={HabitModel} ref={ c => this._form = c }/>
              <TouchableHighlight
                onPress={() => {
                  this.addHabit();
                }}>
                <Text>Save</Text>
              </TouchableHighlight>
              <Text>
                {this.state.isEditing.toString()}
              </Text>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <Button
          title="log out"
          onPress={this.logout}/>

        <Button
          title="Add a habit"
          onPress={() => {
            this.setState({isEditing: false});
            this.setModalVisible(true);

          } }/>
        <ScrollView>
            {
              habits.length ? (
                habits.map((habit, i) => {
                  return <Habit key={habit.key} habit={habit}/>
                })
              ) : null

            }
          </ScrollView>
      </View>
    );
  }
}

function mapStateToProps (state) {
  return {
    habits: state.habits
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getHabits: () => dispatch(fetchHabitsFromStore()),
    addHabit: (name, time) => dispatch(addHabitToStore(name, time)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
