import { ADD_PROJECT } from './actions';

const initialState = {
  projects: []
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    default:
      return state;
  }
}
