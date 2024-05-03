import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
/* eslint-disable react/prop-types */

const DateSelector = ({ datePicked }) => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    datePicked(startDate);
  }, [startDate, datePicked]);

  return (
    <div>
      When are you travelling?
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
};

export default DateSelector;
