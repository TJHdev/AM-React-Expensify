import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters'; 
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters 
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters:altFilters
  });
  expect(wrapper).toMatchSnapshot();
});


test('should handle text change', () => {
  const value = 'Rent';
  wrapper.find('input').prop('onChange')({target: {value}});
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
  wrapper.setProps({  // sort is set to date by default
    filters:altFilters // changing to amount using altFilters
  });
  const value = 'date';
  wrapper.find('select').prop('onChange')({target: {value}});
  expect(sortByDate).toHaveBeenCalledTimes(1);
});

test('should sort by amount', () => {
  const value = 'amount';
  wrapper.find('select').prop('onChange')({target: {value}});
  expect(sortByAmount).toHaveBeenCalledTimes(1);
});

test('should handle date change', () => {
  const startDate = moment(0).subtract(2, 'days');
  const endDate = moment(0).add(2, 'days');
  const dates = {
    startDate: startDate,
    endDate: endDate,
  };
  wrapper.find('DateRangePicker').prop('onDatesChange')(dates);
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus change', () => {
  const calendarFocused = 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});