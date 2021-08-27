import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./store";
import {tagsAPI} from "../1-api/api";
import {v1} from "uuid";

export type TagType = {
    id: string
    title: string
    noteId: string
}
export const initialState: TagType[] = []
type InitialStateType = typeof initialState
type ActionType = ReturnType<typeof setTagAC> | ReturnType<typeof addTagAC>
|ReturnType<typeof deleteTagAC>


export const tagReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case'SET-TAG':
            return [...action.tags]
        case 'ADD-TAG':
            return [...state, action.tag]
        case 'DELETE-TAG':
            return state.filter(t => t.id !== action.id)
        default:
            return state
    }
}

export const setTagAC = (tags: TagType[]) => ({type: 'SET-TAG', tags} as const)
export const addTagAC = (tag: TagType[]) => ({type: 'ADD-TAG', tag} as const)
export const deleteTagAC = (id:string) => ({type: 'DELETE-TAG', id} as const)
export const getTagsListTC = () => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
    try {
        const res = await tagsAPI.getTags()
        // @ts-ignore
        dispatch(setTagAC(res.data.tags));
    } catch (error) {
        console.log('failed', 'Some error occurred')
    }
}
