import {FETCH_EXPENSE_PENDING, FETCH_EXPENSE_SUCCESS, FETCH_EXPENSE_ERROR, CLOSE_EXPENSE_MODEL} from '../actions/fetchExpenseAction'

const initialState = {
  pending: false,
  expenses: [],
  total_amount: 0,
  error: null
}

export function fetchExpensesReducer(state = initialState, action){
  action.payload ? console.log('Yes') : console.log('no')
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
        total_amount: action.total,
        expenses: action.payload
      }
    case FETCH_EXPENSE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
        expenses: []
      }
    case CLOSE_EXPENSE_MODEL:
      return {
        ...state,
        expenses: []
      }
    default:
      return state
  } 
 

}
