/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { matchResult, STAGES} from './common';
import './App.scss';

export default function Entry(props) {
  const [stage, setStage] = useState(STAGES[0])
  const [scoreBlue, setScoreBlue] = useState(0)
  const [scoreRed, setScoreRed] = useState(0)
  const [locked, setLocked] = useState(true)
  const [deleted, setDeleted] = useState(false)
  const [endSR, setEndSR] = useState(props.latestSR || 0)
  const [notes, setNotes] = useState('')

  const handleUpdate = () => {
    props.onUpdate(props.id, stage, scoreBlue, scoreRed, deleted, endSR, props.added)
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

  const handleEndSR = (e) => {
    setEndSR(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value))
  }

  const handleNotes = (e) => {
    setNotes(e.target.value)
  }

  useEffect(() => {
    handleUpdate()
  }, [stage, scoreBlue, scoreRed, deleted, endSR])

  if(deleted) {
    return <></>
  }

  if(locked) {
    return (
      <tr>
        <td>{stage}</td>
        <td>{`${scoreBlue} - ${scoreRed}`}</td>
        <td>{matchResult(scoreBlue, scoreRed)}</td>
        <td>{endSR}</td>
        <td>{new Date(props.added).toLocaleTimeString()}</td>
        <td>{notes}</td>
        <td><div className="clickable emoji" title="Row locked" onClick={handleLock}>🔒</div></td>
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
        <td><input type="number" min={0} value={endSR} onChange={handleEndSR} /></td>
        <td>{new Date(props.added).toLocaleTimeString()}</td>
        <td><textarea onChange={handleNotes}>{notes}</textarea></td>
        <td><div className="clickable emoji" title="Row unlocked" onClick={handleLock}>🔓</div></td>
        <td><div className="clickable emoji" title="Delete" onClick={handleDeleted}>❌</div></td>
      </tr>
    )
  }

}
