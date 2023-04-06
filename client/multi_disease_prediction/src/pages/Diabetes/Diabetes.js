import React, {Fragment, useEffect, useState}  from "react";
import Header from "../../components/Header/Header";
import classes from './Diabetes.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import IMAGE from './diabetes.png'
import {useHistory } from 'react-router-dom'

const Diabetes = () => {
    const [pregnant, setPregnant] = useState("");
    const [glucose, setGlucose] = useState("");
    const [bmi, setBMI] = useState("")
    const [bp, setBP] = useState("")
    const [dpf, setDPF] = useState("")
    const [age, setAge] = useState("")
    const history = useHistory()

    const submitFormHandler = (event) =>{
        if(pregnant === "" || glucose === "" || bmi === "" || bp === "" || dpf === "" || age === "" ){
            toast.error('Please fill all details !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else{
            const prediction_data = {
                Pregnancies : pregnant,
                Glucose : glucose,
                BloodPressure : bp,
                BMI : bmi,
                DiabetesPedigreeFunction : dpf,
                Age : age
            }
    
            axios({
                url: 'http://localhost:8000/diabetes',
                method: 'POST',
                data: JSON.stringify(prediction_data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {

                const submit_data = {
                    username : localStorage.getItem('username'),
                    disease : 'Diabetes Disease',
                    performance : response.data['per_data'],
                    probability : response.data['probability'],
                    response_msg : response.data['msg'],
                    prediction_data : prediction_data
                }

                // console.log(JSON.parse(submit_data.performance).Accuracy)
                toast.success('Result Analysis', {
                    position: toast.POSITION.TOP_RIGHT
                });
                
                history.push({
                    pathname: '/diabetes/predict',
                      state: submit_data
                  })

              

            })
            .catch(err => {
                console.log(err)
                toast.error(err, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })   
            
        }
        event.preventDefault();
    }


    return(
        <Fragment>
            <Header />
                <div className={classes.MainSection}>
                <ToastContainer />
                    <div className={classes.MainHeading}>        
                        <p className={classes.Disease}>Diabetes Prediction</p>
                        <div className={classes.DiseaseSection} >
                            <div className={classes.ImageSection} >
                            <img className={classes.Image} src = {IMAGE} alt="diabetes" />
                            </div>
                            <div className={classes.PredictionSection} >
                                <form onSubmit={submitFormHandler}>
                                    <input className={classes.Input} type = 'number' 
                                        placeholder="Number of times pregnant"
                                        value = {pregnant}
                                        min = "0"
                                        onChange={(event) => setPregnant(event.target.value)}
                                        ></input>
                                    <br></br>
                                    <input className={classes.Input} type = 'number' 
                                        placeholder="Glucose" value = {glucose}
                                        min = "0"
                                        step = "any"
                                        onChange={(event) => setGlucose(event.target.value)}
                                        ></input>
                                    <br></br>
                    
                                    <input className={classes.Input} type = 'number' 
                                        placeholder="Body Mass Index (BMI)" value = {bmi}
                                        min = "0"
                                        step = "any"
                                        onChange={(event) => setBMI(event.target.value)}
                                        ></input>
                                    <br></br>

                                    <input className={classes.Input} type = 'number' 
                                        placeholder="Blood Pressure (mm/Hg)" value = {bp}
                                        min = "0"
                                        step = "any"
                                        onChange={(event) => setBP(event.target.value)}
                                        ></input>
                                    <br></br>

                                    <input className={classes.Input} type = 'number' 
                                        placeholder="Diabetes Pedigree Function" 
                                        min = "0"
                                        step = "any"
                                        value = {dpf}
                                        onChange={(event) => setDPF(event.target.value)}
                                        ></input>
                                    <br></br>

                                    <input className={classes.Input} type = 'number' 
                                        placeholder="Age (Years)" value = {age}
                                        onChange={(event) => setAge(event.target.value)}
                                        min = "1" max="100"
                                        ></input>
                                    <br></br>
                                    <br></br>
                                    
                                    <button className={classes.SendMessageBtn} type="submit">Predict</button>
                                </form>    
                            </div>
                        
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}

export default Diabetes;