import moment from 'moment';
import filtersReducer from '../../reducers/filters';


test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: null,
    endDate: null
  };
  const action = { type: 'SORT_BY_DATE' };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

test('should set text filter property', () => {
  const text = 'test text string'
  const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text: text});
  expect(state.text).toBe(text);
});

test('should set startDate filter property', () => {
  const startDate = moment(-1500);
  const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate: startDate });
  expect(state.startDate).toBe(startDate);
});

test('should set endDate filter property', () => {
  const endDate = moment(1500)
  const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate: endDate });
  expect(state.endDate).toBe(endDate);
});