import React from 'react'
import PropTypes from 'prop-types'
import { View , StyleSheet, TextInput, Text, TouchableHighlight, ScrollView} from 'react-native'
import { Icon, Card, FormInput, FormLabel, FormValidationMessage, Button } from 'react-native-elements'
import { Firebase } from './lib/firebase'
import {connect} from 'react-redux'
import { getHabitLogsFromStore, deleteHabitLogFromStore } from './actions'

class HabitHistory extends React.Component {
  state = {
    modalVisible: false,
    logDescription: ''
  };

  constructor(props) {
    super(props);

  }

  componentDidMount(){
    const { navigation } = this.props;
    console.log(navigation);
    const habitKey = navigation.getParam('habitKey', 'NO-KEY');

    this.props.getHabitLogs(habitKey);
  }

  render () {

    const {habitLogs} = this.props.habitLogs;
    console.log("habit logs");
    console.log(habitLogs);

    const { navigation } = this.props;
    console.log(navigation);
    const habitKey = navigation.getParam('habitKey', 'NO-KEY');

    return <View>

      <Card style={{padding:0}}>

        <View>
          <ScrollView >
              {
                habitLogs.length ? (
                  habitLogs.map((habitLog, i) => {
                    return <View style={{flex:1}} key={i}>
                            <Text >{habitLog.date}</Text>
                            <Text >{habitLog.hours }</Text>
                            <Text >{habitLog.minutes}</Text>
                            <TouchableHighlight onPress={() => {
                                this.props.deleteHabitLog(habitKey, habitLog.key);
                              }
                              }>
                              <Icon
                                name='delete'
                              />
                            </TouchableHighlight>
                          </View>
                  })
                ) : null
              }
            </ScrollView>

        </View>

      </Card>
    </View>
  }
}

const styles = StyleSheet.create({


});

function mapStateToProps(state){
  return{
    habitLogs: state.habitLogs
  }
}

function mapDispatchToProps(dispatch){
  return {
    getHabitLogs :  (habitKey) =>  { dispatch(getHabitLogsFromStore(habitKey)) },
    deleteHabitLog :  (habitKey, habitLogKey) =>  { dispatch(deleteHabitLogFromStore(habitKey, habitLogKey)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitHistory);
