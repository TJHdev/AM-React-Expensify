import uuid from 'uuid';
import database from '../firebase/firebase.js'

// component calls action generator
// action generator returns object
// component dispatches object
// redux store changes

// component calls action generator
// action generator returns function
// component dispatches object (?)
// function runs (has the ability to dispatch other actions and do whatever it wants)

const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense: expense
})

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    
    const expense = { description, note, amount, createdAt };

    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id: id
}) 

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id: id,
  updates
})

export { addExpense, removeExpense, editExpense }