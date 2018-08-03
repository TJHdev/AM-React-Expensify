import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense,
  addExpense,
  removeExpense,
  startRemoveExpense,
  editExpense,
  startEditExpense,
  setExpenses,
  startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid: uid }};
const createMockStore = configureMockStore([thunk]);


beforeEach((done) => { 
  const expenseData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expenseData[id] = { description, note, amount, createdAt
    }
  });

  database.ref(`users/${uid}/expenses`).set(expenseData).then(() => {
    done();
  })
});

// REMOVE_EXPENSES
test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  }) // {} !=== {}, [] !== []
}); // when comparing objects or arrays must use toEqual instead of toBe


test('should remove expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  
  store.dispatch(startRemoveExpense({ id:expenses[1].id })).then(() => {
    const actions = store.getActions(); // getActions()
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id: expenses[1].id
    });
    return database.ref(`users/${uid}/expenses/${expenses[1].id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  })
}); 

// EDIT_EXPENSE
test('should setup edit expense action object', () => {
  const updates = {
    description: 'Test expense',
    note: 'This is a test',
    amount: 1500,
    createdAt: 1999,
  };
  const action = editExpense( '123abc', updates );
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      description: 'Test expense',
      note: 'This is a test',
      amount: 1500,
      createdAt: 1999,
    }
  })
});

test('should edit expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const updateData = {
    description: 'Mouse',
    amount: 3000,
    note: 'Logitech',
    createdAt: 20000
  };
  
  store.dispatch(startEditExpense(expenses[0].id, updateData)).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id: expenses[0].id,
      updates: updateData
    });

    return database.ref(`users/${uid}/expenses/${expenses[0].id}`).once('value')
  }).then((snapshot) => {
    const val = snapshot.val();
    expect(val).toEqual(updateData);
    done();
  });
});

// ADD_EXPENSE
test('should setup add expense action object with provided values', () => {
  const action = addExpense( expenses[2] );
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
}); // expect.any(String) is useful for randomised ids which cannot be controlled

test('should add expense to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'Logitech',
    createdAt: 20000
  };
  
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    const val = snapshot.val();
    expect(val).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const defaultExpenseData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };
  
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...defaultExpenseData
      }
    });

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    const val = snapshot.val();
    expect(val).toEqual(defaultExpenseData);
    done();
  });
});

// SET_EXPENSES
test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses: expenses
  });
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions(); // getActions()
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses: expenses
    });
    done();
  });
});

