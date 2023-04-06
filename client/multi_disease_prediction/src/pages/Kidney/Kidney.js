import React, { Fragment, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import classes from './Kidney.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import IMAGE from './Kidney.png'
import { useHistory } from 'react-router-dom'

const Kidney = () => {

    const [age, setAge] = useState("");
    const [bp, setBP] = useState("");
    const [specificGravity, setSpecificGravity] = useState("");
    const [albumin, setAlbumin] = useState("");
    const [rbc, setRBC] = useState("");
    const [pusCell, setPusCell] = useState("");
    const [pusCellClumps, setPusCellClumps] = useState("");
    const [bacteria, setBacteria] = useState("");
    const [bloodGlucose, setBloodGlucose] = useState("");
    const [bloodUrea, setBloodUrea] = useState("");
    const [sodium, setSodium] = useState("");
    const [potassium, setPotassium] = useState("");
    const [hemoglobin, setHemoglobin] = useState("");
    const [wbc, setWBC] = useState("");
    const [diabetes, setDiabetes] = useState("");
    const [coronaryDisease, setCoronaryDisease] = useState("");
    const [appetite, setAppetite] = useState("");
    const [pedalEdema, setPedalEdema] = useState("");
    const [anemia, setAnemia] = useState("");

    const history = useHistory()

    const submitFormHandler = (event) => {
        if (age === "" || bp === "" || specificGravity === "" || albumin === "" || rbc === "" || pusCell === ""
            || pusCellClumps === "" || bacteria === "" || bloodGlucose === "" || bloodUrea === "" || sodium === "" || potassium === ""
            || hemoglobin === "" || wbc === "" || diabetes === "" || coronaryDisease === "" || appetite === "" || pedalEdema === "" ||
            anemia === "") {

            toast.error('Please fill all details !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else {
            const prediction_data = {
                age: age,
                BP: bp,
                specific_gravity: specificGravity,
                albumin: albumin,
                RBC: rbc,
                pus_cell: pusCell,
                pus_cell_clumps: pusCellClumps,
                bacteria: bacteria,
                blood_glucose: bloodGlucose,
                blood_urea: bloodUrea,
                sodium: sodium,
                potassium: potassium,
                hemoglobin: hemoglobin,
                WBC: wbc,
                diabetes: diabetes,
                coronary_disease: coronaryDisease,
                appetite: appetite,
                pedal_edema: pedalEdema,
                anemia: anemia

            }

            axios({
                url: 'http://localhost:8000/kidney',
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
                    disease : 'Kidney Disease',
                    performance : response.data['per_data'],
                    probability : response.data['probability'],
                    response_msg : response.data['msg'],
                    prediction_data : prediction_data
                }

                history.push({
                    pathname: '/kidney/predict',
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

    return (
        <Fragment>
            <Header />
            <div className={classes.MainSection}>
            <ToastContainer />
                <div className={classes.MainHeading}>
                    <p className={classes.Disease}>Kidney Disease Prediction</p>
                    <div className={classes.DiseaseSection} >
                        <div className={classes.ImageSection} >
                            <img className={classes.Image} src={IMAGE} alt="kidney" />
                        </div>
                        <div className={classes.PredictionSection} >
                            <form onSubmit={submitFormHandler}>

                                <input className={classes.Input} type='number'
                                    placeholder="Age (Years)"
                                    value={age}
                                    onChange={(event) => setAge(event.target.value)}
                                    min="1" max="100"
                                ></input>
                                <br></br>

                                <select className={classes.Input} name="blood_pressure"
                                    onChange={(event) => setBP(event.target.value)}
                                >
                                    <option value="" disabled selected hidden>Blood Pressure</option>
                                    <option value="low">Low</option>
                                    <option value="normal">Normal</option>
                                    <option value="high">High</option>
                                </select>

                                <br></br>
                                <select className={classes.Input} name="specific_gravity"
                                    onChange={(event) => setSpecificGravity(event.target.value)}
                                >
                                    <option value="" disabled selected hidden>Specific Gravity</option>
                                    <option value="1.005">1.005</option>
                                    <option value="1.015">1.015</option>
                                    <option value="1.010">1.010</option>
                                    <option value="1.020">1.020</option>
                                    <option value="1.025">1.025</option>
                                </select>

                                <br></br>
                                <select className={classes.Input} name="albumin_level"
                                    onChange={(event) => setAlbumin(event.target.value)}
                                >
                                    <option value="" disabled selected hidden>Albumin Level</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>

                                <br></br>
                                <select className={classes.Input} name="rbc"
                                    onChange={(event) => setRBC(event.target.value)}
                                >
                                    <option value="" disabled selected hidden>Red Blood Cell</option>
                                    <option value="normal">Normal</option>
                                    <option value="abnormal">Abnormal</option>
                                </select>

                                <br></br>
                                <select className={classes.Input} name="pus_cell"
                                    onChange={(event) => setPusCell(event.target.value)}
                                >
                                    <option value="" disabled selected hidden>Pus Cell</option>
                                    <option value="normal">Normal</option>
                                    <option value="abnormal">Abnormal</option>
                                </select>
                                <br></br>

                                <select className={classes.Input} name="pus_cell_clumps"
                                    onChange={(event) => setPusCellClumps(event.target.value)}
                                >
                                    <option value="" disabled selected hidden>Pus Cell Clumps</option>
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
                                </select>
                                <br></br>

                                <select className={classes.Input} name="bacteria"
                                    onChange={(event) => setBacteria(event.target.value)}
                                >
                                    <option value="" disabled selected hidden>Bacteria</option>
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
                                </select>
                                <br></br>

                                <input className={classes.Input} type='number'
                                    placeholder="Blood Glucose (mg/dL)"
                                    min = "0"
                                    step = "any"
                                    value={bloodGlucose}
                                    onChange={(event) => setBloodGlucose(event.target.value)}
                                ></input>
                                <br></br>

                                <input className={classes.Input} type='number'
                                    placeholder="Blood Urea (mg/dL)"
                                    min = "0"
                                    step = "any"
                                    value={bloodUrea}
                                    onChange={(event) => setBloodUrea(event.target.value)}
                                ></input>
                                <br></br>

                                <input className={classes.Input} type='number'
                                    placeholder="Sodium (mEq/L)"
                                    min = "0"
                                    step = "any"
                                    value={sodium}
                                    onChange={(event) => setSodium(event.target.value)}
                                ></input>
                                <br></br>

                                <input className={classes.Input} type='number'
                                    placeholder="Potassium (mEq/L)"
                                    min = "0"
                                    step = "any"
                                    value={potassium}
                                    onChange={(event) => setPotassium(event.target.value)}
                                ></input>
                                <br></br>

                                <input className={classes.Input} type='number'
                                    placeholder="Hemoglobin (gms)"
                                    min = "0"
                                    step = "any"
                                    value={hemoglobin}
                                    onChange={(event) => setHemoglobin(event.target.value)}
                                ></input>
                                <br></br>

                                <input className={classes.Input} type='number'
                                    placeholder="WBC Count (cells/cumm)"
                                    min = "0"
                                    value={wbc}
                                    onChange={(event) => setWBC(event.target.value)}
                                ></input>
                                <br></br>

                                <select className={classes.Input} name="diabetes"
                                    onChange={(event) => setDiabetes(event.target.value)}
                                >
                                    <option value="" disabled selected hidden>Diabetes</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                <br></br>

                                <select className={classes.Input} name="coronary_disease"
                                    onChange={(event) => setCoronaryDisease(event.target.value)}
                                >
                                    <option value="" disabled selected hidden>Coronary Disease</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                <br></br>

                                <select className={classes.Input} name="appetite"
                                    onChange={(event) => setAppetite(event.target.value)}
                                >
                                    <option value="" disabled selected hidden>Appetite</option>
                                    <option value="good">Good</option>
                                    <option value="poor">Poor</option>
                                </select>
                                <br></br>

                                <select className={classes.Input} name="pedal_edema"
                                    onChange={(event) => setPedalEdema(event.target.value)}
                                >
                                    <option value="" disabled selected hidden>Pedal Edema</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                <br></br>

                                <select className={classes.Input} name="anemia"
                                    onChange={(event) => setAnemia(event.target.value)}
                                >
                                    <option value="" disabled selected hidden>Anemia</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
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

export default Kidney;