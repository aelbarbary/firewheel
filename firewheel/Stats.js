// @flow
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import AreaSpline from './charts/charts/AreaSpline';
import Pie from './charts/charts/Pie';
import Theme from './charts/theme';
import data from './resources/data';

type State = {
  activeIndex: number,
  spendingsPerYear: any
}

export default class Stats extends Component {

  static navigationOptions = {
    title: 'Statistics',
  };

  state: State;

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      spendingsPerYear: data.spendingsPerYear,
    };
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
    this._shuffle = this._shuffle.bind(this);
  }

  _onPieItemSelected(newIndex){
    this.setState({...this.state, activeIndex: newIndex, spendingsPerYear: this._shuffle(data.spendingsPerYear)});
  }

  _shuffle(a) {
      for (let i = a.length; i; i--) {
          let j = Math.floor(Math.random() * i);
          [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
      return a;
  }

  render() {
    const { navigation } = this.props;

    const habits = navigation.getParam('habits', 'NO-KEY');

    const height = 200;
    const width = 500;
    var habitsTotalTime = [];
    var totalHabitTimeInMin = 0;

    habits.map((habit, i) => {
        totalHabitTimeInMin += habit.overallSpentMinutes;
    });

    habits.map((habit, i) => {

        habitsTotalTime.push( { "name": habit.name, "number": Math.round(habit.overallSpentMinutes/totalHabitTimeInMin * 100)  } );
    });

    console.log(habitsTotalTime);
    return (
      <ScrollView>
        <View style={styles.container} >
          <Text style={styles.chart_title}>Time spent</Text>
          <Pie
            pieWidth={150}
            pieHeight={150}
            onItemSelected={this._onPieItemSelected}
            colors={Theme.colors}
            width={width}
            height={height}
            data={habitsTotalTime} />
          {/*}<Text style={styles.chart_title}>Spending per year in {habitsTotalTime[this.state.activeIndex].name}</Text>
          <AreaSpline
            width={width}
            height={height}
            data={this.state.spendingsPerYear}
            color={Theme.colors[this.state.activeIndex]} /> */}
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    backgroundColor:'whitesmoke',
    marginTop: 21,
  },
  chart_title : {
    paddingTop: 15,
    textAlign: 'center',
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 18,
    backgroundColor:'white',
    color: 'grey',
    fontWeight:'bold',
  }
}
