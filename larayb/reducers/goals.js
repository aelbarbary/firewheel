import Store from '../store/goals';
import {FETCHING_GOALS} from '../Constants'

export const initialState = Store;

export default function goalReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_GOALS: {
      return {
        ...state,
        goals: action.data || [],
      };
    }
    default:
      return state;
  }
}
