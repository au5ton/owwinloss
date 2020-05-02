/* eslint-disable */
import React, { useState } from 'react';
import Entry from './Entry'
import { matchResult } from './common'
import shortid from 'shortid'
import './App.scss';

export default function App() {
  const [entries, setEntries] = useState([])
  const [records, setRecords] = useState([])
  const [totalWin, setTotalWin] = useState(0)
  const [totalTie, setTotalTie] = useState(0)
  const [totalLoss, setTotalLoss] = useState(0)

  const [startingSR, setStartingSR] = useState(0)
  const [endingSR, setEndingSR] = useState(0)
  const [sessionStarted, _] = useState(new Date())

  const handleUpdate = (key, stage, scoreBlue, scoreRed, deleted, endSR, timestamp) => {
    console.log(key, stage, scoreBlue, scoreRed, deleted, endSR)

    // If performing a delete operation, take care of it and exit
    if (deleted) {
      let idx = records.findIndex(e => e.key === key)
      records.splice(idx, 1)
      setRecords(records)
      console.log('deleted', records)
    }
    // if record doesn't exist for this key
    else if (records.findIndex(e => e.key === key) === -1) {
      records.push({
        key: key,
        matchOutcome: matchResult(scoreBlue, scoreRed),
        endSR: endSR,
        timestamp: new Date(timestamp).valueOf()
      })
      console.log('pushed', records)
    }
    else {
      // otherwise, modify our record for this key
      const idx = records.findIndex(e => e.key === key)
      records[idx].matchOutcome = matchResult(scoreBlue, scoreRed)
      records[idx].endSR = endSR
      console.log('in-placed', records)
    }

    // update state
    setTotalWin(records.filter(e => e.matchOutcome === 'Win').length)
    setTotalTie(records.filter(e => e.matchOutcome === 'Tie').length)
    setTotalLoss(records.filter(e => e.matchOutcome === 'Loss').length)
    setEndingSR(records.length > 0 ? records[records.length - 1].endSR : startingSR)
    setRecords(records);
  }

  const handleClick = (e) => {
    let latestSR = records.length > 0 ? records[records.length - 1].endSR : startingSR
    let reserved = shortid.generate()

    setEntries([
      ...entries,
      <Entry key={reserved} id={reserved} onUpdate={handleUpdate} added={new Date()} latestSR={latestSR} />
    ])
  }

  const handleStartingSR = (e) => {
    setStartingSR(e.target.value)
    if (entries.filter(e => e !== null).length === 0) {
      setEndingSR(e.target.value)
    }
  }

  return (
    <div className="App">
      <header>
        <h4 className="title">Win/Loss</h4>
        <div className="starting-sr">
          Starting SR: <input type="number" value={startingSR} onChange={handleStartingSR} />
        </div>
        <a className="button" onClick={handleClick}>New row</a>
        <h1 className="win-loss">
          {`${totalWin} - ${totalLoss}`}
          <span className="ties">{totalTie > 0 ? `, ${totalTie} tie${totalTie > 1 ? 's' : ''}` : ''}</span>
        </h1>
        <h3 className="sr">{`${endingSR - startingSR >= 0 ? '+' : ''}${endingSR - startingSR} SR`}<span className="small"><br />Page opened @ {sessionStarted.toLocaleTimeString()}</span></h3>
      </header>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Map</th>
            <th>Score</th>
            <th>Win/Loss</th>
            <th>End SR</th>
            <th>Time added</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {entries}
        </tbody>
      </table>
    </div>
  );
}
