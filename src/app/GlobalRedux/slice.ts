"use client"
type InitialState = {
    email:string
}

import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState : InitialState = {
    email: ""
}

const Slice = createSlice({
    name:'addEmailSlice',
    initialState,
    reducers:{
        addEmail:(state,action)=>{
            state.email = action.payload
        }
    }
})

export const {addEmail} = Slice.actions;
export default Slice.reducer;