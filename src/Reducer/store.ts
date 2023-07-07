import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import {ProjectsSlice} from 'src/Reducer/projectsSlice';
import {UserSlice} from 'src/Reducer/userSlice';
import rootSaga from 'src/Saga/RootSaga';

/* ------------- Saga Middleware ------------- */
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    projects: ProjectsSlice.reducer,
    users: UserSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
