import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';


// ADD_EXPENSE
const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description: description,
    note: note,
    amount: amount,
    createdAt: createdAt
  }
})

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id: id
}) 

// EDIT_EXPENSE
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id: id,
  updates
})

// SET_TEXT_FILTER
// store.dispatch(setTextFilter('rent'));

const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text: text
})

// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => { 
        return id !== action.id; 
      });
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense;
        }
      });
    default: 
      return state;
  }
};


const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: null,
  endDate: null
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    default: 
      return state;
  }
};

// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  console.log(store.getState());
})

const expenseOne = store.dispatch(addExpense({
  description: 'This is the first expense',
  amount: 500
}));
const expenseTwo = store.dispatch(addExpense({
  description: 'Coffee',
  amount: 300
}));
const expenseThree = store.dispatch(addExpense({
  description: 'Car Insurance',
  amount: 2000
}));

store.dispatch(removeExpense({ id: expenseOne.expense.id }));

store.dispatch(editExpense(expenseTwo.expense.id, { amount: 555 }));

store.dispatch(setTextFilter('rent'));

store.dispatch(setTextFilter(''));

const demoState = {
  expenses: [{
    id: 'pofghfghfhg',
    description: 'January Rend',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: null,
    endDate: null
  }
};

const user = {
  name: 'Jen',
  age: 24
};

console.log({
  ...user,
  location: 'York',
  age: 30
})