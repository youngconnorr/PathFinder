import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
/* eslint-disable react/prop-types */

// const DateSelector = ({ datePicked }) => {
//   const [startDate, setStartDate] = useState(new Date());

//   useEffect(() => {
//     datePicked(startDate);
//   }, [startDate, datePicked]);

//   return (
//     <div>
//       When are you travelling?
//       <DatePicker
//         selected={startDate}
//         onChange={(date) => setStartDate(date)}
//       />
//     </div>
//   );
// };

// export default DateSelector;

const DateSelector = ({ datePicked }) => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    datePicked(startDate);
  }, [startDate, datePicked]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="form-item">
      <FontAwesomeIcon icon={faCalendar} />
      <select
        name="MonthPicker"
        id="month-picker"
        // className="month-picker"
        onChange={(e) => setStartDate(e.target.value)}
        style={{ marginLeft: "40px" }}
      >
        <option value="">Pick Month of Travel</option>
        {months.map((month) => (
          <option key={months.indexOf(month)}>{month}</option>
        ))}
      </select>
    </div>
  );
};

export default DateSelector;
