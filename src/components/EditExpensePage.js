import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import RemoveModal from './RemoveModal';

export class EditExpensePage extends React.Component {
  state = {
    confirmRemoveExpense: null
  };
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };
  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  };
  handleOpenRemoveModal = () => {
    this.setState(() => ({ confirmRemoveExpense: true }))
  };
  handleCloseRemoveModal = () => {
    this.setState(() => ({ confirmRemoveExpense: null }))
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm 
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.handleOpenRemoveModal}>Remove Expense</button>
        </div>
        <RemoveModal
          confirmRemoveExpense={this.state.confirmRemoveExpense}
          handleCloseRemoveModal={this.handleCloseRemoveModal}
          onRemove={this.onRemove}
        />
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