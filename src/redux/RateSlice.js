import {createSlice} from '@reduxjs/toolkit';

// const abc=JSON.parse(localStorage.getItem('rate'));
const initialState={
    rate:[]
};

export const RateSlice=createSlice({
    name:'rate',
    initialState:initialState,
    reducers:{
        add_rate:(state,action)=>{
            
            state.rate=action.payload;

        },
        
    }

})

export const{add_rate}=RateSlice.actions;
export default RateSlice.reducer;


// useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'))

//     if (user) {
//       dispatch({ type: 'LOGIN', payload: user }) 
//     }
//   }, [])