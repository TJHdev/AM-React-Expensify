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

store.dispatch(addExpense({ description: 'Water bill', amount: 9999, createdAt: 1532986973481 }));
store.dispatch(addExpense({ description: 'Gas bill', amount: 4, createdAt: 1533898800000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 1000, createdAt: 1531911600000 }));
// store.dispatch(setTextFilter('gas'));


const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));