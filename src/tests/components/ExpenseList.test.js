import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses'; 
// import ExpenseListItem from '../../components/ExpenseListItem';

test('should render ExpenseList with expenses', () => {
  const wrapper = shallow(<ExpenseList expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
}); // snapshot with some expenses

test('should render ExpenseList with empty message', () => {
  const wrapper = shallow(<ExpenseList expenses={[]} />);
  expect(wrapper).toMatchSnapshot();
});

// Create test file
// Grab imports
// Render ExpenseListItem
// Create snapshot
