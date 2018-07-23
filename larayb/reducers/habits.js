import { FETCHING_HABITS, ADDING_HABIT } from '../Constants'
const initialState = {
  habits: [],
  isFetching: false,
  error: false
}

export default function habitsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_HABITS:
      return {
        ...state,
        isFetching: false,
        habits: action.data
      }

    default:
      return state
  }
}
