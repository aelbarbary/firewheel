import { FETCHING_GOALS, FETCHING_GOLAS_SUCCESS, FETCHING_GOALS_FAILURE } from '../Constants'
const initialState = {
  goals: [],
  isFetching: false,
  error: false
}

export default function goalsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_GOALS:
      return {
        ...state,
        goals: [],
        isFetching: true
      }
    case FETCHING_GOLAS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        goals: action.data
      }
    case FETCHING_GOALS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}
