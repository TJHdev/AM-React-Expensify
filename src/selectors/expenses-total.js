export default (expenses) => {
  // if (expenses.length === 0) {
  //   return 0;
  // };
  let amountsArray = expenses.map((expense) => {
    return expense.amount;
  });
  return amountsArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
};
