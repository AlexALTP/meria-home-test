import {all, takeEvery, takeLatest} from 'redux-saga/effects';
import {UserSlice} from '../Reducer/userSlice';
import {createUser, removeUser, requestUsers, updateUser} from './UserSaga';
import {ProjectsSlice} from '../Reducer/projectsSlice';
import {createProject, removeProject, requestProjects, updateProject} from './ProjectSaga';

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
