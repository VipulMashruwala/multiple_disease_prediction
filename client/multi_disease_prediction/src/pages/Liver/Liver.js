import React, {Fragment, useState}  from "react";
import Header from "../../components/Header/Header";
import axios from 'axios'
import classes from './Liver.module.css'
import { ToastContainer, toast } from 'react-toastify';
import IMAGE from './liver.png'
import 'react-toastify/dist/ReactToastify.css';
import {useHistory } from 'react-router-dom'

const Liver = () => {
    
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [total_Bilirubin, setTotal_Bilirubin] = useState("");
    const [alkaline_Phosphotase, setAlkaline_Phosphotase] = useState("");
    const [sgot, setSGOT] = useState("");
    const [total_Protiens, setTotal_Protiens] = useState("");
    const [albumin_Globulin_Ratio, setAlbumin_Globulin_Ratio] = useState("");
    const history = useHistory()
  
    const submitFormHandler = (event) =>{
        if(gender === "" || total_Bilirubin === "" || alkaline_Phosphotase === "" || sgot === "" || age === ""
        || total_Protiens === ""  || albumin_Globulin_Ratio === ""){
            toast.error('Please fill all details !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else{
            const prediction_data = {
                Age : age,
                Gender : gender,
                Total_Bilirubin : total_Bilirubin,
                Alkaline_Phosphotase : alkaline_Phosphotase,
                SGOT : sgot,
                Total_Protiens : total_Protiens,
                Albumin_and_Globulin_Ratio : albumin_Globulin_Ratio
            }
    
            axios({
                url: 'http://localhost:8000/liver',
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
                    disease : 'Liver Disease',
                    performance : response.data['per_data'],
                    probability : response.data['probability'],
                    response_msg : response.data['msg'],
                    prediction_data : prediction_data
                }

                history.push({
                    pathname: '/liver/predict',
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
                        <p className={classes.Disease}>Liver Disease Prediction</p>
                        <div className={classes.DiseaseSection} >
                            <div className={classes.ImageSection} >
                            <img className={classes.Image} src = {IMAGE} alt="liver" />
                            </div>
                            <div className={classes.PredictionSection} >
                                <form onSubmit={submitFormHandler}>
                                    <input className={classes.Input} type = 'number' 
                                        placeholder="Age (Years)"
                                        value = {age}
                                        onChange={(event) => setAge(event.target.value)}
                                        min = "1" max="100"
                                        ></input>
                                    <br></br>
                                    <select className={classes.Input} name="gender"
                                        onChange={(event) => setGender(event.target.value)}
                                        >
                                        <option value="" disabled selected hidden>Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <br></br>
                    
                                    <input className={classes.Input} type = 'number' 
                                        placeholder="Total Bilirubin" 
                                        value = {total_Bilirubin}
                                        min = "0"
                                        step = "any"
                                        onChange={(event) => setTotal_Bilirubin(event.target.value)}
                                        ></input>
                                    <br></br>

                                    <input className={classes.Input} type = 'number' 
                                        placeholder="Alkaline Phosphotase" 
                                        value = {alkaline_Phosphotase}
                                         min = "0"
                                         step = "any"
                                        onChange={(event) => setAlkaline_Phosphotase(event.target.value)}
                                        ></input>
                                    <br></br>

                                    <input className={classes.Input} type = 'number' 
                                        placeholder="SGOT" 
                                        value = {sgot}
                                        min = "0"
                                        step = "any"
                                        onChange={(event) => setSGOT(event.target.value)}
                                        ></input>
                                    <br></br>
                                    
                                    <input className={classes.Input} type = 'number' 
                                        placeholder="Total Protiens" 
                                        value = {total_Protiens}
                                        min = "0"
                                        step = "any"
                                        onChange={(event) => setTotal_Protiens(event.target.value)}
                                        ></input>

                                    <br></br>
                                    <input className={classes.Input} type = 'number' 
                                        placeholder="Albumin & Globulin Ratio" 
                                        value = {albumin_Globulin_Ratio}
                                        min = "0"
                                        step = "any"
                                        onChange={(event) => setAlbumin_Globulin_Ratio(event.target.value)}
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

export default Liver;