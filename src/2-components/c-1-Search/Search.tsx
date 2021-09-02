import React, {useCallback, useState} from 'react';
import s from '../../4-app/App.module.scss'
import {Button} from '@material-ui/core';
import {TextField} from '@material-ui/core';
import {useDispatch} from "react-redux";
import {getNotesListTC} from "../../3-redux/notes-reducer";

type SearchPropsType = {
    findNote: (value: string) => void
}

export const Search = (props: SearchPropsType) => {
    const dispatch = useDispatch()
    const [value, setValue] = useState<string>('')

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onSendRequest = useCallback(() => {
        if (value.trim() !== '') {
            props.findNote(`#${value}`)
            setValue('')
            console.log('VSE OK')
        } else {
            console.log('Title is required')
        }
    }, [value,props.findNote])

    const showAll = useCallback(() => {
        dispatch(getNotesListTC())
    }, [dispatch])

    return (
        <div className={s.search}>
            <TextField value={value}
                       placeholder='Search...'
                       onChange={inputHandler}
                       id="filled-basic" label="Search Notes" variant="filled"/>
            <Button onClick={showAll} variant="outlined" color="inherit">All</Button>
            <Button onClick={onSendRequest} variant="outlined" color="inherit">Filter</Button>
        </div>
    )
}