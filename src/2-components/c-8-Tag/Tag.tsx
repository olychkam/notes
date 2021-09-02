import React, {useCallback} from 'react';
import {deleteTagAC, TagType} from "../../3-redux/tag-reducer";
import {useDispatch} from "react-redux";
import s from "./Tag.module.scss";
import {Button} from "@material-ui/core";


export type PropsType = {
    tag: TagType
    editMode:boolean
}

export const Tag: React.FC<PropsType> = ({tag, editMode}) => {
    const dispatch = useDispatch()
    const deleteNote = useCallback(() => {
        dispatch(deleteTagAC(tag.id))
    }, [tag])
    return (
        <div className={s.tag}>
            {tag.title}
            {editMode &&  <Button className={s.tagBtn} onClick={deleteNote}>X</Button>}
        </div>
    )
}