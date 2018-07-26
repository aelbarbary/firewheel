import { FETCHING_HABITS, ADDING_HABIT, DELETING_HABIT, EDITING_HABIT } from './Constants'
import {Firebase, FirebaseRef} from './lib/firebase'
export function fetchHabitsFromStore() {
  return (dispatch) => {

    const UID = Firebase.auth().currentUser.uid;
    if (!UID)
      return false;

    const ref = FirebaseRef.child(`habits/${UID}`);

    return ref.on('value', (snapshot) => {

      var habits = [];
      snapshot.forEach(function(habit) {
        habitObject = habit.val();
        habitObject.key = habit.key;
        habits.push(habitObject);
      });

      return dispatch({
        type: FETCHING_HABITS,
        data: habits,
      });
    });
  }
}

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
