import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";
import { getDataFromDb } from "./graphTwoSlice";

const GraphTwo = (props) => {
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
            position: "bottom",
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  //fontColor: "#fff",
                },
                gridLines: {
                  display: true,
                  drawBorder: true,
                  drawOnChartArea: false,
                  //color: "#fff",
                  //zeroLineColor: "#fff",
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  //fontColor: "#fff",
                },
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
  let { graphTwo } = state;
  let data = {
    labels: graphTwo.labelData,
    datasets: [
      {
        label: "Checkin",
        maxBarThickness: 50,
        backgroundColor: "rgba(255, 99, 132, 1)",
        borderColor: "rgba(255, 99, 132, 1)",
        data: graphTwo.checkedIn,
      },
      {
        label: "Paused",
        maxBarThickness: 50,
        backgroundColor: "rgba(54, 162, 235, 1)",
        borderColor: "rgba(54, 162, 235, 1)",
        data: graphTwo.paused,
      },
      {
        label: "Washing",
        maxBarThickness: 50,
        backgroundColor: "rgba(255, 206, 86, 1)",
        borderColor: "rgba(255, 206, 86, 1)",
        data: graphTwo.washing,
      },
      {
        label: "Service",
        maxBarThickness: 50,
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderColor: "rgba(75, 192, 192, 1)",
        data: graphTwo.service,
      },
      {
        label: "Final Inspection",
        maxBarThickness: 50,
        backgroundColor: "rgba(153, 102, 255, 1)",
        borderColor: "rgba(153, 102, 255, 1)",
        data: graphTwo.finalInspection,
      },
      {
        label: "Checkout",
        maxBarThickness: 50,
        backgroundColor: "rgba(255, 159, 64, 1)",
        borderColor: "rgba(255, 159, 64, 1)",
        data: graphTwo.checkedOut,
      },
    ],
  };
  return { data };
};

const mapDispatchToProps = (dispatch) => ({
  getDataFromDb: (param) => dispatch(getDataFromDb(param)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphTwo);

GraphTwo.propTypes = {
  getDataFromDb: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
