import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    status: "",
    species:"",
    gender: "",
    image: "",
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        addProfile: (state,action) => {
            const {name, status, species, gender, image} = action.payload
            state.name = name
            state.status= status
            state.species= species
            state.gender = gender
            state.image = image
        }
    }
})

export const { addProfile } = profileSlice.actions;
export default profileSlice.reducer;