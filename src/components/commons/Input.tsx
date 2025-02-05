import React, { forwardRef, useRef } from "react";
import styles from "../../styles/Input.module.scss";

interface InputProps {
  type: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, value, onChange, placeholder }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // 부모에서 ref를 사용하도록 하기 위해 useImperativeHandle 사용
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    return (
      <input
        className={`${styles.input} ${styles.input_default}`}
        ref={inputRef}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  }
);

// 나중에 코드 줄일 예정
export const InputError = forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, value, onChange, placeholder }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    return (
      <input
        className={`${styles.input} ${styles.input_error}`}
        ref={inputRef}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  }
);
