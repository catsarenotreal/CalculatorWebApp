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
        <Buttons val={'÷'} colour = 'orange' />
      </div>
      <div className = "row">
        <Buttons val={'7'} colour = 'lightgrey'/>
        <Buttons val={'8'} colour = 'lightgrey'/>
        <Buttons val={'9'} colour = 'lightgrey'/ >
        <Buttons val={'x'} colour = 'orange' />
      </div>
      <div className = "row">
        <Buttons val={'4'} colour = 'lightgrey'/>
        <Buttons val={'5'} colour = 'lightgrey'/>
        <Buttons val={'6'} colour = 'lightgrey'/ >
        <Buttons val={'-'} colour = 'orange' />
      </div>
      <div className = "row">
        <Buttons val={'1'} colour = 'lightgrey'/>
        <Buttons val={'2'} colour = 'lightgrey'/>
        <Buttons val={'3'} colour = 'lightgrey'/ >
        <Buttons val={'+'} colour = 'orange' />
      </div>
    </main>
    
  );
}

