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
// store.dispatch(sortByDate());   // 'date'

const sortByDate = () => ({
  type: 'SORT_BY_DATE'
})

// SORT_BY_AMOUNT
// store.dispatch(sortByAmount()); // 'amount'

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
})


// SET_START_DATE
const setStartDate = (startDate = 0) => ({
  type: 'SET_START_DATE',
  startDate: startDate
})

// SET_END_DATE
const setEndDate = (endDate = 0) => ({
  type: 'SET_END_DATE',
  endDate: endDate
})

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
          };
        } else {
          return expense;
        };
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
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
    default: 
      return state;
  }
};

// Get visible expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  });
};

// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({
  description: 'This is the first rent payment',
  amount: 500,
  createdAt: -1000
}));
const expenseTwo = store.dispatch(addExpense({
  description: 'Coffee',
  amount: 300,
  createdAt: 1000
}));
const expenseThree = store.dispatch(addExpense({
  description: 'Car rental',
  amount: 200,
  createdAt: 0
}));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 555 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter(''));
store.dispatch(sortByAmount()); // 'amount'
// store.dispatch(sortByDate());   // 'date'

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate(0));

// store.dispatch(setEndDate(500));
// store.dispatch(setEndDate(-500));

const demoState = {
  expenses: [{
    id: 'pofghfghfhg',
    description: 'January Rent',
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
