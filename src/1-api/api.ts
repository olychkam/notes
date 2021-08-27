import axios from "axios"
import {NotesType} from "../3-redux/notes-reducer";
import {TagType} from "../3-redux/tag-reducer";
const defaultOptions = {
    withCredentials: true,
    headers: {
        Accept: 'application/json',
    }
}

const axiosInstance = axios.create(defaultOptions);

export const notesAPI = {
    getNotes() {
        return axiosInstance.get<NotesType[]>('/notes.json')
            .then(res => res)
    },
    addNotes(newNote: NotesType) {
        return axiosInstance.post<ResponseType>('/notes.json', newNote)
            .then(res => res)
    }
}
export const tagsAPI = {
    getTags() {
        return axiosInstance.get<TagType[]>(`/notes.json`)
            .then(res => res)
    }
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}