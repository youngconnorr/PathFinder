import { useState, useEffect } from "react";
/* eslint-disable react/prop-types */

const GuestsNumber = ({ guestsNumber }) => {
  const [adultNum, setAdultNum] = useState(0);
  const [childNum, setChildNum] = useState(0);
  const [infantsNum, setInfantsNum] = useState(0);
  const [petNum, setPetNum] = useState(0);

  useEffect(() => {
    guestsNumber(adultNum, childNum, infantsNum, petNum);
  }, [adultNum, childNum, infantsNum, petNum, guestsNumber]);

  return (
    <>
      <div className="guest">GuestsNumber</div>
      <span className="guest">
        <div>
          <p>Adults</p>
          <p>Ages 13 or above</p>
        </div>
        <div className="guest-mod">
          <button
            type="button"
            className="guest-button"
            onClick={() =>
              setAdultNum(() => (adultNum - 1 < 0 ? 0 : adultNum - 1))
            }
          >
            -
          </button>
          <div className="guest-num-display">{adultNum}</div>
          <button
            type="button"
            className="guest-button"
            onClick={() => setAdultNum(adultNum + 1)}
          >
            +
          </button>
        </div>
      </span>
      <span className="guest">
        <div>
          <p>Child</p>
          <p>Ages 2 - 12</p>
        </div>
        <div className="guest-mod">
          <button
            type="button"
            className="guest-button"
            onClick={() =>
              setChildNum(() => (childNum - 1 < 0 ? 0 : childNum - 1))
            }
          >
            -
          </button>
          <div className="guest-num-display">{childNum}</div>
          <button
            type="button"
            className="guest-button"
            onClick={() => setChildNum(childNum + 1)}
          >
            +
          </button>
        </div>
      </span>
      <span className="guest">
        <div>
          <p>Infant</p>
          <p>Under 2</p>
        </div>
        <div className="guest-mod">
          <button
            type="button"
            className="guest-button"
            onClick={() =>
              setInfantsNum(() => (infantsNum - 1 < 0 ? 0 : infantsNum - 1))
            }
          >
            -
          </button>
          <div className="guest-num-display">{infantsNum}</div>
          <button
            type="button"
            className="guest-button"
            onClick={() => setInfantsNum(infantsNum + 1)}
          >
            +
          </button>
        </div>
      </span>
      <span className="guest">
        <div>
          <p>Pets</p>
        </div>
        <div className="guest-mod">
          <button
            type="button"
            className="guest-button"
            onClick={() => setPetNum(() => (petNum - 1 < 0 ? 0 : petNum - 1))}
          >
            -
          </button>
          <div className="guest-num-display">{petNum}</div>
          <button
            type="button"
            className="guest-button"
            onClick={() => setPetNum(petNum + 1)}
          >
            +
          </button>
        </div>
      </span>
    </>
  );
};

export default GuestsNumber;
