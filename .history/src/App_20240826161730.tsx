import React from 'react';
import { useState } from 'react';
import './App.css';

let stack : string[] = ['0']; // length should never be 0
// let prevOp : operations = "+";
var currNum : number = 0; // number on display to the display screen
var nextRefresh : boolean = false; // decides whether to refresh upon input of new numbers
var setAC : boolean = true;
var decMode : boolean = false; // off by default
// var restarted : boolean = true;

const operations = ["+", "-", "x", "÷", "="] as const;
type Operations = (typeof operations)[number];
const isOp = (x:any): x is Operations => operations.includes(x);

type Props = {
  val : string;
  colour : 'orange'|'darkgrey'|'lightgrey';
  setDisplay : React.Dispatch<React.SetStateAction<string>>;
  longer? : boolean;
}

function refresh(props : Props){
  stack.length = 0;
  stack = ['0'];
  currNum = 0;
  const setDisplay = props.setDisplay;
  setDisplay('0');
  decMode = false;
  setAC = true;
}

// function takeOp(op : string){

// }

function Buttons( {val, colour, setDisplay, longer}  : Props){


  function stackBack(val : Operations | string){ // takes in operation, compresses the stack (nothing is returned)

    // after pressing an operation, work on the previous (if any) calculation and squeeze to one grid
    // basically when operation is encountered, squeeze previous into a number
    // assume that prev is number alr

    if (isOp(val)){ // is operation, "" only when % happens
      if (decMode) decMode = false;

      if (stack.length == 1){ // num only, only need to push in the op
        if (val === "="){
          return;
        }
        stack.push(val);
      }

      else{ // has num and operation, causes collapse of stack then adds the current op to the stack
        let firstNum : number = Number(stack[0]);
        let middleOp = stack[1];

        if (!isOp(middleOp)){
          console.log("error");
          return ; // this should not happen la.........
        }

        let answer = calculation(firstNum, currNum, middleOp);
        stack.length = 0; // collapsing

        if (typeof answer === "string"){ // for div by 0
          return; // returns with stack.lenght == 0
        }
        else {
          stack = [answer.toString()];
          if (val != "=") stack.push(val);  // pushes the current op // dont let "%" be pushed also
          currNum = answer;
        }
      }

    }

    else if (val === "."){
      decMode = true;
      if (isOp(stack[-1])){ // is already an operation, then set to 0.sth
        currNum = 0.0;
        stack.push('0.0');
      }
      else{ // just assume to be number...?
        // currNum = currNum * 1.0;
        stack.pop();
        stack.push(currNum.toString() + ".")
        console.log("number appended " + currNum.toString() + ".")

        currNum = currNum * 1.0;
      }
    }

    else if (val === "%"){
      let answer = calculation(currNum, 0.01, "x"); // answer will be num

      stack.pop(); // remove currnum
      stack.push(answer.toString());
      currNum = answer;
    }

    else{ // is number

      if (stack.length == 2){ // digit + op only
        stack.push(val.toString());
        currNum = Number(val);
      }
      else if (stack.length == 1 || stack.length == 3){ // currently on number mode
        // dont run the op yet
        // only trying to push the second number tgt
        // ignore the first two elements
        if (!decMode) currNum = currNum * 10 + Number(val);
        else{
          console.log("receiving num? ", stack[stack.length-1])
          currNum = Number(currNum.toString() + val); // hacky non-math way to get the dec point
        }
        stack.pop(); // remove current existing number and replace with new one
        stack.push(currNum.toString());
        
      }
    }

  


  }

  function calculation(firstNum : number, secondNum : number, op : Operations) : number  {

    switch (op){ 
      case "+": // 
        return firstNum + secondNum;
      case "-": 
        return firstNum - secondNum;
      case "÷":  
        return firstNum / secondNum; // if error just returns infinity anyway...
      case "x":
        return firstNum * secondNum;
      case "=": // will never happen
        return 0; 
    }
  
  }

  function handleClick(props : Props){
    var val = props.val;
    // var setACDis = props.setACDis;

    if (nextRefresh) {
      refresh(props);
      // if (typeof setACDis != "undefined") setACDis("AC");
      nextRefresh = false;
    }
    
    if (val === "AC" || val === "C"){
      refresh(props);
      console.log("ac pressed outside");
      // if (typeof setACDis != "undefined") {
      //   setACDis("AC");
      // }
    }
    

    else if (val === "+/-"){
      // always only applies to currNum this is dumb
      stack[stack.length-1] = "-" + stack[stack.length-1];
      currNum = currNum * -1;
      setDisplay(currNum.toString());
    }

    else if (val === "%"){
      // literally just implicitly does a x0.01 on the current number (with brackets)

      stackBack("%") // push back an empty one?
      setDisplay(currNum.toString());

    }

    else if (val === "."){ // if prev is number vs if prev is op
      // disallow multiple . together
      stackBack(val);
      setDisplay(stack[stack.length-1]);


    }

    else{ // number 
      // post-operation number
      setAC = false;
      if (isOp(val) || !Number.isNaN(Number(val))){
        console.log("helo");
        stackBack(val);
      }

      if (stack.length == 0){ // division by 0 has occured, trigger refresh
        setDisplay("Not a Number");
        refresh(props); // resets stack length to > 0
      }
      else{
        console.log(currNum);
        setDisplay(currNum.toString());
      }

      if (val === "="){
        nextRefresh = true;
      }

    }
  }

  if (longer){ // only applies to the 0
    return <button className = {`Buttons ${colour} longer`} onClick = {() => handleClick({ val, colour, setDisplay})}>
    {val}
  </button>
  }

  return <button className = {`Buttons ${colour}`} onClick = {() => handleClick({ val, colour, setDisplay})}>
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
  const [display, setDisplay] = useState('0'); // display is number by default
  const [ACdis, setACDis] = useState<'AC' | 'C'>('C'); // only changes to C when there are numbers in the stack (i.e. is active)
  // if (stack[0] != "0") setACDis("C");
  // if (stack.length > 2) setACDis('AC');
  // startWithRefresh(setACDis);
  return (
    <div>
      {/* <div className = "row">
        <div className= "DisplayScreen">{`${(display)}`}</div>
      </div> */}
      <div className = "wrapper">
      {/* <div className = "row"> */}
        <div className= "DisplayScreen">{`${(display)}`}</div>
        <Buttons val={setAC ? "AC" : "C"} colour = 'darkgrey' setDisplay = {setDisplay} /> 
        <Buttons val={'+/-'} colour = 'darkgrey' setDisplay = {setDisplay}/>
        <Buttons val={'%'} colour = 'darkgrey' setDisplay = {setDisplay} / >
        <Buttons val={'÷'} colour = 'orange' setDisplay = {setDisplay} />
      {/* </div> */}
      {/* <div className = "row"> */}
        <Buttons val={'7'} colour = 'lightgrey' setDisplay = {setDisplay} />
        <Buttons val={'8'} colour = 'lightgrey' setDisplay = {setDisplay}/>
        <Buttons val={'9'} colour = 'lightgrey' setDisplay = {setDisplay}/ >
        <Buttons val={'x'} colour = 'orange'  setDisplay = {setDisplay}/>
      {/* </div> */}
      {/* <div className = "row"> */}
        <Buttons val={'4'} colour = 'lightgrey' setDisplay = {setDisplay}/>
        <Buttons val={'5'} colour = 'lightgrey' setDisplay = {setDisplay}/>
        <Buttons val={'6'} colour = 'lightgrey' setDisplay = {setDisplay}/ >
        <Buttons val={'-'} colour = 'orange'  setDisplay = {setDisplay}/>
      {/* </div> */}
      {/* <div className = "row"> */}
        <Buttons val={'1'} colour = 'lightgrey' setDisplay = {setDisplay}/>
        <Buttons val={'2'} colour = 'lightgrey' setDisplay = {setDisplay}/>
        <Buttons val={'3'} colour = 'lightgrey' setDisplay = {setDisplay}/ >
        <Buttons val={'+'} colour = 'orange'  setDisplay = {setDisplay}/>
      {/* </div>
      <div className = "row"> */}
        <Buttons val={'0'} colour = 'lightgrey' setDisplay = {setDisplay} longer = {true}/>
        <Buttons val={'.'} colour = 'lightgrey' setDisplay = {setDisplay}/>
        <Buttons val={'='} colour = 'orange' setDisplay = {setDisplay}/>
      </div>
    </div>
    
  );
}

