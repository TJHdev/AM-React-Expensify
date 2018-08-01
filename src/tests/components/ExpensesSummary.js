import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should render ExpensesSummary with an expense array', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={2} expensesTotal={999} />);
  expect(wrapper).toMatchSnapshot();
}); 

test('should render ExpensesSummary with a single expense', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={235} />);
  expect(wrapper).toMatchSnapshot();
}); 