import {call, put} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';

import {
  createUserError,
  createUserSuccess,
  removeUserError,
  removeUserSuccess,
  requestUsersError,
  requestUsersSuccess,
  updateUserError,
  updateUserSuccess,
} from "../Reducer/userSlice";

export function* requestUsers() {
  const fetchUsers = async () => await fetch('/api/users');
  const response = yield call(fetchUsers);

  if (response.ok) {
    yield put(requestUsersSuccess(JSON.parse(response._bodyInit)));
  } else {
    yield put(requestUsersError());
  }
}

export function* createUser({payload}: PayloadAction<{firstName: string; lastName: string}>) {
  const user = {
    firstName: payload.firstName,
    lastName: payload.lastName,
  };

  const createUserApi = async () => await fetch('/api/newUser', {method: 'POST', body: JSON.stringify(user)});
  const response: Response = yield call(createUserApi);
  if (response.ok) {
    yield put(createUserSuccess({...user}));
  } else {
    yield put(createUserError());
  }
}

export function* removeUser({payload}: PayloadAction<{id: number}>) {
  const removeUserApi = async () => await fetch(`/api/users/${payload.id}`, {method: 'DELETE'});
  const response: Response = yield call(removeUserApi);

  if (response.ok) {
    yield put(removeUserSuccess({id: payload.id}));
  } else {
    yield put(removeUserError());
  }
}

export function* updateUser({payload}: PayloadAction<{id: number; firstName: string; lastName: string}>) {
  const user = {
    id: payload.id,
    firstName: payload.firstName,
    lastName: payload.lastName,
  };

  const updateUserApi = async () => await fetch(`/api/user/${payload.id}`, {
    method: 'PATCH',
    body: JSON.stringify(user),
  });
  const response: Response = yield call(updateUserApi);

  if (response.ok) {
    yield put(updateUserSuccess({...payload}));
  } else {
    yield put(updateUserError());
  }
}
