import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import AppRouter from './routers/AppRouter';
import getVisibleExpenses from './selectors/expenses';
import configureStore from './store/configureStore';

import 'normalize.css/normalize.css'
import './styles/styles.scss';

const store = configureStore();



store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
})

console.log(store.getState());

store.dispatch(addExpense({ description: 'Water bill', amount: 9999, createdAt: 1984 }));
store.dispatch(addExpense({ description: 'Gas bill', amount: 4, createdAt: 1988 }));
store.dispatch(setTextFilter('gas'));

setTimeout(() => {
  store.dispatch(setTextFilter('water'));
}, 2000)

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));