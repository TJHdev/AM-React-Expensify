import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLoginGoogle, startLoginGithub, startLoginFacebook }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify App</h1>
      <p>It's time to get your expenses under control.</p>
      <button className="button button--google" onClick={startLoginGoogle} >Login with Google</button>
      <button className="button" onClick={startLoginGithub} >Login with Github</button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLoginGoogle: () => dispatch(startLogin('google')),
    startLoginGithub: () => dispatch(startLogin('github'))
    // startLoginFacebook: () => dispatch(startLogin('facebook'))
  });

export default connect(undefined, mapDispatchToProps)(LoginPage);

// <button className="button" onClick={startLoginFacebook} >Login with Facebook</button>