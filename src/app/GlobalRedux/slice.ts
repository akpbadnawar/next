"use client"

import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = {
    email: []
}

const Slice = createSlice({
    name:'addEmailSlice',
    initialState,
    reducers:{
        addEmail:(state,action)=>{
            const data={
                id:nanoid(),
                email:action.payload
            }
            state.email.push(data);
        }
    }
})

export const {addEmail} = Slice.actions;
export default Slice.reducer;