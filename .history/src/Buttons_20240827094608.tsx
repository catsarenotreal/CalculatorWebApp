
import React from 'react';
import './Buttons.css'
import { useState } from 'react';

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


function stackBack(val : Operations | string){ // takes in operation, compresses the stack (nothing is returned)
  
    // after pressing an operation, work on the previous (if any) calculation and squeeze to one grid
    // basically when operation is encountered, squeeze previous into a number
    // assume that prev is number alr

    // unfortunately can't use switch cases here because of val

    if (isOp(val)){ // is operation


        
        setAC = false;
        if (decMode) decMode = false;

        if (stack.length == 1){ // num only, only need to push in the op
            if (val === "="){
                nextRefresh = true;
                return;
            }
            stack.push(val);
        }

        else{ // has num and operation, causes collapse of stack then adds the current op to the stack
            let firstNum : number = Number(stack[0]);
            let middleOp = stack[1];

            if (!isOp(middleOp)){
                console.log("ERROR");
                return ; // this should not happen la.........
            }

            let answer = calculation(firstNum, currNum, middleOp);
            stack.length = 0; // collapsing

            if (typeof answer === "string"){ // for div by 0
                return; // returns with stack.lenght == 0
            }
            else {
            
            stack = [answer.toString()];
            if (val != "=") {
                stack.push(val);  // pushes the current op // dont let "%" be pushed also
                nextRefresh = true;
            }
            currNum = answer;
            }
        }

        console.log(val + " has");

        for (let i = 0; i < stack.length; i++){
            console.log(stack[i])
        }

        console.log("end");

    }

    else if (val === "+/-"){
        stack[stack.length-1] = "-" + stack[stack.length-1];
        currNum = currNum * -1;
        // setDisplay(currNum.toString());
    }


    else if (val === "%"){
      let answer = calculation(currNum, 0.01, "x"); // answer will be num

      stack.pop(); // remove currnum
      stack.push(answer.toString());
      currNum = answer;
    }

    else if (val === "."){
        decMode = true;
  
        if (isOp(stack[stack.length-1])){ // is already an operation, then set to 0.sth
          currNum = 0.0;
          stack.push('0.');

  
        }
        else{ 
          stack.pop();
          stack.push(currNum.toString() + ".")
  
          currNum = currNum * 1.0;
        }
    }

    else if (!Number.isNaN(Number(val))){ // is number
        console.log("at least we're getting heer")

        setAC = false;

        if (stack.length == 2){ // digit + op only
            console.log("hewwo owo")
            stack.push(val.toString());
            currNum = Number(val);
        }
        else if (stack.length == 1 || stack.length == 3){ // currently on number mode

            if (!decMode) {
            currNum = currNum * 10 + Number(val);
            stack.pop(); // remove current existing number and replace with new one
            stack.push(currNum.toString());
            }
            else{
            console.log("receiving num? ", stack[stack.length-1])
            let temp : string = stack[stack.length-1] + val;
            console.log("newnumber: ", temp)
            stack.pop();
            stack.push(temp);
            currNum = Number(temp); // hacky non-math way to get the dec point
            }
            
        }
    }

  


  }



function Buttons( {val, colour, setDisplay, longer}  : Props){


  
    function handleClick(props : Props){
      var val = props.val;
  
      if (nextRefresh) { // todo: find why this isn't working
        refresh(props);
        nextRefresh = false;
      }
      
      if (val === "AC" || val === "C"){
        refresh(props);
      }
      
      else if (val === "+/-"){
        // always only applies to currNum this is dumb
        stack[stack.length-1] = "-" + stack[stack.length-1];
        currNum = currNum * -1;
        setDisplay(currNum.toString());
      }

      else{
        stackBack(val);
        if (isOp(val)) {
            setDisplay(currNum.toString());
        }
        else if (!Number.isNaN(stack[stack.length-1])) setDisplay(stack[stack.length-1]);
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


export default Buttons;