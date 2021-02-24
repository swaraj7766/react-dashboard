import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataFromDb = createAsyncThunk(
  "graphfour/getDataFromDb",
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

export const graphFourSlice = createSlice({
  name: "graphfour",
  initialState: {
    labelData: [],
    excellent: [],
    veryGood: [],
    good: [],
    fair: [],
    poor: [],
  },
  reducers: {},
  extraReducers: {
    [getDataFromDb.fulfilled]: (state, action) => {
      // Add user to the state array
      let data = { ...action.payload };
      let labelData = [];
      let excellent = [];
      let veryGood = [];
      let good = [];
      let fair = [];
      let poor = [];
      Object.entries(data.statsMap).forEach(([d, v]) => {
        labelData.push(d);
        excellent.push(v.excellent);
        veryGood.push(v.veryGood);
        good.push(v.good);
        fair.push(v.fair);
        poor.push(v.poor);
      });
      return {
        ...state,
        labelData,
        excellent,
        veryGood,
        good,
        fair,
        poor,
      };
    },
  },
});

//export const { setData, clearData } = graphFourSlice.actions;

export default graphFourSlice.reducer;
