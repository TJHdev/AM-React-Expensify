import { addExpense, removeExpense, editExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  }) // {} !=== {}, [] !== []
}); // when comparing objects or arrays must use toEqual instead of toBe

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

test('should setup add expense action object with provided values', () => {
  const expenseData = {
    description: 'Rent',
    note: 'Random garbage note',
    amount: 109500,
    createdAt: 1533033864048,
  }; 
  const action = addExpense( expenseData );
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
}); // expect.any(String) is useful for randomised ids which cannot be controlled

test('should setup add expense action object with default values', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0,
    }
  });
});