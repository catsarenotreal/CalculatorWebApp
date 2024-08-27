import React from 'react';
// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

let stack : string[] = [];
var currNum : number = 0;

const [display, setDisplay] = useState(0);

type Props = {
  val : string;
  colour : 'orange'|'darkgrey'|'lightgrey';
}

function refresh(){

}

function calculation(op : string) { // when pressing operations, the prior evaluation is supposed to show

  // var currNum : number;

  
  let newNum : number = Number(stack.join());
  stack.length = 0; // clearing stack

  switch (op){ // er this is wrong
    case "+":
      currNum += newNum;
      break;
    case "-":
      currNum -= newNum;
      break;
    case "÷": 
      if (newNum === 0) {
        refresh(); // display not a number and refresh backend
      }
      currNum /= newNum;
      break;
    case "x":
      currNum *= newNum;
      break;
  }
  

  setDisplay(currNum);

}

function DisplayScreen(){ // changes on click for = sign
  return <div className = "box">
    currNum;
  </div>
}

function Buttons(props : Props){

  const [display, setDisplay] = useState(0);

  const val = props.val;
  const colour = props.colour;


  function handleClick(props : Props){
    const val = props.val;
    
    if (val === "+" || val === "-" || val === "x" || val === "÷"){
      var output = calculation(val);
    }
    else{
      stack.push(val);
    }
  }

  return <button className = {`Buttons ${colour}`} onClick = {() => handleClick(props)}>
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
      <div className = "row">
        <Buttons val={'0'} colour = 'lightgrey'/>
        <Buttons val={'.'} colour = 'lightgrey'/>
        <Buttons val={'='} colour = 'orange'/>
      </div>
    </main>
    
  );
}

