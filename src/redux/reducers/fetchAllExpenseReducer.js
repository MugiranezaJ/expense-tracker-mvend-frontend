import {FETCH_EXPENSE_PENDING, FETCH_EXPENSE_SUCCESS, FETCH_EXPENSE_ERROR} from '../actions/fetchExpenseAction'

const initialState = {
  pending: false,
  expenses: [],
  total: 0,
  error: null
}

export function fetchAllExpensesReducer(state = initialState, action){
  switch(action.type){
    case FETCH_EXPENSE_PENDING:
      return {
        ...state,
        pending: true
      }
    case FETCH_EXPENSE_SUCCESS:
      return {
        ...state,
        pending: false,
        total: action.total,
        expenses: action.payload
      }
    case FETCH_EXPENSE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state
  } 
 

}
