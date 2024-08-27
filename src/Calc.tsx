import React from 'react';
import { useState } from 'react';
import './Calc.css';
import Buttons from './Buttons';



export default function Calc() {
  const [display, setDisplay] = useState('0'); // display is string
  var setAC : boolean = true;

  return (
    <div className = "GridWrapper">
      <div className = "DisplayScreen">{`${(display)}`}</div>
      <Buttons val={setAC ? "AC" : "C"} colour = 'darkgrey' setDisplay = {setDisplay} /> 
      <Buttons val={'+/-'} colour = 'darkgrey' setDisplay = {setDisplay}/>
      <Buttons val={'%'} colour = 'darkgrey' setDisplay = {setDisplay} />
      <Buttons val={'÷'} colour = 'orange' setDisplay = {setDisplay} />

      <Buttons val={'7'} colour = 'lightgrey' setDisplay = {setDisplay} />
      <Buttons val={'8'} colour = 'lightgrey' setDisplay = {setDisplay}/>
      <Buttons val={'9'} colour = 'lightgrey' setDisplay = {setDisplay}/ >
      <Buttons val={'x'} colour = 'orange'  setDisplay = {setDisplay}/>

      <Buttons val={'4'} colour = 'lightgrey' setDisplay = {setDisplay}/>
      <Buttons val={'5'} colour = 'lightgrey' setDisplay = {setDisplay}/>
      <Buttons val={'6'} colour = 'lightgrey' setDisplay = {setDisplay}/ >
      <Buttons val={'-'} colour = 'orange'  setDisplay = {setDisplay}/>

      <Buttons val={'1'} colour = 'lightgrey' setDisplay = {setDisplay}/>
      <Buttons val={'2'} colour = 'lightgrey' setDisplay = {setDisplay}/>
      <Buttons val={'3'} colour = 'lightgrey' setDisplay = {setDisplay}/ >
      <Buttons val={'+'} colour = 'orange'  setDisplay = {setDisplay}/>

      <Buttons val={'0'} colour = 'lightgrey' setDisplay = {setDisplay} longer = {true}/>
      <Buttons val={'.'} colour = 'lightgrey' setDisplay = {setDisplay}/>
      <Buttons val={'='} colour = 'orange' setDisplay = {setDisplay}/>
    </div>
    
  );
}

