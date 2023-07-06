import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from './store';
import {STATUS_TYPE} from '../utils/requestStatusType';
import {Usertype} from '../Types/UserType';

type UserStateSliceType = {
  isLoading: boolean;
  usersList: Usertype[];
  status?: STATUS_TYPE;
}

const initialState: UserStateSliceType = {
  isLoading: false,
  usersList: [],
  status: void 0,
};

export const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // -------- Request users list --------
    requestUsers: (state: UserStateSliceType) => {
      state.isLoading = true;
      state.status = STATUS_TYPE.LOADING;
    },
    requestUsersSuccess: (state: UserStateSliceType, {payload}) => {
      state.isLoading = false;
      state.status = STATUS_TYPE.SUCCESS;
      state.usersList = [...payload];
    },
    requestUsersError: (state: UserStateSliceType) => {
      state.isLoading = false;
      state.status = STATUS_TYPE.ERROR;
    },

    // -------- Remove user --------
    removeUser: (state: UserStateSliceType) => {
      state.isLoading = true;
      state.status = STATUS_TYPE.LOADING;
    },
    removeUserSuccess: (state: UserStateSliceType, {payload: {id}}: PayloadAction<{id: number}>) => {
      const updatedArray = state.usersList.filter(project => project.id !== id);
      state.isLoading = false;
      state.status = STATUS_TYPE.SUCCESS;
      state.usersList = [...updatedArray];
    },
    removeUserError: (state: UserStateSliceType) => {
      state.isLoading = false;
      state.status = STATUS_TYPE.ERROR;
    },

    // -------- Update user --------
    updateUser: (state: UserStateSliceType) => {
      state.isLoading = true;
      state.status = STATUS_TYPE.LOADING;
    },
    updateUserError: (state: UserStateSliceType) => {
      state.isLoading = false;
      state.status = STATUS_TYPE.ERROR;
    },
    updateUserSuccess: (state: UserStateSliceType, {
      payload: {
        id,
        firstName,
        lastName,
      },
    }: PayloadAction<{id: number; firstName: string; lastName: string}>) => {
      const newList = state.usersList.map(item =>
        item.id === id ? {
          id,
          firstName,
          lastName,
          picture: 'https://cryptoast.fr/wp-content/uploads/2019/10/altcoins-crypto-monnaies.jpg',
        } : item,
      );
      state.isLoading = false;
      state.status = STATUS_TYPE.SUCCESS;
      state.usersList = newList;
    },

    // -------- Create user --------
    createUser: (state: UserStateSliceType) => {
      state.isLoading = true;
      state.status = STATUS_TYPE.LOADING;
    },
    createUserError: (state: UserStateSliceType) => {
      state.isLoading = false;
      state.status = STATUS_TYPE.ERROR;
    },
    createUserSuccess: (state: UserStateSliceType, {
      payload: {
        firstName,
        lastName,
      },
    }: PayloadAction<{firstName: string; lastName: string}>) => {
      state.isLoading = false;
      state.usersList = [...state.usersList, {
        id: Math.floor(Math.random() * 100),
        firstName,
        lastName,
        picture: 'https://img.freepik.com/vecteurs-libre/homme-affaires-caractere-avatar-isole_24877-60111.jpg?w=2000',
      }];
    },
  },
});

export const {
  requestUsers,
  requestUsersSuccess,
  requestUsersError,
  updateUser,
  updateUserError,
  updateUserSuccess,
  removeUser,
  removeUserError,
  removeUserSuccess,
  createUser,
  createUserError,
  createUserSuccess,
} = UserSlice.actions;

export const usersListSelector = (state: RootState) => state.users.usersList;

export default UserSlice.reducer;
