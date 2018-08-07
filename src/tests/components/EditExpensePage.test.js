import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpense, handleOpenRemoveModalSpy, history, wrapper;

beforeEach(() => {
  startEditExpense = jest.fn();
  handleOpenRemoveModalSpy = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage 
      expense={expenses[1]} 
      handleOpenRemoveModal={handleOpenRemoveModalSpy} 
      startEditExpense={startEditExpense} 
      history={history}/>
  );
});

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle startEditExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
});

test('should open the remove modal through change of state', () => {
  expect(wrapper.state('confirmRemoveExpense')).toBe(null);
  wrapper.find('button').prop('onClick')();
  expect(wrapper.state('confirmRemoveExpense')).toBe(true);
});


