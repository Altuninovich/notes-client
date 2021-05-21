import React from 'react'

export const NoteCard = ({ note }) => {
  return (
    <>
      <h2>Заметка создана</h2>

      <p>Название заметки: <strong>{note.name}</strong></p>
      <p>Дата создания: <strong>{new Date(note.date).toLocaleDateString()}</strong></p>
    </>
  )
}