import React from 'react';
import { connect } from 'react-redux';

const ExpenseList = (props) => (
  <div>
    <h1>ExpenseList</h1>
    {props.filters.text}
    {props.expenses}
  </div>
);

const mapStateToProps = (state) => {
  return {
    expense: state.expenses,
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ExpenseList);