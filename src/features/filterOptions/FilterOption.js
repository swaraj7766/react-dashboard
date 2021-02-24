import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CustomSelect from "../../components/CustomSelect/Select";
import { useDispatch } from "react-redux";
import { getDataFromDb as getGraphOneData } from "../vechileGraph/vechileGraphSlice";
import { getDataFromDb as getGraphTwoData } from "../graphTwo/graphTwoSlice";
import { getDataFromDb as getGraphThreeData } from "../graphThree/graphThreeSlice";
import { getDataFromDb as getGraphFourData } from "../graphFour/graphFourSlice";

const DurationOption = ["daily", "weekly", "monthly", "yearly"];

const FilterOption = (props) => {
  const dispatch = useDispatch();
  const [durationType, setDurationType] = useState("daily");
  const getFilterData = () => {
    console.log(durationType);
    dispatch(getGraphOneData({ type: `${durationType}` }));
    dispatch(getGraphTwoData({ type: `${durationType}` }));
    dispatch(getGraphThreeData({ type: `${durationType}` }));
    dispatch(getGraphFourData({ type: `${durationType}` }));
    // setTimeout(() => {

    // }, 500);
    // setTimeout(() => {}, 1000);
    // setTimeout(() => {}, 1500);
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <CustomSelect
        name="type"
        label="Duration Type"
        value={durationType}
        onChange={(e) => setDurationType(e.target.value)}
        options={DurationOption}
      />
      <Button variant="contained" color="primary" onClick={getFilterData}>
        Get Data
      </Button>
    </div>
  );
};

export default FilterOption;
