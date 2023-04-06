import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import classes from './Predict.module.css'
import { useLocation } from 'react-router-dom';
import Chart from '../components/Chart/Chart'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CompareChart from "../components/CompareResult/CompareChart";

var fileDownload = require('js-file-download');

const Predict = () => {
    const location = useLocation();

    const [compare, setCompare] = useState(false)
    const [compareResult, setCompareResult] = useState([])

    // useEffect(() => {

    // }, [compare])

    const downloadReport = () => {
        // console.log("Download Report")
        // console.log(location.state.probability)
        // console.log(location.state.performance)
        axios({
            url: 'http://localhost:8000/download',
            method: 'POST',
            data: JSON.stringify(location.state),
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'blob'
        })
            .then(response => {
                console.log(response)
                fileDownload(response.data, 'report.csv');
                    toast.success('Report Downloaded Successfully!', {
                      position: toast.POSITION.TOP_RIGHT
                  });
            })
            .catch(err => {
                console.log(err);
                    toast.error(err, {
                      position: toast.POSITION.TOP_RIGHT
                  });
            });
    }

    const showPredictionResult = () => {
        setCompare(!compare)
    }

    const showComparisonResult = () => {
        setCompare(!compare)

        const disease = location.state.disease
        axios({
            url: 'http://localhost:8000/comparisonResult',
            method: 'POST',
            data: disease,
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then(response => {
                // console.log(JSON.parse(response.data))
                setCompareResult(JSON.parse(response.data.data))
                console.log(JSON.parse(response.data.data))

                //     toast.success('Resume Downloaded Successfully!', {
                //       position: toast.POSITION.TOP_RIGHT
                //   });
            })
            .catch(err => {
                console.log(err);
                //     toast.error(err, {
                //       position: toast.POSITION.TOP_RIGHT
                //   });
            });

    }

    const model_performance = JSON.parse(location.state.performance);
    const predict_probability = JSON.parse(location.state.probability);
    const performance_color = ['rgba(50, 119, 168)', 'rgba(168, 127, 50)', 'rgba(50, 168, 64)']
    const probability_color = ['rgba(142, 50, 168)', 'rgba(240, 34, 181)']

    return (
        <Fragment>
            <Header />
            {compare ? 
                <div className={classes.ModelOutput}>
                    <p className={classes.ModelAnalysis}>Model Analysis</p>
                    <div className={classes.CompareChart}>
                        <CompareChart chart_data = {compareResult} />
                    </div>
                    <br></br>
                    <br></br>
           
                    <button className={classes.comparisonButton}
                        onClick={showPredictionResult}>Show Prediction Result</button>
                </div>
             :
                <div className={classes.ModelOutput}>
                    <div className={classes.Chart}>
                        <div className={classes.ChartSection}>
                            <Chart chart_data={model_performance}
                                chart_title="Performance"
                                color={performance_color}
                            />
                        </div>
                        <div className={classes.ChartSection}>
                            <Chart chart_data={predict_probability}
                                chart_title="Predicted Probability"
                                color={probability_color}
                            />
                        </div>

                    </div>

                    <br />


                    <div className={classes.MessageSection}>
                        <p className={classes.Message}>{location.state.response_msg}</p>
                    </div>
                    <br></br>
                    <br></br>
                    <button className={classes.ButtonSection}
                        onClick={downloadReport}>Download Report</button>

                    <br></br>
                    <br></br>

                    <button className={classes.comparisonButton}
                        onClick={showComparisonResult}>Show Comparision Results</button>
                </div>
            }
        </Fragment>
    )
}
export default Predict;