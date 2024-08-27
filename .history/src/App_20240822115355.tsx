import React from 'react';
// import logo from './logo.svg';
import './App.css';

type Props = {
  val : string;
}

function DisplayScreen(){ // changes on click for = sign
  return <></>;
}

function Buttons(props : Props){

  const val = props.val;

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
        <Buttons val={'dsfadsfdafsfsafsfd'} />
      </div>
    </main>
    
  );
}

