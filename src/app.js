import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { startSetExpenses } from './actions/expenses';
import AppRouter, { history } from './routers/AppRouter';
import getVisibleExpenses from './selectors/expenses';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import { login, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage';


const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});


// window.fbAsyncInit = function() {
// FB.init({
//   appId      : '202288280641037',
//   cookie     : true,
//   xfbml      : true,
//   version    : 'v3.1'
// });
  
// FB.AppEvents.logPageView();   
  
// };

// (function(d, s, id){
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) {return;}
//   js = d.createElement(s); js.id = id;
//   js.src = "https://connect.facebook.net/en_US/sdk.js";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));
