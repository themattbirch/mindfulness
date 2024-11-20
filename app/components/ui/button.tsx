import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'ghost';
  size?: 'sm' | 'icon';
}

const Button: React.FC<ButtonProps> = ({ children, variant, size, ...props }) => {
  const baseClasses = 'px-4 py-2 rounded focus:outline-none';
  const variantClasses = variant === 'outline' ? 'border' : '';
  const sizeClasses = size === 'sm' ? 'text-sm' : size === 'icon' ? 'p-2' : '';

  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses}`} {...props}>
      {children}
    </button>
  );
};

export default Button; 