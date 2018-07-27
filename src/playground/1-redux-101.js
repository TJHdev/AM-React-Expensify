import { createStore } from 'redux';


const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy: decrementBy
});

const setCount = ({ count = 15 } = {}) => ({
  type: 'SET',
  count: count
});

const resetCount = () => ({
  type: 'RESET'
});

// Reducer
// 1. Reducers are pure functions
// 2. Never change 'state' or 'action'

let result;
const add = (a, b) => { // pure function
  result = a + b;
}


const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      };
    case 'SET':
      return {
        count: action.count
      };
    case 'RESET':
      return {
        count: state.count = 0
      };
    default: 
      return state;
  }
};


const store = createStore(countReducer);



const unsubscribe = store.subscribe(() => {  // prints the state every time it changes.
  console.log(store.getState());
}); // Calling subscribe creates the subscription. The subscribe function returns another function that lets you unsubscribe when it's called.


store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());

store.dispatch(decrementCount({ decrementBy: 20 }));

store.dispatch(decrementCount());

store.dispatch(resetCount());

store.dispatch(setCount({ count: 101 }));

unsubscribe();