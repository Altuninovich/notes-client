import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import { NotesList } from '../components/NotesList'
import { dateTime } from '../time/time'

const {getTimeFromTaskCreation} = dateTime()
//формируем состояние с данными о времени прошедшем от создания каждой заметки
const updateTime = (notes) => {
  const idTimeUtc = notes.map((n) => [ n._id, getTimeFromTaskCreation(n.timeUTC) ])
  return Object.fromEntries(idTimeUtc);
}

export const NotesPage = () => {
  const [notes, setNotes] = useState([])
  const [timePassed, setTimePassed] = useState({})
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/note', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setNotes(fetched)
      const interval = setInterval(() => {
        setTimePassed(updateTime(fetched))
        }, 1000);
        return () => {
          clearInterval(interval);
        };

    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return <Loader/>
  }
  return (
    <>
      {!loading && <NotesList notes={notes} setNotes={setNotes} timePassed={timePassed}/>}
    </>
  )
  
}