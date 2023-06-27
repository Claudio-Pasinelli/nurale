import { combineReducers } from '@reduxjs/toolkit';
import { loginReduxer } from './auth';
import { usersReduxer } from './users';


const rootReducer = combineReducers(
{
    login: loginReduxer.reducer,
    users: usersReduxer.reducer,
})

export default rootReducer