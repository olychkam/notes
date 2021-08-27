import {ThunkDispatch} from "redux-thunk"
import {AppStateType} from "./store";
import {notesAPI} from "../1-api/api";

export type NotesType = {
    id: string,
    title: string,
    textNote: string
}
const initialState: NotesType[] = []
type InitialStateType = typeof initialState
type ActionType = ReturnType<typeof setNotesAC> | ReturnType<typeof addNotesAC> | ReturnType<typeof updateNoteAC>
    | ReturnType<typeof deleteNoteAC> | ReturnType<typeof setNodesFilter>

const findNotesObject = (idArr: string[], notesArr: NotesType[]) => {
    let arr = []
    for (let i = 0; i < notesArr.length; i++) {
        for (let j = 0; j < idArr.length; j++) {
            if (notesArr[i].id === idArr[j]) {
                arr.push(notesArr[i])
            }
        }
    }
    return arr
}
export const notesReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-NOTE':
            return [...action.notes]
        case 'ADD-NOTE':
            return [action.note, ...state]
        case 'UPDATE-NOTE':
            return state.map(note => note.id === action.note.id ? action.note : note)
        case "DELETE-NOTE":
            return state.filter(n => n.id !== action.id)
        case "FILTER-NOTES":
            return findNotesObject(action.nodeId, [...state])
        default:
            return state;
    }
}

export const setNotesAC = (notes: NotesType[]) => ({type: 'SET-NOTE', notes} as const)
export const addNotesAC = (note: NotesType) => ({type: 'ADD-NOTE', note} as const)
export const updateNoteAC = (note: NotesType) => ({type: 'UPDATE-NOTE', note} as const)
export const deleteNoteAC = (id: string) => ({type: 'DELETE-NOTE', id} as const)
export const setNodesFilter = (nodeId: string[]) => ({type: 'FILTER-NOTES', nodeId} as const)


export const getNotesListTC = () => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
    try {
        const res = await notesAPI.getNotes()
        // @ts-ignore

        dispatch(setNotesAC(res.data.notes)
        );
    } catch (error) {
        console.log('failed', 'Some error occurred')
    }
}
/*export const addNoteTC = (title: string) => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
    try {
        const newNoteObj: NotesType = {
            id: v1(),
            title: title,
            textNote: 'Add notes'
        }
        await notesAPI.addNotes(newNoteObj)
        dispatch(addNotesAC(newNoteObj));
    } catch (error) {
        console.log('failed', 'Some error occurred')
    }
}*/



