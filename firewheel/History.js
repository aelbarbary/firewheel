import React from 'react'
import PropTypes from 'prop-types'
import { View , StyleSheet, TextInput, Text, TouchableHighlight, Image, ScrollView} from 'react-native'
import { Icon, Card, FormInput, FormLabel, FormValidationMessage, Button } from 'react-native-elements'
import { Firebase } from './lib/firebase'
import {connect} from 'react-redux'
import { deleteHabitFromStore, editTimeInStore, editNameInStore, logHabitInStore } from './actions'
import Modal from "react-native-modal";
import TimePicker from 'react-native-simple-time-picker';
import * as Progress from 'react-native-progress';
import { Dimensions } from "react-native";
import Moment from 'moment';
import Images from './img/index';

class History extends React.Component {



  getDaysInMonth(month, year) {
     var date = new Date(year, month, 1);
     var days = [];
     while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
     }
     return days;
}

  render () {

    const { navigation } = this.props;

    const habits = navigation.getParam('habits', 'NO-KEY');

    scoreByDay = {}
    habitsTotalTime = 0;
    habits.forEach(function(habit){
      habitsTotalTime += habit.time;
    });
    this.getDaysInMonth(7,2018).forEach(function(ele){
      habits.forEach(function(habit){

          for (var key in habit.logs){
            if (key == Moment(ele).format('YYYY-MM-DD').substring(0,10)){
                for (var logKey in habit.logs[key]){
                  var logEntry = habit.logs[key][logKey]
                  if (key in scoreByDay){
                    scoreByDay[key]["time"] += logEntry.minutes + logEntry.hours * 60;
                  }
                  else{
                    scoreByDay[key] = { time: logEntry.minutes + logEntry.hours * 60, expectedTime: habitsTotalTime} ;
                  }
                }
            }
          }
      });

    });

    for( var key in scoreByDay){
      scoreByDay[key]["score"] = Math.round((scoreByDay[key]["time"] / scoreByDay[key]["expectedTime"]) * 5);
    };
    console.log(scoreByDay);

   return (
      <View style={styles.container}>
      <View style={{flex:0, flexDirection: 'row', justifyContent: 'space-between', padding:20}} key={key}>
        <Text style={styles.header}>Day</Text>
        <Text style={styles.header}> Total Time</Text>
        <Text style={styles.header}>Mode</Text>
      </View>
        <ScrollView style={{margin:0, padding:0, flex: 10}}>
        {

               Object.keys(scoreByDay).map((key, index) => (
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', padding: 20}} key={key}>
                  <Text> {key}</Text>
                  <Text> {scoreByDay[key]["time"]}</Text>
                  <Image style={styles.avatar}
                    source={ scoreByDay[key]["score"] >= 5 ? Images.image5 :
                            scoreByDay[key]["score"]  == 4 ? Images.image4  :
                            scoreByDay[key]["score"]  == 3 ? Images.image3  :
                            scoreByDay[key]["score"]  ==  2 ? Images.image2 :
                            scoreByDay[key]["score"]  ==  1 ? Images.image1 :
                            Images.image0}/>
                </View>
              ))
        }
        </ScrollView>
      </View>
   )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 6,
    flex: 1
  },
  header:{
    fontWeight: 'bold'
  },
  avatar:{
    width: 20,
    height:20
  }

})


function mapStateToProps(state){
  return{
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
