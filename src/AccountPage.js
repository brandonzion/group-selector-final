import React from "react";
const Compute = () => {
    function test(){
        alert('hello')
    }


    return (
        <div>
            <h1>This is a test</h1>
            <button onClick={test}>Click me</button>
        </div>
    );
};
  
export default Compute;