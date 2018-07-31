import moment from 'moment';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../../actions/filters';

test('should setup set text filter action object with provided data', () => {
  const action = setTextFilter('test string');
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'test string'
  });
});

test('should setup set text filter action object with default data', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  });
});

test('should setup sort by date action object', () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: 'SORT_BY_DATE'
  });
});

test('should setup sort by amount action object', () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT'
  });
});

test('should setup set start date action object with provided data', () => {
  const action = setStartDate(moment(1500000))
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: (moment(1500000))
  })
});

test('should setup set start date action object with default data', () => {
  const action = setStartDate()
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: 0
  })
});

test('should setup set end date action object with provided data', () => {
  const action = setEndDate(moment(1500000))
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(1500000)
  })
});

test('should setup set end date action object with default data', () => {
  const action = setEndDate()
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: 0
  })
});