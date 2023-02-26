import React, { useState } from 'react'


const Button = ({onClick, text}) =>{
  return(
    <div>
      <button onClick={onClick} >{text}</button>
    </div>
  )
}
const StatisticLine = ({value, text}) => {
  return(
    <tr>
      <th> {text} </th>
      <td> {value}</td>
    </tr>
    
  )

}

const Statistics = ({good, neutral, bad, sum, average, postivePercentage}) =>{
  if( sum === 0){
    return(
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  
  return(
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={sum}/>
          <StatisticLine text="average" value={average}/>
          <StatisticLine text="positive" value={postivePercentage}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const sum = bad + good + neutral

  const average = ((good*1)+(neutral * 0) + (bad*-1)) / sum

  const postivePercentage = `${(good/sum)*100}%`

  const increaseGoodByOne = () => setGood(good + 1)
  const increaseNeutralByOne = () => setNeutral(neutral + 1)

  const increaseBadByOne = () => setBad(bad + 1)


  return (
    <div>
      <h1>Give Feedback</h1>

      <Button onClick={increaseGoodByOne} text="Good"/>
      <Button onClick={increaseNeutralByOne} text="Neutral"/>
      <Button onClick={increaseBadByOne} text="Bad"/>
      
      <Statistics 
      good={good} 
      bad={bad} 
      neutral={neutral} 
      sum={sum}
      average={average}
      postivePercentage={postivePercentage} />
    </div>
  )
}

export default App