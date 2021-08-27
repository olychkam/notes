import React, {ChangeEvent, useCallback, useState} from "react";
import {Button} from "../c-5-Button/Button";
import s from "./NotesField.module.scss";
import {Input} from "../c-6-Input/Input";
import {AddTag} from "../c-7-TagBlock/AddTag/AddTag";
import {TagContainer} from "../c-7-TagBlock/TagContainer";
import {useDispatch} from "react-redux";
import {addNotesAC, getNotesListTC, NotesType, updateNoteAC} from "../../3-redux/notes-reducer";
import {v1} from "uuid";
import {addTagAC, TagType} from "../../3-redux/tag-reducer";

type NotesFieldType = {
    notes: NotesType,
    setEditMode: (value: boolean) => void
    editMode: boolean
    updateNotes: (note: NotesType, areaText: string) => void
    tags: TagType[]
}

export const NotesField = (props: NotesFieldType) => {
    const dispatch = useDispatch()
    const [areaText, setAreaText] = useState<string>(props.notes.textNote)
    const tagsNameArray = props.tags.map(t => t.title.slice(1))

    const changeEditMode = () => {
        props.setEditMode(true)

    }
    const updateNote = () => {
        if (areaText.trim() !== '') {
            props.updateNotes(props.notes, areaText)
        } else {
            console.log('Title is required')
        }
    }
    const hashTagsArray = areaText.match(/#[0-9A-Za-zА-Яа-яё]+/g);

    const addTagOnKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode === 32 && hashTagsArray && hashTagsArray.length) {
            const tagTitle = hashTagsArray ? hashTagsArray[0] : ''
            setAreaText(areaText.replace(/#/g, ''))
            let newTag = v1()
            const newTagObjj: TagType = {
                id: newTag,
                title: `#${tagTitle.slice(1)}`,
                noteId: props.notes.id
            }
            // @ts-ignore
            dispatch(addTagAC(newTagObjj))
        }
    }
    return (
        <div className={s.container}>
            <div className={s.button}>
                <Button className={s.btn} onClick={updateNote}>Save</Button>
                <Button className={s.btn} onClick={changeEditMode}>Change</Button>
            </div>
            <div className={s.text}>
                {
                    !props.editMode
                        ? <div className={s.note_text}>{areaText}</div> :
                        <Input areaText={areaText}
                               className={s.inputBlock}
                               onKeyPress={addTagOnKeyPress}
                               setAreaText={setAreaText}
                               tagsNameArray={tagsNameArray}

                        />
                }
            </div>
        </div>
    )
}