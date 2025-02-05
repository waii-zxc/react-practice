import React from 'react';
import styles from "./Button.module.scss";

interface ButtonProps {
  className: string;
  onClick: () => void;
  text: React.ReactNode;
  children?: React.ReactNode;
  type?: "button";
}

export default function Button({ className, onClick, text, children, type = "button" }: ButtonProps) {
  return (
    <button className={styles[className]} onClick={onClick} type={type}>
      {text}
      {children}
    </button>
  );
}
