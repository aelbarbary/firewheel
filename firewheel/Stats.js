import React from 'react'
import PropTypes from 'prop-types'
import { View , StyleSheet, TextInput, Text, TouchableHighlight, ScrollView} from 'react-native'
import { Icon, Card, FormInput, FormLabel, FormValidationMessage, Button } from 'react-native-elements'
import { Firebase } from './lib/firebase'
import {connect} from 'react-redux'

class HabitHistory extends React.Component {


  constructor(props) {
    super(props);

  }

  componentDidMount(){

  }

  render () {
    const { navigation } = this.props;

    const habits = navigation.getParam('habits', 'NO-KEY');
    console.log("stats");
    console.log(habits);

    return <View style={styles.container}>

          {
            habits.length ? (
              habits.map((habit, i) => {
                return <View  key={i}  style={styles.stat}>
                      <Text style={styles.habitText}>{habit.name}</Text>
                      <Text style={styles.totalTimeText}>{habit.overallSpentMinutes}</Text>

                    </View>
              })
            ) : null
          }

    </View>
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column'
  },
  stat:{
    flex:1,
    flexDirection: 'row'
  },
  habitText:{
    flex:1,
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'gray',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1
  },
  totalTimeText:{
    flex:1,
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1
  }


});

function mapStateToProps(state){
  return{
    habitStats: state.habitStats
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitHistory);
