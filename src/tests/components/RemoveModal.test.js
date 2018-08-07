import React from 'react';
import { shallow } from 'enzyme';
import RemoveModal from '../../components/RemoveModal';
import expenses from '../fixtures/expenses';

let onRemove, handleCloseRemoveModal, expense, wrapper;

// TODO need help

beforeEach(() => {
  const state = {
    confirmRemoveExpense: null
  };
  history = { push: jest.fn() };
  expense = { id: '123' };
  handleCloseRemoveModal = jest.fn();
  onRemove = jest.fn();
  wrapper = shallow(
    <RemoveModal 
      confirmRemoveExpense={state.confirmRemoveExpense} 
      handleCloseRemoveModal={handleCloseRemoveModal}
      onRemove={onRemove}
    />
  );
});

test('should render RemoveModal properly', () => {
  expect(wrapper).toMatchSnapshot();    
});


test('should handle removeExpense', () => {
  const wrapper2 = shallow(<RemoveModal onRemove={onRemove} />);

  console.log(wrapper.find('button').at(1));
  wrapper.find('button').at(0).simulate('click');
  wrapper2.instance().onRemove();

  expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[1].id });
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(handleCloseRemoveModal).toHaveBeenCalledTimes(1);
});
