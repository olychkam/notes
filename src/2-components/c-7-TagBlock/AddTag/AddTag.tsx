import React, {ChangeEvent, useState} from "react";
import {Button} from "../../c-5-Button/Button";
import s from "./AddTag.module.scss";
import {Input} from "@material-ui/core";

type AddTagType = {
    noteId: string,
    addTag: (title: string, noteId: string) => void

}

export const AddTag = (props: AddTagType) => {
    const [tagText, setTagText] = useState<string>('')
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTagText(e.currentTarget.value)
    }
    const addTag = () => {
        if (tagText.trim() !== '') {
            props.addTag(tagText, props.noteId)
            setTagText('')
            console.log('VSE OK')
        } else {
            console.log('Title is required')
        }
    }
    return (
        <div className={s.tag}>
            <Input value={tagText} onChange={inputHandler} type="text" placeholder='Add tag...' className={s.input}/>
            <Button onClick={addTag}>Add</Button>
        </div>
    )
}