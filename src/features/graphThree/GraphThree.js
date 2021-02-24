import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";
import { getDataFromDb } from "./graphThreeSlice";

const GraphThree = (props) => {
  useEffect(() => {
    props.getDataFromDb({ type: "daily" });
  }, []);
  return (
    <div style={{ height: "350px", position: "relative" }}>
      <Bar
        data={props.data === null ? {} : props.data}
        height={350}
        width={0}
        options={{
          legend: {
            labels: {
              fontColor: "#fff",
            },
            position: "bottom",
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  fontColor: "#fff",
                },
                gridLines: {
                  display: true,
                  drawBorder: true,
                  drawOnChartArea: false,
                  color: "#fff",
                  zeroLineColor: "#fff",
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: "#fff",
                },
                gridLines: {
                  display: true,
                  drawBorder: true,
                  drawOnChartArea: false,
                  color: "#fff",
                  zeroLineColor: "#fff",
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

GraphThree.propTypes = {
  getDataFromDb: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  let { graphThree } = state;
  let data = {
    labels: graphThree.labelData,
    datasets: [
      {
        type: "line",
        label: "Avg. Rating",
        data: graphThree.ratingsAvg,
        fill: false,
        borderColor: "yellow",
        borderWidth: 5,
      },
      {
        label: "Frequency Avg. Rating",
        maxBarThickness: 50,
        data: graphThree.frequencyAvgRating,
        backgroundColor: "#fff",
        borderColor: "#fff",
      },
    ],
  };
  return { data };
};

const mapDispatchToProps = (dispatch) => ({
  getDataFromDb: (param) => dispatch(getDataFromDb(param)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphThree);
