import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  let pluralExpenses = expenseCount === 1 ? '' : 's';
  // let expensesTotal = selectExpensesTotal(props.expenses);
  return (
    <div>
      <h1>
        Viewing {expenseCount} expense{pluralExpenses} 
        &nbsp;totalling {numeral(expensesTotal / 100).format('$0,0.00')}
      </h1>
    </div>
  );
}

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);





