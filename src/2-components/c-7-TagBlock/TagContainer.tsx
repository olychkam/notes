import React, {useCallback} from "react";
import {AddTag} from "./AddTag/AddTag";
import s from "./TagContainer.module.scss"
import {Tag} from "../c-8-Tag/Tag";
import {addTagAC, TagType} from "../../3-redux/tag-reducer";
import {v1} from "uuid";
import {useDispatch} from "react-redux";

type PropsTagContainerType = {
    tag: TagType[],
    noteId: string,
    editMode: boolean
}

export const TagContainer: React.FC<PropsTagContainerType> = ({tag, editMode,noteId,children}) => {
    const dispatch = useDispatch()
     const addTag = (title: string, noteId: string) => {
        let newTag = v1()
        const newTagObj: TagType = {
            id: newTag,
            title: `#${title}`,
            noteId: noteId
        }
        // @ts-ignore
        dispatch(addTagAC(newTagObj))
    }

    const mappedTags = useCallback(() => {
        return tag && tag.map(tag => <Tag key={tag.id}
                                                      tag={tag}
                                                      editMode={editMode}/>
        )
    }, [tag,editMode])
    return (
        <div className={s.container}>
            {mappedTags()}
            <AddTag addTag={addTag} noteId={noteId}/>

        </div>
    )
}