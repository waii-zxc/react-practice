import React from 'react';
import "./Button.module.scss";

interface ButtonProps {
  className: string;
  onClick: () => void;
  text: any;
  children?: React.ReactNode;
  type?: "button";
}

export default function Button({ className, onClick, text, children, type = "button" }: ButtonProps) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {text}
      {children}
    </button>
  );
}
