import React from 'react';
import {Button, View, TouchableHighlight, Text, ScrollView} from 'react-native'
import { Card, ListItem, Icon } from 'react-native-elements'
import {Firebase} from './lib/firebase'
import { fetchHabitsFromStore, addHabitToStore, deleteHabitFromStore } from './actions'
import { connect } from 'react-redux'
import Modal from "react-native-modal";
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Habit = t.struct({
  name: t.String,
  time: t.Number
});

class Home extends React.Component {
  state = {
    modalVisible: false,
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
      console.log(value.name);
      this.props.addHabit(value.name, value.time)
      console.log("calling add habit");
      this.setModalVisible(!this.state.modalVisible);
    }
  }

  deleteHabit(key){
    this.props.deleteHabit(key)
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    console.log(this.props.habits);
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
          <Form type={Habit} ref={ c => this._form = c }/>
            <TouchableHighlight
              onPress={() => {
                this.addHabit();

              }}>
              <Text>Save</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <Text>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <Button title="log out"
        onPress={this.logout}/>

      <Button title="Add a habit"
          onPress={() => this.setModalVisible(true) }/>

      <ScrollView>
      {

          habits.length ? (
            habits.map((habit, i) => {
              return <View key={i} >
                        <Card title={habit.name}>

                          <Text style={{marginBottom: 10}}>
                            {habit.time}
                          </Text>

                          <Button
                            icon={
                              <Icon
                                name='close'
                                size={15}
                                color='white'
                              />
                            }
                            title='Delete'
                            onPress={ () => this.deleteHabit(habit.key) }
                          />

                        </Card>
                    </View>
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
    deleteHabit: (name) => dispatch(deleteHabitFromStore(name)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
