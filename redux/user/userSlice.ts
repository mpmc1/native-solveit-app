import { createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../../types/autuh";
import { PURGE } from "redux-persist";

const initialState: UserModel = {
    username: "",
    password: "",
    email: "",
    nombreCompleto: "",
    numeroIdentificacion: "",
    tipoIdentificacion: "",
    descripcionPerfil: "",
    telefono: "",
};

export const userSlice = createSlice({
    name: "userSilce",
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

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;