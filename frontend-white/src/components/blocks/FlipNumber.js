import { useEffect, useState } from 'react';
import './flip.css';

const FlippingNumber = ({ currentNumber }) => {
  const [prevNumber, setPrevNumber] = useState(currentNumber);

  useEffect(() => {
    if (currentNumber !== prevNumber) setPrevNumber(currentNumber);
  }, [currentNumber, prevNumber]);

  return (
    <div key={prevNumber} className="flipper">
      {currentNumber}
    </div>
  );
};

export default FlippingNumber;
