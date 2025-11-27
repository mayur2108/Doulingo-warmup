import React from 'react';

interface DuoButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export const DuoButton: React.FC<DuoButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  size = 'md',
  fullWidth = false
}) => {
  const baseStyles = "font-bold uppercase tracking-widest rounded-2xl transition-all active:translate-y-1 active:border-b-0 border-b-4 select-none";
  
  const variants = {
    primary: "bg-duo-green border-duo-greenDark text-white hover:bg-opacity-90",
    secondary: "bg-duo-blue border-duo-blueDark text-white hover:bg-opacity-90",
    danger: "bg-duo-red border-duo-redDark text-white hover:bg-opacity-90",
    outline: "bg-white border-duo-gray text-duo-grayText border-2 border-b-4 hover:bg-gray-50",
    ghost: "bg-transparent border-transparent text-duo-blue hover:bg-blue-50 border-b-0 active:translate-y-0"
  };

  const sizes = {
    sm: "py-2 px-4 text-xs border-b-[3px]",
    md: "py-3 px-6 text-sm",
    lg: "py-4 px-10 text-base",
    xl: "py-5 px-12 text-lg"
  };

  return (
    <button 
      onClick={onClick}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
    >
      {children}
    </button>
  );
};