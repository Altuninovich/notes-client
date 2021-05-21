import React, {useContext, useState, useEffect} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import { Loader } from './Loader'



export const NotesList = ({ notes, setNotes, timePassed }) => {


  const auth = useContext(AuthContext)
  const {request} = useHttp()
 
  if (!notes.length) {
    return <p className="center">Заметок пока нет</p>
  }

  const deleteTask = (id) => async () => {
    try {
      const data = await request('/api/note/delete', 'DELETE', {_id: id}, {
        Authorization: `Bearer ${auth.token}`
      })
      const newNotes = notes.filter((n) => n._id !== id)
      setNotes(newNotes)
    } catch (error) {
      
    }
  }

  return (
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Дата создания</th>
        <th>Название заметки</th>
        <th>Содержание</th>
        <th>Время от создания заметки</th>
      </tr>
      </thead>

      <tbody>
      { notes.map((n, index) => {
        return (
          <tr key={n._id}>
            <td>{index + 1}</td>
            <td>{new Date(n.date).toLocaleDateString()}</td>
            <td>{n.name}</td>
            <td>{n.task}</td>
            <td>{timePassed[n._id] ? timePassed[n._id] : <Loader />}</td>
            <td>
            <i onClick={deleteTask(n._id)} className="small  material-icons">delete</i>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
    }