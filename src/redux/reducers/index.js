import { combineReducers } from 'redux'
import { fetchCategoriesReducer } from './categoriesReducer'
import { fetchExpensesReducer } from './expenseReducer'
import { createExpenseReducer } from './createExpenseReducer'
import { deleteCategoryReducer, deleteExpenseReducer } from './deleteReducer'
import { loginReducer } from './loginReducer'
import { setProtectionReducer } from './setProtectionReducer'
import { createCategoryReducer } from './createCategoryReducer'
import { updateExpenseReducer } from './updateExpenseReducer'
import { fetchAllExpensesReducer } from './fetchAllExpenseReducer'

const reducers = combineReducers({
    fetchCategories: fetchCategoriesReducer,
    fetchExpenses: fetchExpensesReducer,
    login: loginReducer,
    protection: setProtectionReducer,
    deleteExpense: deleteExpenseReducer,
    deleteCategory: deleteCategoryReducer,
    createCategory: createCategoryReducer,
    createExpense: createExpenseReducer,
    updateExpense: updateExpenseReducer,
    fetchAllExpenses: fetchAllExpensesReducer,
  })

export default reducers