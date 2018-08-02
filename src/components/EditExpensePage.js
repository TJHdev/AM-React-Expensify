import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };
  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <h1>Edit expense</h1>
        <ExpenseForm 
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    )
  };
}

const mapStateToProps = (state, props) => { // can pass both state and props
  return {
    expense: state.expenses.find((expense) => {
      return expense.id === props.match.params.id;
    })
  };
};

const mapDispatchToProps = (dispatch) => ({
  startEditExpense: (id, expense) => {
    return dispatch(startEditExpense(id, expense));
  },
  startRemoveExpense: (data) => {
    return dispatch(startRemoveExpense(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);