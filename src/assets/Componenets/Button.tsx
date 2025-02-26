// Button.tsx

import React from 'react';

type ButtonProps = {
  onClick: () => void;
  label: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
 
  return (
    <button onClick={onClick} className="action-button">
      {label}
    </button>
  );
};

export default Button;
