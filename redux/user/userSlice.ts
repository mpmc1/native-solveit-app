import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface UserDataModel {
    token: string,
    username: string,
    password: string,
    email: string,
    nombreCompleto: string,
    numeroIdentificacion: string,
    tipoIdentificacion: string,
    descripcionPerfil: string,
    telefono: string,
}

const initialState: UserDataModel = {
    token: null,
    username: null,
    password: null,
    email: null,
    nombreCompleto: null,
    numeroIdentificacion: null,
    tipoIdentificacion: null,
    descripcionPerfil: null,
    telefono: null,
};

export const UserData = createSlice({
    name: "UserData",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state = action.payload
            return state
        },
        clearUser: (state) => {
            state = initialState
            return state
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => { return initialState }) // TODO: al momento de hacer logout llamar persistor.purge()
    }
});

export const { setUser, clearUser } = UserData.actions;
export default UserData;