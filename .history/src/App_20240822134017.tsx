import React from 'react';
// import logo from './logo.svg';
import './App.css';

type Props = {
  val : string;
  buttonColour : string;
}

function DisplayScreen(){ // changes on click for = sign
  return <></>;
}

function Buttons(props : Props){

  const val = props.val;
  const buttoncolour = props.buttonColour;

  document.documentElement.style.setProperty(`--bgColour`, buttoncolour);

  function handleClick(){

  }

  return <button className = "Buttons" onClick = {handleClick}>
    {val}
  </button>
}

export default function Calc() {
  return (
    <main>
      <div className = "row">
        {/* <DisplayScreen> </DisplayScreen> */}
      </div>
      <div className = "row">
        <Buttons val={'AC'} buttonColour='pink'/>
        <Buttons val={'+/-'} buttonColour='green' />
        <Buttons val={'%'} buttonColour='red' />
        <Buttons val={'divide'} buttonColour='blue' />
      </div>
      <div>
        <Buttons val={'+/-'} buttonColour='green' />
      </div>
    </main>
    
  );
}

