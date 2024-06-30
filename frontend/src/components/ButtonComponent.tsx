import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, style, disabled }) => {
  return (
    <button
      onClick={onClick}
  style={{
  ...defaultStyles,
  ...style,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1
  }}
  disabled={disabled}
    >
    {label}
    </button>
);
};

const defaultStyles: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '16px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#007BFF',
  color: '#FFFFFF',
  display: 'inline-block',
  margin: '10px 0',
  width: '100%',
  maxWidth: '300px',
  boxSizing: 'border-box',
};

export default Button;
