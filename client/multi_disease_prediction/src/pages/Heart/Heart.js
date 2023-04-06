import React, {Fragment, useEffect, useState}  from "react";
import Header from "../../components/Header/Header";
import classes from './Heart.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import IMAGE from './heart.png'
import {useHistory} from 'react-router-dom'

const Heart = () => {

    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [glucose, setGlucose] = useState("");
    const [bmi, setBMI] = useState("");
    const [smoker, setSmoker] = useState("");
    const [cholestoral, setCholestoral] = useState("");
    const [alcoholIntake, setAlcoholIntake] = useState("");
    const [physicalActivity, setPhysicalActivity] = useState("");
    const [sysBP, setSysBP] = useState("");
    const [diaBP, setDiaBP] = useState("");
   

    
    const history = useHistory()

    const submitFormHandler = (event) =>{
        if(gender === "" || glucose === "" || bmi === "" || diaBP === "" || sysBP === "" || age === "" || smoker === "" 
        || physicalActivity === ""  || alcoholIntake === ""  ||  cholestoral === ""){
            toast.error('Please fill all details !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else{
            const prediction_data = {
                age : age,
                gender : gender,
                sys_bp : sysBP,
                dia_bp : diaBP,
                cholestoral : cholestoral,
                glucose : glucose,
                smoking : smoker,
                alcohol : alcoholIntake,
                physical_activity : physicalActivity, 
                bmi : bmi  
            }
    
            axios({
                url: 'http://localhost:8000/heart',
                method: 'POST',
                data: JSON.stringify(prediction_data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response)

                const submit_data = {
                    username : localStorage.getItem('username'),
                    disease : 'Heart Disease',
                    performance : response.data['per_data'],
                    probability : response.data['probability'],
                    response_msg : response.data['msg'],
                    prediction_data : prediction_data
                }

                history.push({
                    pathname: '/heart/predict',
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
                        <p className={classes.Disease}>Heart Disease Prediction</p>
                        <div className={classes.DiseaseSection} >
                            <div className={classes.ImageSection} >
                            <img className={classes.Image} src = {IMAGE} alt="heart" />
                            </div>
                            <div className={classes.PredictionSection} >
                                <form onSubmit={submitFormHandler}>
                                    <select className={classes.Input} name="gender"
                                        onChange={(event) => setGender(event.target.value)}>
                                        <option value="" disabled selected hidden>Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                
                                    <br></br>

                                    <input className={classes.Input} type = 'number' 
                                        placeholder="Age (Years)" 
                                        value = {age}
                                        onChange={(event) => setAge(event.target.value)}
                                        min = "1" max="100"
                                        ></input>
                                    <br></br>

                                    <select className={classes.Input} name="Smoker"
                                        onChange={(event) => setSmoker(event.target.value)}>
                                        <option value="" disabled selected hidden>Smoker</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>

                                    <br></br>                                 
                                    <select className={classes.Input} name="Glucose Level"
                                        onChange={(event) => setGlucose(event.target.value)}>
                                        <option value="" disabled selected hidden>Glucose Level</option>
                                        <option value="normal">Normal</option>
                                        <option value="high">High</option>
                                        <option value="very_high">Very High</option>
                                    </select>
                                    
                                    <br></br>
                                    <select className={classes.Input} name="Alcohol Intake"
                                        onChange={(event) => setAlcoholIntake(event.target.value)}>
                                        <option value="" disabled selected hidden>Alcohol Intake</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                    
                                    <br></br>
                                    <select className={classes.Input} name="Physical Activity"
                                        onChange={(event) => setPhysicalActivity(event.target.value)}>
                                        <option value="" disabled selected hidden>Physical Activity</option>
                                        <option value="good">Yes</option>
                                        <option value="poor">No</option>
                                    </select>

                                    <input className={classes.Input} type = 'number' 
                                        placeholder="Systolic Blood Pressure (mm/Hg)" 
                                        value = {sysBP}
                                        min = "0"
                                        step = "any"
                                        max = ""
                                        onChange={(event) => setSysBP(event.target.value)}
                                        ></input>
                                    <br></br>

                                    <input className={classes.Input} type = 'number' 
                                        placeholder="Diastolic Blood Pressure (mm/Hg)" 
                                        value = {diaBP}
                                        min = "0"
                                        step = "any"
                                        onChange={(event) => setDiaBP(event.target.value)}
                                        ></input>
                                    <br></br>

                                    <input className={classes.Input} type = 'number' 
                                        placeholder="Body Mass Index (BMI)" 
                                        value = {bmi}
                                        min = "0"
                                        step = "any"
                                        onChange={(event) => setBMI(event.target.value)}
                                        ></input>
                                    
                                    <br></br>
                                    <select className={classes.Input} name="Cholesterol"
                                        onChange={(event) => setCholestoral(event.target.value)}>
                                        <option value="" disabled selected hidden>Cholesterol</option>
                                        <option value="normal">Normal</option>
                                        <option value="high">High</option>
                                        <option value="very_high">Very High</option>
                                    </select>
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

export default Heart;