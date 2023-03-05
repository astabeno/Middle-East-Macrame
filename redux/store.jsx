import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from '@reduxjs/toolkit';

import { userSlice } from "./userSlice";


//conig store

export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
})

