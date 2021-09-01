import {applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware from 'redux-thunk'
import {notesReducer} from "./notes-reducer";
import {tagReducer} from "./tag-reducer";


export const rootReducer = combineReducers({
    notes: notesReducer,
    tags:tagReducer
})
/*export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})*/
export type AppStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
