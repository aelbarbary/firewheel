import { FETCHING_HABITS, ADDING_HABIT, DELETING_HABIT } from './Constants'
import {Firebase, FirebaseRef} from './lib/firebase'
export function fetchHabitsFromStore() {
  return (dispatch) => {
    const ref = FirebaseRef.child(`habits`);

    return ref.on('value', (snapshot) => {

      var habits = [];
      snapshot.forEach(function(habit) {
        habitObject = habit.val();
        habitObject.key = habit.key;
        habits.push(habitObject);
      });

      console.log("getting habits");
      console.log(habits);

      return dispatch({
        type: FETCHING_HABITS,
        data: habits,
      });
    });
  }
}

export function addHabitToStore(name, time){
  return (dispatch) => {

    const ref = FirebaseRef.child(`habits`);

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

    const ref = FirebaseRef.child(`habits`);

    ref.child(key).remove();

    return dispatch({
      type: DELETING_HABIT,
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
