import { FETCHING_HABITS, ADDING_HABIT, DELETING_HABIT, EDITING_HABIT, LOG_HABIT } from './Constants'
import {Firebase, FirebaseRef} from './lib/firebase'
export function fetchHabitsFromStore() {
  return (dispatch) => {

    const UID = Firebase.auth().currentUser.uid;
    if (!UID)
      return false;

    const ref = FirebaseRef.child(`habits/${UID}`);
    var date = new Date();
    dateKey = date.toISOString().split('T')[0];

    return ref.on('value', (snapshot) => {

      var habits = [];
      snapshot.forEach(function(habit) {
        habitObject = habit.val();
        habitObject.key = habit.key;
        var totalTime = 0;

        const logsRef = FirebaseRef.child(`habits/${UID}/${habit.key}/logs/${dateKey}`);


        logsRef.on('value', (snapshotLog) => {
          snapshotLog.forEach(function(habitLog) {
            
            totalTime += habitLog.val().hours * 60 + habitLog.val().minutes;

          });

        });

        habitObject.totalTime = totalTime
        habits.push(habitObject);
      });

      return dispatch({
        type: FETCHING_HABITS,
        data: habits,
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
      time: time
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

export function deleteHabitFromStore(key){
  return (dispatch) => {

    const UID = Firebase.auth().currentUser.uid;
    if (!UID)
      return false;

    const ref = FirebaseRef.child(`habits/${UID}`);

    ref.child(key).remove();

    return dispatch({
      type: DELETING_HABIT,
    });

  }
}

export function editNameInStore(key, newName){
  return (dispatch) => {

    const UID = Firebase.auth().currentUser.uid;
    if (!UID)
      return false;

    const ref = FirebaseRef.child(`habits/${UID}/${key}`);

    ref.update({
      name: newName
    });

    return dispatch({
      type: EDITING_HABIT,
    });

  }
}

export function editTimeInStore(key, newTime){
  return (dispatch) => {

    const UID = Firebase.auth().currentUser.uid;
    if (!UID)
      return false;

    const ref = FirebaseRef.child(`habits/${UID}/${key}`);

    ref.update({
      time: newTime
    });

    return dispatch({
      type: EDITING_HABIT,
    });

  }
}

export function logHabitInStore(key, hours, minutes){
  return (dispatch) => {

    var date = new Date();
    dateKey = date.toISOString().split('T')[0];
    const UID = Firebase.auth().currentUser.uid;
    if (!UID)
      return false;

    const ref = FirebaseRef.child(`habits/${UID}/${key}/logs/${dateKey}`);

    ref.push().set({
      hours: hours,
      minutes: minutes,
      date: new Date().toLocaleString()
    });

    return dispatch({
      type: LOG_HABIT,
    });
  }
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
