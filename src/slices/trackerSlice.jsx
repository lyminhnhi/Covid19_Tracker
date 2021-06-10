import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchCountries = createAsyncThunk('tracker/fetchCountries', async () => {
  const response = await axios.get("https://disease.sh/v3/covid-19/countries")
  return response.data
})

export const fetchAll = createAsyncThunk('tracker/fetchAll', async (param) => {
  const response = await axios.get(param)
  return response.data
})

export const fetchHistoricalAll = createAsyncThunk('tracker/fetchHistoricalAll', async () => {
  const response = await axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
  return response.data
})

export const fetchDetailCountry = createAsyncThunk('tracker/fetchDetailCountry', async (param) => {
  const response = await axios.get(`https://disease.sh/v3/covid-19/countries/${param}`)
  return response.data
})

const tracker = createSlice({
  name: "tracker",
  initialState: {
    dataCountries:[],
    dataAll:{},
    dataHistoricalAll:{},
    dataDetail: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [fetchCountries.fulfilled]: (state, action) => {
      state.dataCountries = action.payload
    },
    [fetchAll.fulfilled]: (state, action) => {
      state.dataAll = action.payload
    },
    [fetchHistoricalAll.fulfilled]: (state, action) => {
      state.dataHistoricalAll = action.payload
    },
    [fetchDetailCountry.fulfilled]: (state, action) => {
      state.dataDetail = action.payload
    },
  }
});

const { reducer, actions } = tracker;
export const { } = actions;
export default reducer;