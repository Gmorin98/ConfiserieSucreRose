// Necessary Import
import React from 'react';
import styled from "styled-components";

// Components and Other Import


const Checkbox = ({children}) => {
  return (
    <Wrapper>
      <label className="container">
        <input type="checkbox" />
        <span className="checkmark"></span>
        {children}
      </label>
    </Wrapper>
  )
}

export default Checkbox;

const Wrapper = styled.div`
  /* Hide the default checkbox */
  .container input {
    display: none;
  }

  /* Create a custom checkbox */
  .container {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    margin-top: 0.5em;
  }

  /* The checkmark */
  .container .checkmark {
    display: inline-block;
    position: relative;
    height: 25px;
    width: 25px;
    background-color: white;
    border: 2px solid #B63643;
    border-radius: 4px;
    margin-right: 10px; /* space between checkbox and label */
    transition: background-color 0.3s;
  }

  /* Show the checkmark when checked */
  .container input:checked + .checkmark {
    background-color: #B63643;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .container .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    left: 8px;
    top: 4px;
    width: 6px;
    height: 12px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }

  /* Show the checkmark when checked */
  .container input:checked + .checkmark:after {
    display: block;
  }
`