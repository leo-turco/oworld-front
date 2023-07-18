import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import { AlertType } from '../../../@types/alert';
import { Picture } from '../../../@types/pictures';
import axios from 'axios';

// Define the interface for the state
interface PictureState {
  pictures: Picture[] | null;
  loading: boolean;
  infiniteLoading: boolean;
  alert: AlertType | null;
}

// Define the initial state
const initialState: PictureState = {
  loading: false,
  infiniteLoading: false,
  alert: null,
  pictures: [],
};

/**
 * Action to clear the infos alert.
 */
export const clearInfosAlert = createAction('infos/clearAlert');

/**
 * Async thunk to fetch radio data.
 */
export const fetchPictures = createAsyncThunk(
  'country/fetchPictures',
  async (countryId: string) => {
    try {
      const response = await axiosInstance.get(`/oworld/${countryId}/unsplash`);
      return response.data;
    } catch (error: string | any) {
      throw new Error(error.response.data.message as string);
    }
  }
);

/**
 * Reducer for the infos state.
 */
const pictureReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchPictures.pending, (state) => {
      state.loading = true;
      state.infiniteLoading = true;
      state.alert = null;
    })
    .addCase(fetchPictures.fulfilled, (state, action) => {
      state.loading = false;
      state.infiniteLoading = false;
      state.pictures = action.payload;
    })
    .addCase(fetchPictures.rejected, (state, action) => {
      state.loading = false;
      state.infiniteLoading = true;
      state.alert = {
        type: 'error',
        message: action.error.message || 'Unknown error occurred.',
      };
    })
    .addCase(clearInfosAlert, (state) => {
      state.alert = null;
    });
});

export default pictureReducer;
