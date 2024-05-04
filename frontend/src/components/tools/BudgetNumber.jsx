import { useState, useEffect } from "react";
/* eslint-disable react/prop-types */

const BudgetNumber = ({ chosenBudget }) => {
  const [budget, setBudget] = useState("");

  useEffect(() => {
    chosenBudget(budget);
  }, [budget, chosenBudget]);

  return (
    <select
      name="Budget"
      id="budget"
      className="budget-picker"
      onChange={(e) => setBudget(e.target.value)}
    >
      <option value="">
        <h2>Choose your budget</h2>
      </option>
      <option value="0-20$">
        <h2>Low </h2>
        <h3>0-500$</h3>
      </option>
      <option value="20-40$">
        <h2>Medium </h2>
        <h3>500-1500$</h3>
      </option>
      <option value="40$+">
        <h2>High </h2>
        <h3>1500+$</h3>
      </option>
    </select>
  );
};

export default BudgetNumber;
