import React from "react";

const Total = ({parts}) =>{
    const sum = parts.reduce((total, next) => total + next.exercises,0)
    return(
      <p>
        <b>total number of exercises {sum}</b>
      </p>
    )
}

export default Total