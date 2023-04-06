import React, {Fragment, useState}  from "react";
import classes from './SignUp.module.css'
import Header from "../components/Header/Header";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const SignUp = () => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const history = useHistory()

    const cancelButtonHandler = () =>{
        history.replace('/')
    }

    const signUpButtonHandler = () =>{

        if(username !== "" && password !== "" && confirmPassword !== "" ){
            if(password === confirmPassword){
                const myData = {
                    username : username,
                    password : password
                }
    
                axios({
                    url: 'http://localhost:8000/signup',
                    method: 'POST',
                    data: JSON.stringify(myData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    history.replace('/signin')
                    toast.success(response.data['msg'], {
                        position: toast.POSITION.TOP_RIGHT
                    });
    
                })
                .catch(err => {
                    console.log(err)
                    toast.error(err, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                })   
            }
            else{
                toast.error('Password & Confirm password must be equal', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            
        }
        else{
            toast.error('Please fill all details !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }


    return(
        <Fragment>
            <Header />
            <br></br>
            <br></br>
            <ToastContainer />
            <from className={classes.SignUpSection}>
                <div className={classes.SignUpForm}>
                    <p className={classes.SignUp}>Sign Up</p>
                    <br></br>
                    <br></br>
                    <label className={classes.LabelUserName}> Username </label>
                    <br></br>
                    <input type="text" className={classes.Input}
                    onChange={(event) => setUserName(event.target.value)}></input>

                    <br></br>
                    <br></br>

                    <label className={classes.LabelPassword}> Password </label>
                    <br></br>
                    <input type="password" className={classes.Input}
                    onChange={(event) => setPassword(event.target.value)}></input>

                    <br></br>
                    <br></br>

                    <label className={classes.LabelPassword}> Confirm Password </label>
                    <br></br>
                    <input type="password" className={classes.Input}
                    onChange={(event) => setConfirmPassword(event.target.value)}></input>

                    <br></br>
                    <br></br>
            
                    <div className={classes.ButtonSection}>
                        <button className={classes.SignUpButton}
                        onClick={signUpButtonHandler}>Sign Up</button>
                        <button className={classes.SignUpButton}
                            onClick={cancelButtonHandler}>Cancel</button>
                    </div>

                    <br></br>

                    <p className={classes.RedirectLink}>
                    <Link className={classes.AllreadyAccount} to = "/signin">
                        already have an account
                    </Link>
                    </p>

                </div>
            </from>

        </Fragment>
    )
}

export default SignUp;