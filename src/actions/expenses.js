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

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense: expense
})

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    
    const expense = { description, note, amount, createdAt };

    return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id: id
});

export const startRemoveExpense = ({ id }) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).set(null).then(() => {
      dispatch(removeExpense({ id }));
    });
  }
};

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id: id,
  updates
});

export const startEditExpense = (id, updates = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
      dispatch(editExpense(id, updates));
    }); 
  };
};

export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses: expenses
});

export const startSetExpenses = (expensesData = []) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
      const expenses = [];
   
      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
   
      dispatch(setExpenses(expenses));
    });
  }
};



 
