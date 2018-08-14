import { FETCHING_HABITS, ADDING_HABIT, DELETING_HABIT_LOG } from '../Constants'
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
      case DELETING_HABIT_LOG:
        return {
          ...state,
          habitLogs: action.data.FILTER
        }


    default:
      return state
  }
}
