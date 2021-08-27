import React, {useCallback} from 'react';
import {deleteTagAC, TagType} from "../../3-redux/tag-reducer";
import {deleteNoteAC} from "../../3-redux/notes-reducer";
import {useDispatch} from "react-redux";
import s from "./Tag.module.scss";
import {Button} from "@material-ui/core";


export type PropsType = {
    tag: TagType
    editMode:boolean
}

export const Tag = (props: PropsType) => {
    const dispatch = useDispatch()
    const deleteNote = useCallback(() => {
        dispatch(deleteTagAC(props.tag.id))
    }, [props.tag.id])
    return (
        <div className={s.tag}>
            {props.tag.title}
            {props.editMode &&  <Button className={s.tagBtn} onClick={deleteNote}>X</Button>}
        </div>
    )
}