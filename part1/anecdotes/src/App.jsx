import { useState } from 'react'
// Step1: add a button that shows a random anecdote ✔
// Step2: display votes ✔
// Step3: display the anecdote with the largest number of votes ✔

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
  })
  const randomize = () => { //Randomize selected
    const ram = Math.floor(Math.random()*anecdotes.length)
    setSelected(ram)
  }
  const addVote= () =>{ // addVote to the selected anecdote
    const copy = {...votes}
    copy[selected] += 1
    setVotes(copy)
  }
  const mostVotes = () => {
    let max = 0
    for (let index = 1; index < Object.keys(votes).length; index++) {
      const element = votes
      if(element[index] > element[max]) 
        max = index;
    }
    return max
  }
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={randomize}>next anecdote</button>
      <button onClick={addVote}>Vote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotes()]}</p>
      <p>has {votes[mostVotes()]}</p>
    </>
  )
}
export default App
