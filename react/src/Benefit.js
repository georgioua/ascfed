
import React from 'react';
import './App.css';

function Benefit({ benefit }) {
  return (
 
    <div className="flex-wrap">
        <div className="leading-none text-gray-500 text-xs font-medium">
            {benefit.key} {benefit.value}  
        </div>
    </div>

  );
}

export default Benefit;