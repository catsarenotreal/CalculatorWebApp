import React from 'react';
// import logo from './logo.svg';
import './App.css';

type Props = {
  val : string;
  buttonColor : string;
}

function DisplayScreen(){ // changes on click for = sign
  return <></>;
}

function Buttons(props : Props){

  const val = props.val;
  const buttoncolor = props.buttonColor;

  document.documentElement.style.setProperty(`--bgColour`, buttoncolor);

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
        <Buttons val={'AC'} buttonColor='pink'/>
        <Buttons val={'+/-'} buttonColor='grey' />
        <Buttons val={'%'} buttonColor='grey' />
        <Buttons val={'divide'} buttonColor='grey' />
      </div>
    </main>
    
  );
}

