import React from 'react';
// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

let stack : string[] = [];
let prevOp : operations = "+";
var currNum : number = 0;

// const [display, setDisplay] = useState(0);

type operations = "+" | "-" | "x" | "÷";

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

// function takeOp(op : string){

// }

function Buttons( { val, colour, setDisplay }  : Props){


  // const [display, setDisplay] = useState(0);

  function calculation(op : string) { // when pressing operations, the prior evaluation is supposed to show  
    
    let newNum : number = Number(stack.join(''));
    stack.length = 0; // clearing stack
    
    switch (op){ 
      case "+":
        currNum += newNum;
        console.log("sums to" + currNum);
        break;
      case "-":
        currNum -= newNum;
        break;
      case "÷": 
        if (newNum === 0) {
          setDisplay(NaN);
          refresh({val, colour, setDisplay }); // display not a number and refresh backend
          break;
        }
        currNum /= newNum;
        break;
      case "x":
        currNum *= newNum;
        break;
      
    }
  
    setDisplay(currNum);
    console.log("calculation: " + currNum);
  
  }

  function handleClick(props : Props){
    var val = props.val;

    if (val === "="){
      val = prevOp;
    }
    
    if (val === "+" || val === "-" || val === "x" || val === "÷"){
      prevOp = val;
      calculation(val);
      setDisplay(currNum);
      
    }
    else if (val === "AC"){
      refresh(props);
    }
    else{
      stack.push(val); 
      let newNum : number = Number(stack.join(''));
      console.log("number selected: " + newNum);
      setDisplay(newNum);
    }
  }

  return <button className = {`Buttons ${colour}`} onClick = {() => handleClick({ val, colour, setDisplay })}>
    {val}
  </button>
}

/*

value1 ? 'a' : 'b'

value1 || 'a'

// if value1 is true => value1
// if value1 is false => 'a'

value2 && 'a'
// if value2 is true => 'a'
// if value2 is false => ignore

*/

export default function Calc() {
  const [display, setDisplay] = useState(0); // display is number by default
  return (
    <main>
      <div className = "row">
        <div className= "DisplayScreen">{`${(display) || 'Not a Number'}`}</div>
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

