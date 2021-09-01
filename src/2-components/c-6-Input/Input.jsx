import React from "react";
import s from "./Input.module.scss";
import {HighlightWithinTextarea} from "react-highlight-within-textarea";


export const Input = (props) => {

    return (
        <HighlightWithinTextarea value={props.areaText}
                                 className={s.text_area}
                                 onKeyUp={props.onKeyPress}
                                 highlight={props.tagsNameArray}
                                 onChange={(event) => props.setAreaText (event.target.value)}
        />
    )
}