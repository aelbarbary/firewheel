import { FETCHING_GOALS, FETCHING_GOLAS_SUCCESS, FETCHING_GOALS_FAILURE, ADDING_HABIT } from './Constants'
import {Firebase, FirebaseRef} from './lib/firebase'
export function fetchGoalsFromAPI() {
  return (dispatch) => {
    const ref = FirebaseRef.child(`goals`);

    return ref.on('value', (snapshot) => {
      // const goals = snapshot.val() || [];
      var goals = [];
      snapshot.forEach(function(goal) {
        goals.push(goal.val());
      });

      return dispatch({
        type: FETCHING_GOLAS_SUCCESS,
        data: goals,
      });
    });
  }
}

export function addHabitToFirebase(){
  return (dispatch) => {

    const ref = FirebaseRef.child(`goals`);

    ref.push().set({
      name: "test",
      time: "45"
    });

    return ref.on('value', (snapshot) => {
      const goals = snapshot.val() || [];

      return dispatch({
        type: ADDING_HABIT,
        data: goals,
      });
    });
  }
}


export function getGoals() {
  return {
    type: FETCHING_GOALS
  }
}

export function getGoalsSuccess(data) {
  return {
    type: FETCHING_GOLAS_SUCCESS,
    data,
  }
}

export function getGoalsFailure() {
  return {
    type: FETCHING_GOALS_FAILURE
  }
}

export function addHabit(data){
  return {
    type: ADDING_HABIT,
    data
  }
}
