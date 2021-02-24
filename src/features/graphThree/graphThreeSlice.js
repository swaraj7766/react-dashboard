import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataFromDb = createAsyncThunk(
  "graphthree/getDataFromDb",
  async (param) => {
    let response = {};
    switch (param.type.toLowerCase()) {
      case "daily":
        response = await axios.get("data/DailyServiceStatsData.json");
        break;
      case "monthly":
        response = await axios.get("data/MonthlyServiceStatsData.json");
        break;
      case "weekly":
        response = await axios.get("data/WeeklyServiceStatsData.json");
        break;
      case "yearly":
        response = await axios.get("data/YearlyServiceStatsData.json");
        break;

      default:
        response = await axios.get("data/DailyServiceStatsData.json");
        break;
    }
    return response.data;
  }
);

export const graphThreeSlice = createSlice({
  name: "graphthree",
  initialState: {
    labelData: [],
    frequencyAvgRating: [],
    ratingsAvg: [],
  },
  reducers: {},
  extraReducers: {
    [getDataFromDb.fulfilled]: (state, action) => {
      // Add user to the state array
      let data = { ...action.payload };
      let labelData = [];
      let frequencyAvgRating = [];
      let ratingsAvg = [];
      Object.entries(data.statsMap).forEach(([d, v]) => {
        labelData.push(d);
        frequencyAvgRating.push(v.frequencyAvgRating);
        ratingsAvg.push(data.ratingsAvg);
      });
      return {
        ...state,
        labelData,
        frequencyAvgRating,
        ratingsAvg,
      };
    },
  },
});

//export const { setData, clearData } = graphThreeSlice.actions;

export default graphThreeSlice.reducer;
