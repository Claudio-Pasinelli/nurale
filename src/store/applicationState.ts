import { combineReducers } from '@reduxjs/toolkit';
import { loginReduxer } from './auth';
import { usersReduxer } from './users';
import { userReduxer } from './user';
import { skillsReduxer } from './skills';
import { skillReduxer } from './skill';
import { typeOfPaymentsReduxer } from './typeOfPayments';
import { typeOfPaymentReduxer } from './typeOfPayment';
import { customersReduxer } from './Customers';
import { customerReduxer } from './Customer';
import { skipAndTakeReducer } from './skipAndTake';

const rootReducer = combineReducers({
  login: loginReduxer.reducer,

  users: usersReduxer.reducer,
  user: userReduxer.reducer,

  skills: skillsReduxer.reducer,
  skill: skillReduxer.reducer,

  typeOfPayments: typeOfPaymentsReduxer.reducer,
  typeOfPayment: typeOfPaymentReduxer.reducer,

  customers: customersReduxer.reducer,
  customer: customerReduxer.reducer,

  skipAndTake: skipAndTakeReducer.reducer,
});

export default rootReducer;
