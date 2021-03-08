import {UPDATE_EXPENSE_PENDING, UPDATE_EXPENSE_SUCCESS, UPDATE_EXPENSE_ERROR, CLOSE_SNACKBAR} from '../actions/updateExpenseAction'

const initialState = {
  pending: false,
  error: null,
  message: null,
  snackbarMessage: false,
  snackbarError: false
}

export function updateExpenseReducer(state = initialState, action){
  switch(action.type){
    case UPDATE_EXPENSE_PENDING:
      return {
        ...state,
        pending: true
      }
    case UPDATE_EXPENSE_SUCCESS:
      return {
        ...state,
        pending: false,
        message: action.payload,
        snackbarMessage: true
      }
    case UPDATE_EXPENSE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
        snackbarError: true
      }
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarError: false,
        snackbarMessage: false
      }
    default:
      return state
  } 
 

}
