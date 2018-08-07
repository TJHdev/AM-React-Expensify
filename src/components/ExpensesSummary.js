import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = ({ expenseCountVisible, expensesTotalVisible, expenseCountHidden, expensesTotalHidden }) => {
  let pluralExpenses = expenseCountVisible === 1 ? '' : 's';
  let pluralHiddenExpenses = expenseCountHidden === 1 ? '' : 's';
  // let expensesTotal = selectExpensesTotal(props.expenses);
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expenseCountVisible}</span> expense{pluralExpenses} 
          &nbsp;totalling <span>{numeral(expensesTotalVisible / 100).format('$0,0.00')}</span>
        </h1>
        <h1 className="page-header__title">
          Hiding <span>{expenseCountHidden}</span> expense{pluralHiddenExpenses} 
          &nbsp;totalling <span>{numeral(expensesTotalHidden / 100).format('$0,0.00')}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  const expensesTotalVisible = selectExpensesTotal(visibleExpenses);

  return {
    expenseCountVisible: visibleExpenses.length,
    expenseCountHidden: state.expenses.length - visibleExpenses.length,
    expensesTotalVisible: expensesTotalVisible,
    expensesTotalHidden: selectExpensesTotal(state.expenses) - expensesTotalVisible
  };
};

export default connect(mapStateToProps)(ExpensesSummary);





