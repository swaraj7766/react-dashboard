import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataFromDb = createAsyncThunk(
  "graphtwo/getDataFromDb",
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

export const graphTwoSlice = createSlice({
  name: "graphtwo",
  initialState: {
    labelData: [],
    checkedIn: [],
    paused: [],
    washing: [],
    service: [],
    finalInspection: [],
    checkedOut: [],
  },
  reducers: {},
  extraReducers: {
    [getDataFromDb.fulfilled]: (state, action) => {
      // Add user to the state array
      let data = { ...action.payload };
      let labelData = [];
      let checkedIn = [];
      let paused = [];
      let washing = [];
      let service = [];
      let finalInspection = [];
      let checkedOut = [];
      Object.entries(data.statsMap).forEach(([d, v]) => {
        labelData.push(d);
        checkedIn.push(v.checkedIn);
        paused.push(v.paused);
        washing.push(v.washing);
        service.push(v.service);
        finalInspection.push(v.finalInspection);
        checkedOut.push(v.checkedOut);
      });
      return {
        ...state,
        labelData,
        checkedIn,
        paused,
        washing,
        service,
        finalInspection,
        checkedOut,
      };
    },
  },
});

//export const { setData, clearData } = graphTwoSlice.actions;

export default graphTwoSlice.reducer;
