import React, { forwardRef, useRef } from "react";

interface InputProps {
  style?: string;
  disabled?: boolean;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: any;
  onFocus?: any;
  onBlur?: any;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, name, value, onChange, placeholder, label, onKeyDown }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // 부모에서 ref를 사용하도록 하기 위해 useImperativeHandle 사용
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    return (
      <div className="inputWrap grow flex flex-wrap flex-col gap-[0.375rem]">
        <label className="grow text-xs font-bd text-gray-8 ">{label}</label>
        <input
          id={id}
          ref={inputRef}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          className="w-full grow flex p-4 text-sm font-rg rounded-[16px] border-2 border-gray-6 bg-yellow-1"
        />
      </div>
    );
  }
);
export const InputSignupEmail = forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, value, onChange, placeholder, label }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // 부모에서 ref를 사용하도록 하기 위해 useImperativeHandle 사용
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    return (
      <div>
        <label>{label}</label>
        <input
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

//일정 확정 input
// export const DateCompleteInput = forwardRef<HTMLInputElement, InputProps>(
//     (
//         {
//             style,
//             disabled,
//             id,
//             type,
//             name,
//             value,
//             onChange,
//             placeholder,
//             label,
//         },
//         ref
//     ) => {
//         const inputRef = useRef<HTMLInputElement>(null);

//         // 부모에서 ref를 사용하도록 하기 위해 useImperativeHandle 사용
//         React.useImperativeHandle(
//             ref,
//             () => inputRef.current as HTMLInputElement
//         );

//         return (
//             <div
//                 className={
//                     style === 'dateEdit'
//                         ? styles.EditDateWrap
//                         : styles.DateCompleteInputWrap
//                 }
//             >
//                 <label >{label}</label>
//                 <input
//                     id={id}
//
//                     ref={inputRef}
//                     type={type}
//                     name={name}
//                     value={value}
//                     onChange={onChange}
//                     placeholder={placeholder}
//                     disabled={disabled}
//                 />
//             </div>
//         );
//     }
// );
