import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import s from "./Button.module.scss";

type PropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type ButtonPropsType = PropsType & {}
export const Button: React.FC<ButtonPropsType> = ({children,onClick}) => {
    return (
        <div>
            <button onClick={onClick} className={s.btn}>{children}</button>
        </div>
    )
}