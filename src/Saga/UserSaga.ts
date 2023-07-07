import {call, put} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';

import {UserSlice} from 'src/Reducer/userSlice';

export function* requestUsers() {
  const fetchUsers = async () => fetch('/api/users');
  const response = yield call(fetchUsers);

  if (response.ok) {
    yield put(UserSlice.actions.requestUsersSuccess(JSON.parse(response._bodyInit)));
  } else {
    yield put(UserSlice.actions.requestUsersError());
  }
}

export function* createUser({payload}: PayloadAction<{firstName: string; lastName: string}>) {
  const user = {
    firstName: payload.firstName,
    lastName: payload.lastName,
  };

  const createUserApi = async () => fetch('/api/newUser', {method: 'POST', body: JSON.stringify(user)});
  const response: Response = yield call(createUserApi);
  if (response.ok) {
    yield put(UserSlice.actions.createUserSuccess({...user}));
  } else {
    yield put(UserSlice.actions.createUserError());
  }
}

export function* removeUser({payload}: PayloadAction<{id: number}>) {
  const removeUserApi = async () => fetch(`/api/users/${payload.id}`, {method: 'DELETE'});
  const response: Response = yield call(removeUserApi);

  if (response.ok) {
    yield put(UserSlice.actions.removeUserSuccess({id: payload.id}));
  } else {
    yield put(UserSlice.actions.removeUserError());
  }
}

export function* updateUser({payload}: PayloadAction<{id: number; firstName: string; lastName: string}>) {
  const user = {
    id: payload.id,
    firstName: payload.firstName,
    lastName: payload.lastName,
  };

  const updateUserApi = async () => fetch(`/api/user/${payload.id}`, {
    method: 'PATCH',
    body: JSON.stringify(user),
  });
  const response: Response = yield call(updateUserApi);

  if (response.ok) {
    yield put(UserSlice.actions.updateUserSuccess({...payload}));
  } else {
    yield put(UserSlice.actions.updateUserError());
  }
}
