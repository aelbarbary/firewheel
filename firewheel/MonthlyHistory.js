import React from 'react'
import PropTypes from 'prop-types'
import { View , StyleSheet, TextInput, Text, TouchableHighlight, Image, ScrollView} from 'react-native'
import { Icon, Card, FormInput, FormLabel, FormValidationMessage, Button, List, ListItem, Avatar } from 'react-native-elements'
import { Firebase } from './lib/firebase'
import {connect} from 'react-redux'
import { deleteHabitFromStore, editTimeInStore, editNameInStore, logHabitInStore } from './actions'
import Modal from "react-native-modal";
import TimePicker from 'react-native-simple-time-picker';
import * as Progress from 'react-native-progress';
import { Dimensions } from "react-native";
import Moment from 'moment';
import Images from './img/index';
import AreaSpline from './charts/charts/AreaSpline';

class MonthlyHistory extends React.Component {

  state={
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getYear() + 1900
  }

  static navigationOptions = {
    title: 'Monthly History',
  };

  getDaysInMonth(month, year) {
     var date = new Date(year, month, 1);
     var days = [];
     var today = new Date().getDate();
     while (date.getMonth() === month ) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
     }
     return days;
  }

  prevMonth(currMonth){
    this.setState({currentMonth: this.state.currentMonth -1});
  }

  nextMonth(currMonth){
    this.setState({currentMonth: this.state.currentMonth +1});
  }

  getMonthName(monthNum){
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];


    return monthNames[monthNum];
  }

  render () {
    const height = 200;
    const width = 500;

    const { navigation } = this.props;

    const habits = navigation.getParam('habits', 'NO-KEY');

    scoreByDay = {}
    habitsTotalTime = 0;
    habits.forEach(function(habit){
      habitsTotalTime += habit.time;
    });

    this.getDaysInMonth(this.state.currentMonth,new Date().getYear() + 1900).forEach(function(ele){
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


   return (
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 30, textAlign: 'center',}}>{this.getMonthName(this.state.currentMonth)}, {this.state.currentYear}</Text>
        {/*<View style={{flexDirection: 'row', justifyContent:'space-between', marginTop:10}}>
        <Button
            icon={{
              name: 'arrow-bold-left',
              size: 15,
              color: 'white',
              type:'entypo'

            }}
            title='Prev Month'
            onPress={()=> this.prevMonth(this.state.currentMonth)}
            />

            <Button
                icon={{
                  name: 'arrow-bold-right',
                  size: 15,
                  color: 'white',
                  type:'entypo'

                }}
                title='Next Month'
                onPress={()=> this.nextMonth(this.state.currentMonth)}
                />
        </View>/*}
        {/*}<AreaSpline
          width={width}
          height={height}
          data={this.state.spendingsPerYear}
          color={Theme.colors[this.state.activeIndex]} /> */}

        <ScrollView style={{margin:0, padding:0, flex: 10}}>
        <List containerStyle={{marginBottom: 20}}>
        {

               Object.keys(scoreByDay).map((key, index) => (
                 <ListItem
                   roundAvatar
                   avatar={
                     <Avatar rounded medium
                        source={scoreByDay[key]["score"] >= 5 ? Images.image5 :
                                scoreByDay[key]["score"]  == 4 ? Images.image4  :
                                scoreByDay[key]["score"]  == 3 ? Images.image3  :
                                scoreByDay[key]["score"]  ==  2 ? Images.image2 :
                                scoreByDay[key]["score"]  ==  1 ? Images. image1 :
                                Images.image0} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyHistory);
