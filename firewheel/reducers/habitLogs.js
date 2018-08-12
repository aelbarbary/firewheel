import { FETCHING_HABITS_LOGS} from '../Constants'
const initialState = {
  habitLogs: [],
  error: false
}

export default function habitLogsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_HABITS_LOGS:
      return {
        ...state,
        habitLogs: action.data
      }


    default:
      return state
  }
}
