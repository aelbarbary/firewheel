import { FETCHING_GOALS, FETCHING_GOLAS_SUCCESS, FETCHING_GOALS_FAILURE } from './Constants'
import {Firebase, FirebaseRef} from './lib/firebase'
export function fetchGoalsFromAPI() {
  return (dispatch) => {
    const ref = FirebaseRef.child(`goals`);

    return ref.on('value', (snapshot) => {
      const goals = snapshot.val() || [];

      return dispatch({
        type: FETCHING_GOLAS_SUCCESS,
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
