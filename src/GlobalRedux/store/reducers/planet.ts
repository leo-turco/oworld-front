import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import { AlertType } from '../../../@types/alert';
import {
  Earth,
  IPlanet,
  Jupiter,
  Mars,
  Mercury,
  Neptune,
  Saturn,
  Uranus,
  Venus,
} from '../../../@types/planetDatas';

interface PlanetState {
  planetData: IPlanet;
  mercuryData: Mercury;
  venusData: Venus;
  earthData: Earth;
  marsData: Mars;
  jupiterData: Jupiter;
  saturnData: Saturn;
  uranusData: Uranus;
  neptuneData: Neptune;
  loading: boolean;
  infiniteLoading: boolean;
  alert: AlertType | null;
}

const initialState: PlanetState = {
  planetData: {} as IPlanet,
  mercuryData: {} as Mercury,
  venusData: {} as Venus,
  earthData: {} as Earth,
  marsData: {} as Mars,
  jupiterData: {} as Jupiter,
  saturnData: {} as Saturn,
  uranusData: {} as Uranus,
  neptuneData: {} as Neptune,
  loading: false,
  infiniteLoading: false,
  alert: null,
};

export const clearPlanetAlert = createAction('planet/clearAlert');

/**
 * Async thunk to fetch Mercury data.
 */

export const fetchPlanetData = createAsyncThunk(
  'oworld/fetchPlanetData',
  async () => {
    const response = await axiosInstance.get('/oworld');
    return response.data;
  }
);

export const fetchEarthData = createAsyncThunk(
  'earth/fetchEarthData',
  async () => {
    try {
      const response = await axiosInstance.get('/oworld');
      return response.data.Earth;
    } catch (error: string | any) {
      throw new Error(error.response.data.message as string);
    }
  }
);

/**
 * Reducer for the planet state.
 */
const planetReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchPlanetData.pending, (state) => {
      state.loading = true;
      state.infiniteLoading = true;
      state.alert = null;
    })
    .addCase(fetchPlanetData.fulfilled, (state, action) => {
      state.loading = false;
      state.infiniteLoading = false;
      state.planetData = action.payload;
    })
    .addCase(fetchPlanetData.rejected, (state, action) => {
      state.loading = false;
      state.infiniteLoading = true;
      state.alert = {
        type: 'error',
        message: action.error.message || 'Unknown error occurred.',
      };
    })
    .addCase(fetchEarthData.pending, (state) => {
      state.loading = true;
      state.infiniteLoading = true;
      state.alert = null;
    })
    .addCase(fetchEarthData.fulfilled, (state, action) => {
      state.loading = false;
      state.infiniteLoading = false;
      state.earthData = action.payload;
    })
    .addCase(fetchEarthData.rejected, (state, action) => {
      state.loading = false;
      state.infiniteLoading = true;
      state.alert = {
        type: 'error',
        message: action.error.message || 'Unknown error occurred.',
      };
    })
    .addCase(clearPlanetAlert, (state) => {
      state.alert = null;
    });
});

export default planetReducer;
