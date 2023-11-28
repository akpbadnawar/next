"use client"

import {createSlice, nanoid} from '@reduxjs/toolkit';

const startingState = {
    email: []
}

const Slice = createSlice({
    name:'addEmailSlice',
    initialState:startingState,
    reducers:{
        addEmail:(state,action)=>{
            console.log(action)
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