import React, { useState, useRef, useEffect } from 'react';
import './App.scss';

const matchResult = (scoreBlue, scoreRed) => {
  return (scoreBlue == scoreRed) ? 'Tie' : (scoreBlue > scoreRed ? 'Win' : 'Loss')
}

var MAX_ID = 0;
const STAGES = ["Ayutthaya", "Black Forest", "Blizzard World", "Busan", "Castillo", "Château Guillard", "Dorado", "Ecopoint: Antarctica", "Eichenwalde", "Hanamura", "Havana", "Hollywood", "Horizon Lunar Colony", "Ilios", "Junkertown", "King's Row", "Lijiang Tower", "Necropolis", "Nepal", "Numbani", "Oasis", "Paris", "Petra", "Rialto", "Route 66", "Temple of Anubis", "Volskaya Industries", "Watchpoint: Gibraltar"]

function Entry(props) {
  const [stage, setStage] = useState(STAGES[0]);
  const [scoreBlue, setScoreBlue] = useState(0);
  const [scoreRed, setScoreRed] = useState(0);
  const [locked, setLocked] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const handleUpdate = () => {
    props.onUpdate(props.id, stage, scoreBlue, scoreRed, locked, deleted)
  }

  const handleStageSelect = (e) => {
    setStage(e.target.value)
  }

  const handleLock = (e) => {
    setLocked(!locked)
  }

  const handleDeleted = () => {
    setDeleted(true)
  }

  const handleScoreBlue = (e) => {
    setScoreBlue(e.target.value)
  }

  const handleScoreRed = (e) => {
    setScoreRed(e.target.value)
  }

  useEffect(() => {
    handleUpdate()
  }, [stage, scoreBlue, scoreRed, locked, deleted])

  if(deleted) {
    return <></>
  }

  if(locked) {
    return (
      <tr>
        <td>{stage}</td>
        <td>{`${scoreBlue} - ${scoreRed}`}</td>
        <td>{matchResult(scoreBlue, scoreRed)}</td>
        <td>{new Date(props.added).toLocaleTimeString()}</td>
        <td><div className="clickable" title="Row locked" onClick={handleLock}>🔒</div></td>
      </tr>
    )
  }
  else {
    return (
      <tr>
        <td>
          <select name="stage" onChange={handleStageSelect}>
            {STAGES.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </td>
        <td><input type="number" min={0} value={scoreBlue} onChange={handleScoreBlue} /> - <input type="number" min={0} value={scoreRed} onChange={handleScoreRed} /></td>
        <td>{matchResult(scoreBlue, scoreRed)}</td>
        <td>{new Date(props.added).toLocaleTimeString()}</td>
        <td><div className="clickable" title="Row unlocked" onClick={handleLock}>🔓</div></td>
        <td><div className="clickable" title="Delete" onClick={handleDeleted}>🗑</div></td>
      </tr>
    )
  }

}

function App() {
  const [entries, setEntries] = useState([])
  const [records, setRecords] = useState([])
  const [totalWin, setTotalWin] = useState(0)
  const [totalTie, setTotalTie] = useState(0)
  const [totalLoss, setTotalLoss] = useState(0)


  const handleUpdate = (key, stage, scoreBlue, scoreRed, locked, deleted) => {
    const clone = JSON.parse(JSON.stringify(records))
    const outcome = matchResult(scoreBlue, scoreRed);

    if (outcome === 'Win') clone[key] = 1;
    if (outcome === 'Tie') clone[key] = 0;
    if (outcome === 'Loss') clone[key] = -1;
    if (deleted) clone[key] = null

    setTotalWin(clone.filter(e => e === 1).length)
    setTotalTie(clone.filter(e => e === 0).length)
    setTotalLoss(clone.filter(e => e === -1).length)

    setRecords(clone);

    console.log(key, stage, scoreBlue, scoreRed, locked, deleted)
    console.log(clone)
  }

  const handleClick = (e) => {
    setEntries([
      <Entry key={MAX_ID + 1} id={MAX_ID + 1} onUpdate={handleUpdate} added={new Date()} />,
      ...entries
    ])
    MAX_ID++;
  }

  return (
    <div className="App">
      <header>
        <h3>Win/Loss</h3>
        <a className="button" onClick={handleClick}>New row</a>
        <h1>
          {`${totalWin} - ${totalLoss}`}
          <span className="ties">{totalTie > 0 ? `, ${totalTie} tie${totalTie > 1 ? 's' : ''}` : ''}</span>
        </h1>
      </header>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Map</th>
            <th>Score</th>
            <th>Win/Loss</th>
            <th>Time added</th>
          </tr>
        </thead>
        <tbody>
          {entries}
        </tbody>
      </table>
    </div>
  );
}

export default App;
