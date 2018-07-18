import { FETCHING_GOALS, FETCHING_GOLAS_SUCCESS, FETCHING_GOALS_FAILURE } from './Constants'

export function fetchGoalsFromAPI() {
  return (dispatch) => {
    dispatch(getGoals())
    fetch('https://swapi.co/api/people/')
    .then(data => data.json())
    .then(json => {
      console.log('json:', json)
      dispatch(getGoalsSuccess(json.results))
    })
    // .catch(err => dispatch(getGoalsFailure(err)))
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
