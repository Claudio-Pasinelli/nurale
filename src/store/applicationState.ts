import { combineReducers } from '@reduxjs/toolkit';
import { loginReduxer } from './auth';
import { usersReduxer } from './users';
import { userReduxer } from './user';
import { skillsReduxer } from './skills';
import { skillReduxer } from './skill';
import { typeOfPaymentsReduxer } from './typeOfPayments';
import { typeOfPaymentReduxer } from './typeOfPayment';

const rootReducer = combineReducers(
{
    login: loginReduxer.reducer,

    users: usersReduxer.reducer,
    user: userReduxer.reducer,

    skills: skillsReduxer.reducer,
    skill: skillReduxer.reducer,

    typeOfPayments: typeOfPaymentsReduxer.reducer,
    typeOfPayment: typeOfPaymentReduxer.reducer,
})

export default rootReducer