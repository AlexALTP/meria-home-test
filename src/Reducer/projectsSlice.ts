import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from 'src/Reducer/store';
import {STATUS_TYPE} from 'src/utils/requestStatusType';
import {ProjectType} from 'src/Types/ProjectType';

type ProjectsStateType = {
  isLoading: boolean;
  projectsList: ProjectType[];
  status?: STATUS_TYPE;
}

const initialState: ProjectsStateType = {
  isLoading: false,
  projectsList: [],
  status: void 0,
};

export const ProjectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    // -------- Request projects list --------
    requestProjects: (state: ProjectsStateType) => {
      state.isLoading = true;
      state.status = STATUS_TYPE.LOADING;
    },
    requestProjectsSuccess: (state: ProjectsStateType, {payload}) => {
      state.isLoading = false;
      state.status = STATUS_TYPE.SUCCESS;
      state.projectsList = [...payload];
    },
    requestProjectsError: (state: ProjectsStateType) => {
      state.isLoading = false;
      state.status = STATUS_TYPE.ERROR;
    },

    // -------- Remove project --------
    removeProject: (state: ProjectsStateType, _payload) => {
      state.isLoading = true;
      state.status = STATUS_TYPE.LOADING;
    },
    removeProjectSuccess: (state: ProjectsStateType, {payload: {id}}: PayloadAction<{id: number}>) => {
      const updatedArray = state.projectsList.filter(project => project.id !== id);
      state.isLoading = false;
      state.status = STATUS_TYPE.SUCCESS;
      state.projectsList = [...updatedArray];
    },
    removeProjectError: (state: ProjectsStateType) => {
      state.isLoading = false;
      state.status = STATUS_TYPE.ERROR;
    },

    // -------- Update project --------
    updateProject: (state: ProjectsStateType, _payload) => {
      state.isLoading = true;
      state.status = STATUS_TYPE.LOADING;
    },
    updateError: (state: ProjectsStateType) => {
      state.isLoading = false;
      state.status = STATUS_TYPE.ERROR;
    },
    updateSuccess: (state: ProjectsStateType, {
      payload: {
        id,
        description,
        title,
        ownersList,
      },
    }: PayloadAction<{id: number; description: string; title: string; ownersList: any}>) => {
      const newList = state.projectsList.map(item =>
        item.id === id ? {
          id,
          description,
          name: title,
          ownersList,
          picture: 'https://cryptoast.fr/wp-content/uploads/2019/10/altcoins-crypto-monnaies.jpg',
        } : item,
      );
      state.isLoading = false;
      state.status = STATUS_TYPE.SUCCESS;
      state.projectsList = newList;
    },

    // -------- Create project --------
    createProject: (state: ProjectsStateType, _payload) => {
      state.isLoading = true;
      state.status = STATUS_TYPE.LOADING;
    },
    createProjectError: (state: ProjectsStateType) => {
      state.isLoading = false;
      state.status = STATUS_TYPE.ERROR;
    },
    createProjectSuccess: (state: ProjectsStateType, {
      payload: {
        description,
        title,
        ownersList,
      },
    }: PayloadAction<{description: string; title: string; ownersList: any}>) => {
      state.isLoading = false;
      state.projectsList = [...state.projectsList, {
        id: Math.floor(Math.random() * 100),
        name: title,
        description,
        picture: 'https://cryptoast.fr/wp-content/uploads/2019/10/altcoins-crypto-monnaies.jpg',
        ownersList: [...ownersList],
      }];
    },
  },
});

export const {
  requestProjects,
  requestProjectsSuccess,
  requestProjectsError,
  removeProject,
  removeProjectError,
  removeProjectSuccess,
  createProjectSuccess,
} = ProjectsSlice.actions;

export const isLoadingSelector = (state: RootState) => state.projects.isLoading;
export const projectsListSelector = (state: RootState) => state.projects.projectsList;

export default ProjectsSlice.reducer;
