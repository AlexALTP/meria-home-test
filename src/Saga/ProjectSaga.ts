import {call, put} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';

import {
  createProjectError,
  createProjectSuccess,
  removeProjectError,
  removeProjectSuccess,
  requestProjectsSuccess,
  updateError,
  updateSuccess,
} from 'src/Reducer/projectsSlice';

export function* requestProjects() {
  const fetchProjects = async () => fetch('/api/projects');
  const response = yield call(fetchProjects);

  if (response.ok) {
    yield put(requestProjectsSuccess(JSON.parse(response._bodyInit)));
  } else {
    yield put(removeProjectError());
  }
}

export function* createProject({payload}: any) {
  const project = {
    title: payload.title,
    description: payload.description,
    ownersList: payload.ownersList,
  };

  const createProjectApi = async () => fetch('/api/newProject', {method: 'POST', body: JSON.stringify(project)});
  const response: Response = yield call(createProjectApi);
  if (response.ok) {
    yield put(createProjectSuccess({...project}));
  } else {
    yield put(createProjectError());
  }
}

export function* removeProject({payload}: PayloadAction<{id: number}>) {
  const removeProjectApi = async () => fetch(`/api/project/${payload.id}`, {method: 'DELETE'});
  const response: Response = yield call(removeProjectApi);

  if (response.ok) {
    yield put(removeProjectSuccess({id: payload.id}));
  } else {
    yield put(removeProjectError());
  }
}

export function* updateProject({payload}: PayloadAction<{id: number; description: string; title: string; ownersList: any}>) {
  const project = {
    id: payload.id,
    title: payload.title,
    description: payload.description,
    ownersList: payload.ownersList,
  };

  const updateProjectApi = async () => fetch(`/api/project/${payload.id}`, {
    method: 'PATCH',
    body: JSON.stringify(project),
  });
  const response: Response = yield call(updateProjectApi);

  if (response.ok) {
    yield put(updateSuccess({...payload}));
  } else {
    yield put(updateError());
  }
}
