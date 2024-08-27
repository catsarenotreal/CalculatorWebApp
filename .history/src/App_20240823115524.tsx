import React from 'react';
// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

let stack : string[] = [];
var currNum : number = 0;

// const [display, setDisplay] = useState(0);

type Props = {
  val : string;
  colour : 'orange'|'darkgrey'|'lightgrey';
  setDisplay : React.Dispatch<React.SetStateAction<number>>;
}

function refresh(props : Props){
  stack.length = 0;
  currNum = 0;
  const setDisplay = props.setDisplay;
  setDisplay(0);
}


function Buttons(props : Props){

  // const [display, setDisplay] = useState(0);

  const val = props.val;
  const colour = props.colour;
  const setDisplay = props.setDisplay;

  function calculation(op : string) { // when pressing operations, the prior evaluation is supposed to show  
    
    let newNum : number = Number(stack.join(''));
    console.log("adding " + newNum);
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
          refresh(props); // display not a number and refresh backend
          break;
        }
        currNum /= newNum;
        break;
      case "x":
        currNum *= newNum;
        break;
      default: 
        break;
    }
  
    setDisplay(currNum);
    console.log("calculation: " + currNum);
  
  }


  function handleClick(props : Props){
    const val = props.val;
    
    if (val === "+" || val === "-" || val === "x" || val === "÷" || val　=== "="){
      calculation(val);
      // console.log("outside: " + currNum);
      setDisplay(currNum);
      
    }
    else if (val === "AC"){
      refresh(props);
    }
    else{
      stack.push(val);
      console.log("value is " + val);
      // for (let i = 0; i < stack.length; i++){
      //   console.log(stack[i]);
      // }
      let newNum : number = Number(stack.join(''));
      console.log("number selected: " + newNum);
      setDisplay(newNum);
    }
  }

  return <button className = {`Buttons ${colour}`} onClick = {() => handleClick(props)}>
    {val}
  </button>
}

export default function Calc() {
  const [display, setDisplay] = useState(0); // display is number by default
  return (
    <main>
      <div className = "row">
        <div className= "DisplayScreen">{display}</div>
      </div>
      <div className = "row">
        <Buttons val={'AC'} colour = 'darkgrey' setDisplay = {setDisplay} />
        <Buttons val={'+/-'} colour = 'darkgrey' setDisplay = {setDisplay}/>
        <Buttons val={'%'} colour = 'darkgrey' setDisplay = {setDisplay} / >
        <Buttons val={'÷'} colour = 'orange' setDisplay = {setDisplay} />
      </div>
      <div className = "row">
        <Buttons val={'7'} colour = 'lightgrey' setDisplay = {setDisplay} />
        <Buttons val={'8'} colour = 'lightgrey' setDisplay = {setDisplay}/>
        <Buttons val={'9'} colour = 'lightgrey' setDisplay = {setDisplay}/ >
        <Buttons val={'x'} colour = 'orange'  setDisplay = {setDisplay}/>
      </div>
      <div className = "row">
        <Buttons val={'4'} colour = 'lightgrey' setDisplay = {setDisplay}/>
        <Buttons val={'5'} colour = 'lightgrey' setDisplay = {setDisplay}/>
        <Buttons val={'6'} colour = 'lightgrey' setDisplay = {setDisplay}/ >
        <Buttons val={'-'} colour = 'orange'  setDisplay = {setDisplay}/>
      </div>
      <div className = "row">
        <Buttons val={'1'} colour = 'lightgrey' setDisplay = {setDisplay}/>
        <Buttons val={'2'} colour = 'lightgrey' setDisplay = {setDisplay}/>
        <Buttons val={'3'} colour = 'lightgrey' setDisplay = {setDisplay}/ >
        <Buttons val={'+'} colour = 'orange'  setDisplay = {setDisplay}/>
      </div>
      <div className = "row">
        <Buttons val={'0'} colour = 'lightgrey' setDisplay = {setDisplay}/>
        <Buttons val={'.'} colour = 'lightgrey' setDisplay = {setDisplay}/>
        <Buttons val={'='} colour = 'orange' setDisplay = {setDisplay}/>
      </div>
    </main>
    
  );
}

