import {createSlice} from '@reduxjs/toolkit'

export const dataSlice = createSlice(
    {
        name:'data',
        initialState:{
            showComment:'show'

        },
        reducers:{
           setShowComment:(state,action)=>{
            if(state.showComment==='show'){
                state.showComment='hide'
            }else
            state.showComment = 'show'
           }

        }
    }
)
export const {
    setShowComment
   
  } = dataSlice.actions;
  export default dataSlice.reducer;