import React, {Fragment, useState}  from "react";
import { Link, useHistory } from "react-router-dom";
import classes from './SignIn.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../components/Header/Header";
import axios from 'axios'

const SignIn = () => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory()

    const cancelButtonHandler = () =>{
        history.replace('/')
    }

    const signInButtonHandler = () =>{
        if(username !== "" && password !== ""){
            const myData = {
                username : username,
                password : password
            }

            axios({
                url: 'http://localhost:8000/signin',
                method: 'POST',
                data: JSON.stringify(myData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {      
            
                localStorage.setItem('user_id',JSON.parse(response.data.user_data).id)
                localStorage.setItem('username',JSON.parse(response.data.user_data).username)
                history.replace('/')
                toast.success(response.data['msg'], {
                    position: toast.POSITION.TOP_RIGHT
                });
                // localStorage.setItem('isLogin',true)
            })
            .catch(err => {
                console.log(err)
                toast.error(err, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })   

            
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
            <from className={classes.SignInSection}>
                <div className={classes.SignInForm}>
                    <p className={classes.SignIn}>Sign In</p>
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
            
                    <div className={classes.ButtonSection}>
                        <button className={classes.SignInButton}
                        onClick={signInButtonHandler}>Sign In</button>
                        <button className={classes.SignInButton}
                        onClick={cancelButtonHandler}>Cancel</button>
                    </div>

                    <br></br>

                    <p className={classes.RedirectLink}>
                    <Link className={classes.RegisterAccount} to = "/signup">
                        register here
                    </Link>
                    </p>
                </div>
            </from>

        </Fragment>
    )
}

export default SignIn;