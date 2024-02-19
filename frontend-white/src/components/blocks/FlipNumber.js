import React, { useEffect, useState } from 'react';
import './flip.css'; // Path to your stylesheet

const FlippingNumber = ({ currentNumber }) => {
    const [prevNumber, setPrevNumber] = useState(currentNumber);

    useEffect(() => {
        if (currentNumber !== prevNumber) {
            // Trigger the animation by changing the key
            setPrevNumber(currentNumber);
        }
    }, [currentNumber, prevNumber]);

    return (
        <div key={prevNumber} className="flipper">
            {currentNumber}
        </div>
    );
};

export default FlippingNumber;