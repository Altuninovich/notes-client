import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import { dateTime } from '../time/time'


export const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [name, setNameTask] = useState('')
  const [task, setTask] = useState('')
  

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/note/generate', 'POST', {
          name: name, 
          task: task, 
          timeUTC: dateTime().getTimeUTC, 
        }, {
          Authorization: `Bearer ${auth.token}`
        })
        history.push(`/detail/${data.note._id}`)
      } catch (e) {}
    }
  }

  return (
    <div>
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input
            placeholder="Введите текст"
            id="name"
            type="text"
            value={name}
            onChange={e => setNameTask(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="name">Название</label>
        </div>
      </div>
    </div>
    <div className="row">
    <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
      <div className="input-field">
        <input
          placeholder="Введите текст"
          id="task"
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyPress={pressHandler}
        />
        <label htmlFor="task">Текст заметки</label>
      </div>
    </div>
  </div>
  </div>
  )
}