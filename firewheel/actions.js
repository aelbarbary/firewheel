import { FETCHING_HABITS,
        ADDING_HABIT,
        DELETING_HABIT,
        EDITING_HABIT,
        LOG_HABIT,
        FETCHING_HABITS_LOGS,
        DELETING_HABIT_LOG,
        FETCHING_HABITS_STATS,
       ADDING_COMMENT } from './Constants'

import {Firebase, FirebaseRef} from './lib/firebase'
export function fetchHabitsFromStore() {
  return (dispatch) => {

    const UID = Firebase.auth().currentUser.uid;
    if (!UID)
      return false;

    const ref = FirebaseRef.child(`habits/${UID}`);
    var date = new Date();
    dateKey = formatDate(date);

    return ref.on('value', (snapshot) => {

      var habits = [];
      snapshot.forEach(function(habit) {
        habitObject = habit.val();
        if (habitObject.is_active){
            habitObject.key = habit.key;
            var totalTimeToday = 0;
            var overallSpentMinutes = 0 ;

            var habitRef = FirebaseRef.child(`habits/${UID}/${habit.key}/logs`);
            habitRef.on('child_added', function(log) {
              for (key in log.val()){
                overallSpentMinutes += log.val()[key].hours * 60 + log.val()[key].minutes;
              }
            });

            const logsRef = FirebaseRef.child(`habits/${UID}/${habit.key}/logs/${dateKey}`);

            logsRef.on('value', (snapshotLog) => {
              snapshotLog.forEach(function(habitLog) {

                totalTimeToday += habitLog.val().hours * 60 + habitLog.val().minutes;

              });
            });

            habitObject.overallSpentMinutes = overallSpentMinutes;
            habitObject.totalTime = totalTimeToday
            habits.push(habitObject);
        }
      });

      return dispatch({
        type: FETCHING_HABITS,
        data: habits,
      });
    });
  }
}

export function getHabitLogsFromStore(habitKey) {
  return (dispatch) => {

    const UID = Firebase.auth().currentUser.uid;
    if (!UID)
      return false;

    var date = new Date();
    dateKey = formatDate(date);
    const ref = FirebaseRef.child(`habits/${UID}/${habitKey}/logs/${dateKey}`);

    var logs = [];

    return ref.on('value', (snapshot) => {

      snapshot.forEach(function(log) {
        logObject = log.val();
        logObject.key = log.key;

        logs.push(logObject);
      });

      return dispatch({
        type: FETCHING_HABITS_LOGS,
        data: logs,
      });
    });
  }
}

export function getHabitStatsFromStore() {
  return (dispatch) => {

    const UID = Firebase.auth().currentUser.uid;
    if (!UID)
      return false;

    const ref = FirebaseRef.child(`habits/${UID}`);

    var Stats = [];

    return ref.on('value', (habits) => {

      habits.forEach(function(habit) {
        habitObject = habit.val();

        statObject = {
          habitName : habitObject.name,
          totalMin:0
        };

        habit.child("logs").forEach(function(log){
          logObject = log.val();

          log.getChildren().forEach(function(logEntry){

          });

        })

        Stats.push(habitObject);
      });

      return dispatch({
        type: FETCHING_HABITS_STATS,
        data: habits,
      });
    });
  }
}


export function deleteHabitLogFromStore(habitKey, habitLogKey){
  return (dispatch) => {

    const UID = Firebase.auth().currentUser.uid;
    if (!UID)
      return false;

    var date = new Date();
    dateKey = formatDate(date);

    var ref = FirebaseRef.child(`habits/${UID}/${habitKey}/logs/${dateKey}`);

    ref.child(habitLogKey).remove();


    ref = FirebaseRef.child(`habits/${UID}/${habitKey}/logs/${dateKey}`);

    var logs = [];

    return ref.on('value', (snapshot) => {

      snapshot.forEach(function(log) {
        logObject = log.val();
        logObject.key = log.key;

        logs.push(logObject);
      });

      return dispatch({
        type: FETCHING_HABITS_LOGS,
        data: logs,
      });
    });

  }
}


function objectToArray(s) {
  var arr = [];
  for (var key in s){
    arr.push(s[key]);
  }

  return arr;
};
export function addHabitToStore(name, time){
  return (dispatch) => {

    const UID = Firebase.auth().currentUser.uid;
    if (!UID)
      return false;

    const ref = FirebaseRef.child(`habits/${UID}`);

    ref.push().set({
      name: name,
      time: time,
      is_active: true
    });

    return ref.on('value', (snapshot) => {
      const habits = snapshot.val() || [];

      return dispatch({
        type: ADDING_HABIT,
        data: habits,
      });
    });
  }
}

export function addCommentToStore(comment){
  return (dispatch) => {

    const UID = Firebase.auth().currentUser.uid;
    if (!UID)
      return false;

    var date = new Date();
    dateKey = formatDate(date);

    const ref = FirebaseRef.child(`comments/${UID}/${dateKey}/`);

    ref.push().set({
      comment: comment
    });

    return dispatch({
      type: ADDING_COMMENT,
    });
  }
}

export function deleteHabitFromStore(key){
  return (dispatch) => {

    const UID = Firebase.auth().currentUser.uid;
    if (!UID)
      return false;

    const ref = FirebaseRef.child(`habits/${UID}/${key}`).update({
      is_active: false
    });


    // ref.child(key).remove();

    return dispatch({
      type: DELETING_HABIT,
    });

  }
}

export function editHabitInStore(key, habitObject){
  return (dispatch) => {
    const UID = Firebase.auth().currentUser.uid;
    if (!UID)
      return false;

    const ref = FirebaseRef.child(`habits/${UID}/${key}`);

    ref.update({
      name: habitObject.name,
      time: habitObject.time
    });

    return dispatch({
      type: EDITING_HABIT,
    });

  }
}

export function logHabitInStore(key, hours, minutes, description){
  return (dispatch) => {

    var date = new Date();
    dateKey = formatDate(date);

    const UID = Firebase.auth().currentUser.uid;
    if (!UID)
      return false;

    const ref = FirebaseRef.child(`habits/${UID}/${key}/logs/${dateKey}`);

    ref.push().set({
      hours: hours,
      minutes: minutes,
      description: description,
      date: new Date().toLocaleString()
    });

    return dispatch({
      type: LOG_HABIT,
    });
  }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


export function getHabits(data) {
  return {
    type: FETCHING_HABITS,
    data
  }
}

export function addHabit(data){
  return {
    type: ADDING_HABIT,
    data
  }
}
