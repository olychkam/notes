import React, {useCallback, useState} from 'react';
import {TextField} from '@material-ui/core';
import s from './Note.module.scss';
import {NotesField} from "../c-4-NotesField/NotesField";
import {Button} from "../c-5-Button/Button";
import {TagContainer} from "../c-7-TagBlock/TagContainer";
import {deleteNoteAC, NotesType, updateNoteAC} from "../../3-redux/notes-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../3-redux/store";
import {TagType} from "../../3-redux/tag-reducer";

export type PropsType = {
    note: NotesType
}

export const Note = (props: PropsType) => {
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState<boolean>(false)
    // @ts-ignore
    const tags = useSelector<AppStateType, TagType[]>(state => state.tags.filter(t => t.noteId === props.note.id))

    function updateNotes(note: NotesType, areaText: string) {
        const noteText = areaText.replace(/#/g, '')
        const updateNoteObj: NotesType = {
            id: note.id,
            title: note.title,
            textNote: noteText
        }
        if (areaText.trim() !== '') {
            dispatch(updateNoteAC(updateNoteObj))
            setEditMode(false)
        } else {
            const minLength = 1
            console.log('failed', `Text must be longer than ${minLength} symbol`)
        }
    }

    const deleteNote = useCallback(() => {
        dispatch(deleteNoteAC(props.note.id))
    }, [props.note.id])
    return (
        <div className={s.note}>
            <div className={s.headerNote}>
                <Button onClick={deleteNote}>X</Button>
            </div>
            <div className={s.title}>
                <h1>{props.note.title}</h1>
            </div>
            <NotesField notes={props.note} editMode={editMode}
                        setEditMode={setEditMode} updateNotes={updateNotes}
                        tags={tags}/>
            <TagContainer tag={tags} noteId={props.note.id} editMode={editMode}/>
        </div>
    )
}