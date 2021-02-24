import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";
import { getDataFromDb } from "./graphFourSlice";

const GraphFour = (props) => {
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
          maintainAspectRatio: false,
          legend: {
            position: "bottom",
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                },
                gridLines: {
                  display: true,
                  drawBorder: true,
                  drawOnChartArea: false,
                },
              },
            ],
            xAxes: [
              {
                ticks: {},
                gridLines: {
                  display: true,
                  drawBorder: true,
                  drawOnChartArea: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  let { graphFour } = state;
  let data = {
    labels: graphFour.labelData,
    datasets: [
      {
        label: "Excellent",
        maxBarThickness: 50,
        backgroundColor: "rgba(255, 99, 132, 1)",
        borderColor: "rgba(255, 99, 132, 1)",
        data: graphFour.excellent,
      },
      {
        label: "Very Good",
        maxBarThickness: 50,
        backgroundColor: "rgba(54, 162, 235, 1)",
        borderColor: "rgba(54, 162, 235, 1)",
        data: graphFour.veryGood,
      },
      {
        label: "Good",
        maxBarThickness: 50,
        backgroundColor: "rgba(255, 206, 86, 1)",
        borderColor: "rgba(255, 206, 86, 1)",
        data: graphFour.good,
      },
      {
        label: "Fair",
        maxBarThickness: 50,
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderColor: "rgba(75, 192, 192, 1)",
        data: graphFour.fair,
      },
      {
        label: "Poor",
        maxBarThickness: 50,
        backgroundColor: "rgba(153, 102, 255, 1)",
        borderColor: "rgba(153, 102, 255, 1)",
        data: graphFour.poor,
      },
    ],
  };
  return { data };
};

const mapDispatchToProps = (dispatch) => ({
  getDataFromDb: (param) => dispatch(getDataFromDb(param)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphFour);

GraphFour.propTypes = {
  getDataFromDb: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
