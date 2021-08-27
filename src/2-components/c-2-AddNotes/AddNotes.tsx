import React, {ChangeEvent, useState} from 'react';
import s from '../../4-app/App.module.scss'
import {Button, TextField} from "@material-ui/core";

type AddNotesType = {
    addNote: (title: string) => void
}

export const AddNotes = (props: AddNotesType) => {
    const [noteText, setNoteText] = useState<string>('')

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNoteText(e.currentTarget.value)
    }
    const addNote = () => {
        if (noteText.trim() !== '') {
            props.addNote(noteText)
            setNoteText('')
        } else {
            console.log('Title is required')
        }
    }
    return (
        <div className={s.addNotes}>
            <TextField value={noteText} onChange={inputHandler} id="filled-basic" label="Add Notes" variant="filled"/>
            <Button onClick={addNote} variant="outlined" color="inherit">Add</Button>
        </div>
    )
}