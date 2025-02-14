import React, { forwardRef, useRef } from 'react';
import '../../styles/commons/Reset.module.scss';
import typography from '../../styles/commons/Typography.module.scss';
import styles from '../../styles/commons/Input.module.scss';

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
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ id, type, name, value, onChange, placeholder, label }, ref) => {
        const inputRef = useRef<HTMLInputElement>(null);

        // 부모에서 ref를 사용하도록 하기 위해 useImperativeHandle 사용
        React.useImperativeHandle(
            ref,
            () => inputRef.current as HTMLInputElement
        );

        return (
            <div className={styles.inputWrap}>
                <label className={typography.textSmBd}>{label}</label>
                <input
                    id={id}
                    className={typography.textLgRg}
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
export const InputSignupEmail = forwardRef<HTMLInputElement, InputProps>(
    ({ type, name, value, onChange, placeholder, label }, ref) => {
        const inputRef = useRef<HTMLInputElement>(null);

        // 부모에서 ref를 사용하도록 하기 위해 useImperativeHandle 사용
        React.useImperativeHandle(
            ref,
            () => inputRef.current as HTMLInputElement
        );

        return (
            <div className={styles.input_email_check}>
                <label className={typography.textSmBd}>{label}</label>
                <input
                    className={typography.textLgRg}
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
        React.useImperativeHandle(
            ref,
            () => inputRef.current as HTMLInputElement
        );

        return (
            <>
                <label className={typography.textSmBd}>{label}</label>
                <input
                    className={typography.textLgRg}
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
//                 <label className={typography.textSmBd}>{label}</label>
//                 <input
//                     id={id}
//                     className={typography.textLgRg}
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
