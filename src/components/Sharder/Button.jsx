import React from 'react';

const Button = ({ children, version , type , isDisabled, onClick }) => {
  return (
    <button
      className={`btn btn-${version}`}
      type={type}
      disabled={isDisabled}
      onClick={onClick} 
    >
      {children}
    </button>
  );
};

export default Button;
