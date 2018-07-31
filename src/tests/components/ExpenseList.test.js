import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses'; 
import { ExpenseList } from '../../components/ExpenseList';

test('should render ExpenseList with expenses', () => {
  const wrapper = shallow(<ExpenseList expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
}); // snapshot with some expenses

test('should render ExpenseList with empty message', () => {
  const wrapper = shallow(<ExpenseList expenses={[]} />);
  expect(wrapper).toMatchSnapshot();
});

