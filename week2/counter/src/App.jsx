import { useState } from "react";

const Counter=()=>{
  const[counter,setCounter]=useState(0);

  const increase=()=>{
    setCounter(counter=>counter+1);
    console.log("increase가 클릭됨");
  }
  const decrease=()=>{
    setCounter(counter=>counter-1);
    console.log("decrease가 클릭됨");
  }

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={increase}>+1</button>
      <button onClick={decrease}>-1</button>
    </div>
  )
}

export default Counter
