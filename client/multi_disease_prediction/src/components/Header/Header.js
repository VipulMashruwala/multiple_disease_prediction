import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import styled from "styled-components";
import classes from './Header.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Nav = styled.nav`
  // border: 1px solid green;
  padding: 0 20px;
  min-height: 9vh;
  background: #f2f2f2; // Navbar background color
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  left: 0;
  right: 0;
  top: 0;
`;

const Menu = styled.ul`
  // border: 1px solid red;
  list-style: none;
  display: flex;
  align-items: center;

  li:nth-child(2) {
    margin: 0px 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Item = styled.li``;


const Header = () => {

  const [id, setId] = useState("")
  const [username, setUserName] = useState(null)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {

    const user = localStorage.getItem('username')
      if(user){
          setUserName(user)
          setIsLogin(true)   
      } 
      
   })

  const signOutHandler = () => {
      localStorage.clear()
      setIsLogin(false)
      toast.success('Sign Out Successfully!', {
        position: toast.POSITION.TOP_RIGHT
    });
  }


  return (
    <>
        <ToastContainer />
      <Nav>
        <h1 className={classes.LOGO}><span className={classes.logoBorder}>+</span>Check Your Health</h1>
        { isLogin ? 
        <Menu>

          <Item>
            <NavLink activeClassName={classes.active} className={classes.link} to="/diabetes">
              Diabetes
            </NavLink>
          </Item>
          <Item>
            <NavLink activeClassName={classes.active} className={classes.link} to='/heart'>Heart</NavLink>
          </Item>

          <Item>
            <NavLink activeClassName={classes.active} className={classes.link} to="/liver">
              Liver
            </NavLink>
          </Item>
          &nbsp;
          &nbsp;
          &nbsp;
          <Item>
            <NavLink activeClassName={classes.active} className={classes.link} to="/kidney">
              Kidney
            </NavLink>
          </Item>

        </Menu>:
        <div></div> }

    <Menu>
{ isLogin ? 
        
          <>
          <Item>
            <p className={classes.user} >
              {username}
            </p>
          </Item>

          <Item>
            <NavLink activeClassName={classes.active} className={classes.link} exact to='/'> Home</NavLink>
          </Item>

          <Item>
            <NavLink onClick={signOutHandler} className={classes.link} to='/signout'>Sign Out</NavLink>
          </Item>

          </> :

        <>
          <Item>
            <NavLink activeClassName={classes.active} className={classes.link} to='/signin'>Sign In</NavLink>
          </Item>

          <Item>
            <NavLink activeClassName={classes.active} className={classes.link} to='/signup'>Sign Up</NavLink>
          </Item>
          </> }

        </Menu>

      </Nav>

    </>
  );
};

export default Header;
