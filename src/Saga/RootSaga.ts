import {all, takeEvery, takeLatest} from 'redux-saga/effects';

import {UserSlice} from 'src/Reducer/userSlice';
import {createUser, removeUser, requestUsers, updateUser} from 'src/Saga/UserSaga';
import {ProjectsSlice} from 'src/Reducer/projectsSlice';
import {createProject, removeProject, requestProjects, updateProject} from 'src/Saga/ProjectSaga';

export default function* rootSaga() {
  yield all([
    // ---- Project saga ----
    takeLatest(ProjectsSlice.actions.requestProjects, requestProjects),
    takeLatest(ProjectsSlice.actions.createProject, createProject),
    takeLatest(ProjectsSlice.actions.updateProject, updateProject),
    takeEvery(ProjectsSlice.actions.removeProject, removeProject),
    // ---- User saga ----
    takeLatest(UserSlice.actions.requestUsers, requestUsers),
    takeLatest(UserSlice.actions.createUser, createUser),
    takeLatest(UserSlice.actions.updateUser, updateUser),
    takeEvery(UserSlice.actions.removeUser, removeUser),
  ]);
}
