import {createSlice} from '@reduxjs/toolkit'

export const dataSlice = createSlice(
    {
        name:'data',
        initialState:{
            showComment:'show',
            number:'CHATTER',
            photo_Url:''

        },
        reducers:{
           setShowComment:(state,action)=>{
            if(state.showComment==='show'){
                state.showComment='hide'
            }else
            state.showComment = 'show'
           },
           increment:(state)=>{
            state.number='CHATTER'
           },
           setPhoto_Url:(state,action)=>{
            state.photo_Url=action.payload
           }

        }
    }
)
export const {
    setShowComment,
    increment,
    setPhoto_Url
   
  } = dataSlice.actions;
  export default dataSlice.reducer;