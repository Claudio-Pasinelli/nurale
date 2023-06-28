import { combineReducers } from '@reduxjs/toolkit';
import { loginReduxer } from './auth';
import { usersReduxer } from './users';
import { userReduxer } from './user';
import { skillsReduxer } from './skills';
import { skillReduxer } from './skill';


const rootReducer = combineReducers(
{
    login: loginReduxer.reducer,
    users: usersReduxer.reducer,
    user: userReduxer.reducer,
    skills: skillsReduxer.reducer,
    skill: skillReduxer.reducer,
})

export default rootReducer