import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should setup default reducer values', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses]);
});

test('should setup add expense object to state', () => {
  const expense = {
    id: '109',
    description: 'Laptop',
    note: '',
    createdAt: 20000,
    amount: 29500
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense: expense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test('should edit an expense by id', () => {
  const updates = {
    amount: 200000,
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id: '1',
    updates: updates
  }
  const state = expensesReducer(expenses, action);
  expect(state[0].amount).toBe(200000);
});

test('should not edit an expense if expense not found', () => {
  const updates = {
    amount: 200000,
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: updates
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});