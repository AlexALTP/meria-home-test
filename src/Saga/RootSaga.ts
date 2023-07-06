import {all, takeEvery, takeLatest} from 'redux-saga/effects';
import {ProjectsSlice} from '../Reducer/projectsSlice';
import {createProject, removeProject, requestProjects, updateProject} from './ProjectSaga';

export default function *rootSaga() {
  yield all([
    takeLatest(ProjectsSlice.actions.requestProjects, requestProjects),
    takeLatest(ProjectsSlice.actions.createProject, createProject),
    takeLatest(ProjectsSlice.actions.updateProject, updateProject),
    takeEvery(ProjectsSlice.actions.removeProject, removeProject),
  ]);
}
