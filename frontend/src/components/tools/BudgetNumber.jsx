import { useState, useEffect } from "react";
/* eslint-disable react/prop-types */

const BudgetNumber = ({ chosenBudget }) => {
  const [budget, setBudget] = useState("");

  useEffect(() => {
    chosenBudget(budget);
  }, [budget, chosenBudget]);

  return (
    <div>
      Budget
      <select
        name="Budget"
        id="budget"
        className="budget-picker"
        onChange={(e) => setBudget(e.target.value)}
        style={{ marginLeft: "40px" }}
      >
        <option value="">Choose your budget</option>
        <option value="0-20$">Low 0-500$</option>
        <option value="20-40$">Medium 500-1500$</option>
        <option value="40$+">High 1500+</option>
      </select>
    </div>
  );
};

export default BudgetNumber;
