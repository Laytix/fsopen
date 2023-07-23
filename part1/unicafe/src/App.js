import { useState } from 'react';

const Button = ({text, onClickHandle}) => <button onClick={onClickHandle}>{text}</button>


const StatisticsLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if(good === 0 && neutral === 0 && bad === 0){
    return(
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>

    )
  }

  return(
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good}/>
          <StatisticsLine text="neutral" value={neutral}/>
          <StatisticsLine text="bad" value={bad}/>
          <StatisticsLine text="all" value={good + neutral + bad}/>
          <StatisticsLine text="average" value={ ((good * 1) + (bad * -1))/(good + neutral + bad)}/>
          <StatisticsLine text="positive" value={(good/(good + neutral + bad))* 100}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)



  return (
    <div>
      <h2>give feedback</h2>
      <Button onClickHandle={increaseGood} text="good"/>
      <Button onClickHandle={increaseNeutral} text="neutral"/>
      <Button onClickHandle={increaseBad} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App