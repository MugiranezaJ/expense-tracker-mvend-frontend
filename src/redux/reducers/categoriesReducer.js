import {FETCH_CATEGORY_PENDING, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_ERROR} from '../actions/fetchCategoriesAction'

const initialState = {
  pending: false,
  categories: [],
  error: null
}

export function fetchCategoriesReducer(state = initialState, action){
  switch(action.type){
    case FETCH_CATEGORY_PENDING:
      return {
        ...state,
        pending: true
      }
    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        pending: false,
        categories: action.payload
      }
    case FETCH_CATEGORY_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state
  } 
 

}
