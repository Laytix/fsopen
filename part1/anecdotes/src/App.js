import React, { useState } from 'react'

const Quote = ({text}) =>{
  return(
    <p>{text}</p>
  )
}

const Button = ({onClick, text }) =>{
  return(
    <button onClick={onClick}>{text}</button>
  )
}
const Votes = (props) =>{
  return(
    <p>has {props.votes} votes</p>
  )
}

const MostVotes = ({text})=>{
  return(
    <div>
      <h2>Anecdote with the most votes</h2>
      <p>{text}</p>
    </div>
  )
}

const App = () => {
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const initialVotes = Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)

  const changeQuote = () =>{
    let count = Math.floor(Math.random()*anecdotes.length)
    if( count === selected){
      count = Math.floor(Math.random()*anecdotes.length)
    }
    setSelected(count)
  }

  const tallyVote = () =>{
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }

  let indexOfMaxValue = votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
  // console.log(anecdotes[indexOfMaxValue]);

  return (
    <div>
      <Quote text={anecdotes[selected]}/>
      <Votes votes={votes[selected]} />
      <Button onClick={tallyVote} text="Vote"/>
      <Button onClick={changeQuote} text="next anecdote"/>
      <MostVotes text={anecdotes[indexOfMaxValue]}/>

    </div>
  )
}
export default App;
