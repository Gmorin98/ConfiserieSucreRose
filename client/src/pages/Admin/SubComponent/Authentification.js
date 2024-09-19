// Necessary Import
import React, { useState } from 'react';
import styled from "styled-components";

// Components and Other Import

const Authentification = ({setIsLoggedIn}) => {
  const [userInfo, setUserInfo] = useState({});

  const userInformation = (e, field) => {
    let value = e.target.value;

    setUserInfo({
      ...userInfo,
      [field]: value,
    });
  }

  // ↓ Verify the information given ↓
  const handleAuthentification = async () => {
    try {
      // Sending user credentials using POST
      const response = await fetch(`${process.env.REACT_APP_API_URL}postAdminAuthentification`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });

      const data = await response.json();
      
      if (data.status === 200) {
        setIsLoggedIn(true); // Assuming you have a success indicator in the response
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Wrapper>
      <div>
        <p>Username :</p>
        <input type="text" onChange={(e) => userInformation(e, 'username')} required/>
      </div>
      <div>
        <p>Password &nbsp;:</p>
        <input type="password" onChange={(e) => userInformation(e, 'password')} required/>
      </div>
      <button onClick={handleAuthentification} type='submit'>Login</button>
    </Wrapper>
  )
}

export default Authentification;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  padding: 1em;
  margin: 7em auto;
  background-color: var(--background-color);
  border-radius: 15px;
  
  div {
    display: flex;
    justify-content: space-between;
    width: 340px;
  }
  p {
    color: var(--primary-color);
  }
  input {
    min-width: 150px;
    width: 250px;
    height: 30px;
  }

  button {
    border: none;
    background-color: var(--primary-color);
    color: #ffffff;
    padding: 0.5em 1em;
    border-radius: 10px;
    margin-top: 1em;
    cursor: pointer;
  }
`