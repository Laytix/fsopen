import { useState } from 'react'


const StatisticLine = ({text, value}) =>{
  return(
    <tr>
      <td>{text}</td>
      <td> {value}</td>
    </tr>
  )
}
const Statistics = ({good, neutral, bad}) =>{

  let total = good + neutral + bad;
  let average = ((good * 1) + (bad * -1))/total;
  let postive = good * 100/total;
  if (total == 0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={total}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={postive}/>
      </tbody>
    </table>
  )
}

const Button = ({text, buttonhandle}) =>{
  return(
    <button onClick={buttonhandle}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1);
  const handleBad = () => setBad(bad + 1);
  const handleNeutral = () => setNeutral(neutral + 1);



  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button text="good" buttonhandle={handleGood}/>
        <Button text="neutral" buttonhandle={handleNeutral}/>
        <Button text="bad" buttonhandle={handleBad}/>
      </div>
      <h2>Statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App