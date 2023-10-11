import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    status: "",
    species:"",
    gender: "",
    image: "",
    location: "",
    episode: [],
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        addProfile: (state,action) => {
            const {name, status, species, gender, image, location, episode} = action.payload
            state.name = name
            state.status= status
            state.species= species
            state.gender = gender
            state.image = image
            state.location = location
            state.episode = episode
        }
    }
})

export const { addProfile } = profileSlice.actions;
export default profileSlice.reducer;