import React, { forwardRef, useRef } from "react";
import styles from "../../styles/Input.module.scss";

interface InputProps {
  type: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, value, onChange, placeholder, label }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // 부모에서 ref를 사용하도록 하기 위해 useImperativeHandle 사용
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    return (
      <div className={styles.background}>
        <label className={styles.label}>{label}</label>
        <input
          className={`${styles.input} ${styles.input_default}`}
          ref={inputRef}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

// 나중에 코드 줄일 예정
export const Input_Error = forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, value, onChange, placeholder, label }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // 부모에서 ref를 사용하도록 하기 위해 useImperativeHandle 사용
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    return (
      <>
        <label>{label}</label>
        <input
          className={`${styles.input} ${styles.input_default}`}
          ref={inputRef}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </>
    );
  }
);
