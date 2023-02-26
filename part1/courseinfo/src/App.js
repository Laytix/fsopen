import React from 'react'

const Header = (props) =>{
  return(
    <h1>{props.course}</h1>
  )
}

const Part = (props) =>{
  return(
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = (props) =>{
  return(
    <div>
      <Part part={props.part1.name} exercises={props.part1.exercises}/>
      <Part part={props.part2.name} exercises={props.part2.exercises}/>
      <Part part={props.part3.name} exercises={props.part3.exercises}/>
    </div>
  )
}

const Total = (props) =>{
  return(
    <p>
      Number of exercises {props.part1.exercises + props.part2.exercises + props.part3.exercises}
    </p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content part1={course.parts[0]} part2={course.parts[1]} part3={course.parts[2]} />
      <Total part1={course.parts[0]} part2={course.parts[1]} part3={course.parts[2]} />
    </div>
  )
}

export default App