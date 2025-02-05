import React from 'react';
import styles from '../Forms/index.module.scss';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type, value, onChange, required = false }) => {
  return (
    <div className={styles.inputField}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputField;
