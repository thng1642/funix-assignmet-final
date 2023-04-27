import { PayloadAction, createSlice } from "@reduxjs/toolkit"


import { Product } from "../../model/product"

const initialState: Product[] = [] as Product[]

const filterSlice = createSlice({

    name: 'filter',
    initialState,
    reducers: {

        getKeyFilter(state, action: PayloadAction<string | null >){
            
            return []
        },

        filterSuccess(state, action: PayloadAction<Product[]>){
            
            let tmp = [...action.payload]
            return tmp
        }
        
    }
})

// Reducers
const filterReducers = filterSlice.reducer
export default filterReducers
// Actions
export const filterActions = filterSlice.actions