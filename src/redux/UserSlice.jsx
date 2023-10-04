import {createSlice} from '@reduxjs/toolkit';

const abc=JSON.parse(localStorage.getItem('user'));
const initialState={
    user:abc
};

export const UserSlice=createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        login:(state,action)=>{
            
            state.user=action.payload;

        },
        logout:(state,action)=>{
            state.user=null;
        }
    }

})

export const{login,logout}=UserSlice.actions;
export default UserSlice.reducer;


// useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'))

//     if (user) {
//       dispatch({ type: 'LOGIN', payload: user }) 
//     }
//   }, [])