import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface UserData {
    id: number,
    username: string,
    password: string,
    email: string,
    nombreCompleto: string,
    numeroIdentificacion: string,
    tipoIdentificacion: string,
    descripcionPerfil: string,
    telefono: string,
}

const initialState: UserData = {
    id: 0,
    username: "",
    password: "",
    email: "",
    nombreCompleto: "",
    numeroIdentificacion: "",
    tipoIdentificacion: "",
    descripcionPerfil: "",
    telefono: "",
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => { return initialState }) // TODO: al momento de hacer logout llamar persistor.purge()
    }
});

export const { setUser, clearUser } = UserData.actions;
export default UserData.reducer;