import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import { getDataFromDb } from "./vechileGraphSlice";

const VechileGraph = (props) => {
  useEffect(() => {
    props.getDataFromDb({ type: "daily" });
  }, []);
  return (
    <div style={{ height: "350px", position: "relative" }}>
      <Line
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

VechileGraph.propTypes = {
  getDataFromDb: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  let { vechileGraph } = state;
  let data = {
    labels: vechileGraph.labelData,
    datasets: [
      {
        label: "No of vechile recieved",
        data: vechileGraph.noOfVechiles,
        fill: false,
        borderColor: "#742774",
      },
      {
        label: "vechile recieved Avg.",
        data: vechileGraph.avgVechilesRecived,
        fill: false,
        borderColor: "yellow",
        borderWidth: 5,
      },
    ],
  };
  return { data };
};

const mapDispatchToProps = (dispatch) => ({
  getDataFromDb: (param) => dispatch(getDataFromDb(param)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VechileGraph);
