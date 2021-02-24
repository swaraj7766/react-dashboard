import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataFromDb = createAsyncThunk(
  "graphone/getDataFromDb",
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

export const vechileGraphSlice = createSlice({
  name: "graphone",
  initialState: {
    labelData: [],
    noOfVechiles: [],
    avgVechilesRecived: [],
  },
  reducers: {},
  extraReducers: {
    [getDataFromDb.fulfilled]: (state, action) => {
      // Add user to the state array
      let data = { ...action.payload };
      let labelData = [];
      let noOfVechiles = [];
      let avgVechilesRecived = [];
      Object.entries(data.statsMap).forEach(([d, v]) => {
        labelData.push(d);
        noOfVechiles.push(v.vehiclesReceived);
        avgVechilesRecived.push(data.vehiclesReceivedAvg);
      });
      return {
        ...state,
        labelData,
        noOfVechiles,
        avgVechilesRecived,
      };
    },
  },
});

//export const { setData, clearData } = vechileGraphSlice.actions;

export default vechileGraphSlice.reducer;
