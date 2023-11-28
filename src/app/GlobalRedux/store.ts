"use client"

import { configureStore } from "@reduxjs/toolkit"
import reducer from './slice'

export const store = configureStore({
    reducer:reducer //if key and value are same we can write this as reducer
})