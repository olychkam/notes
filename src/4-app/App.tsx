import React, {useCallback, useEffect, useState} from 'react';
import s from './App.module.scss';
import {Search} from "../2-components/c-1-Search/Search";
import {AddNotes} from "../2-components/c-2-AddNotes/AddNotes";
import {Note} from "../2-components/c-3-Note/Note";
import {useDispatch, useSelector} from "react-redux";
import {addNotesAC, getNotesListTC, NotesType, setNodesFilter, setNotesAC} from "../3-redux/notes-reducer";
import axios from "axios";
import {AppStateType} from "../3-redux/store";
import {v1} from "uuid";
import {getTagsListTC} from "../3-redux/tag-reducer";

function App() {
    const dispatch = useDispatch()
    const [notes, setNotes] = useState<Array<NotesType>>([])
    const notesArr = useSelector((state: AppStateType) => state.notes)
    const tagsArr=useSelector((state: AppStateType) => state.tags)
    /* const addNote = useCallback((title: string) => {
         const thunk = addNoteTC(title)
         dispatch(thunk)
     }, [])*/
    function addNote(title: string) {
        let newNote = v1();
        const newNoteObj: NotesType = {
            id: newNote,
            title: title,
            textNote: 'Add notes'
        }
        dispatch(addNotesAC(newNoteObj))
        //setNotes([newNoteObj, ...notes]);
    }

    useEffect(() => {
        dispatch(getNotesListTC())
        dispatch(getTagsListTC())

    }, [])


    const mappedNotes = useCallback(() => {
        return notesArr && notesArr.map((note, index) => {
            return <Note key={note.id}
                         note={note}
            />
        })
    }, [notesArr])

    const findNote = (value: string) => {
        // @ts-ignore
        const notesId = tagsArr.filter(t => t.title === value).map(t => t.noteId)
        dispatch(setNodesFilter(notesId))
    }

    return (
        <div className={s.app}>
            <h1 className={s.name}>NOTES</h1>
            <Search findNote={findNote}/>
            <AddNotes addNote={addNote}/>
            <div className={s.note}>
                {
                    mappedNotes()
                }
            </div>
        </div>
    );
}

export default App;
