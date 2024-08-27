import React from 'react';
// import logo from './logo.svg';
import './App.css';

type Props = {
  val : string;
  colour : 'orange'|'darkgrey'|'lightgrey';
}

function DisplayScreen(){ // changes on click for = sign
  return <></>;
}

function Buttons(props : Props){

  const val = props.val;
  const colour = props.colour;


  function handleClick(){

  }

  return <button className = {`Buttons ${colour}`} onClick = {handleClick}>
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
        <Buttons val={'AC'} colour = 'darkgrey'/>
        <Buttons val={'+/-'} colour = 'darkgrey'/>
        <Buttons val={'%'} colour = 'darkgrey'/ >
        <Buttons val={'divide'} colour = 'orange' />
      </div>
      <div>
        
      </div>
    </main>
    
  );
}

