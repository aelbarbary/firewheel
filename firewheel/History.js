import React from 'react'
import PropTypes from 'prop-types'
import { View , StyleSheet, TextInput, Text, TouchableHighlight, Image, ScrollView} from 'react-native'
import { Icon, Card, FormInput, FormLabel, FormValidationMessage, Button, List, ListItem } from 'react-native-elements'
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
    this.getDaysInMonth(new Date().getMonth(),new Date().getYear() + 1900).forEach(function(ele){
      var today = Moment(ele).format('YYYY-MM-DD').substring(0,10);
      scoreByDay[today] = {
        time: 0,
        expectedTime: habitsTotalTime
      }
      habits.forEach(function(habit){
          for (var day in habit.logs){
            if (day == today){
                for (var logKey in habit.logs[day]){
                  var logEntry = habit.logs[day][logKey]
                  scoreByDay[day]["time"] += logEntry.minutes + logEntry.hours * 60;
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

        <ScrollView style={{margin:0, padding:0, flex: 10}}>
        <List containerStyle={{marginBottom: 20}}>
        {

               Object.keys(scoreByDay).map((key, index) => (
                 <ListItem
                   roundAvatar
                   avatar={
                     scoreByDay[key]["score"] >= 5 ? Images.image5 :
                             scoreByDay[key]["score"]  == 4 ? Images.image4  :
                             scoreByDay[key]["score"]  == 3 ? Images.image3  :
                             scoreByDay[key]["score"]  ==  2 ? Images.image2 :
                             scoreByDay[key]["score"]  ==  1 ? Images.image1 :
                             Images.image0
                   }
                   key={index}
                   title= {`${key}: Time Spent ${scoreByDay[key]["time"]}`}
                 />
              ))
        }
        </List>
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
    height:20,
    backgroundColor: 'white'
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
