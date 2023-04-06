import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import Header from "../components/Header/Header";
import classes from './Home.module.css'
import IMAGE from './home.png'


const Home = () => {
    return (
        <Fragment>
            <Header />

            <div className={classes.HomeSection}>
                <div className={classes.TextSection}>
                    {/* <p> Multiple Disease Prediction</p> */}
               <p className={classes.Text}>Time & health</p>  
                <p className={classes.MainText}>are two precious assets that we don’t recognize and appreciate until they have been depleted. </p>
                </div>

                <div className={classes.ImageSection}>
                <img className={classes.Image} src = {IMAGE} alt="home" />
                </div>

            </div>

        </Fragment>
    )
}

export default Home;