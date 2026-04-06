import { createNote, toggleImportanceOf, deletingNote } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux' 


const App = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  const deleteNote = (id, e) => {
    e.stopPropagation()
    dispatch(deletingNote(id))
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" /> 
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map(note => 
          <li
            key={note.id} 
            onClick={() => toggleImportance(note.id)}
          >
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
            <button onClick={(e) =>deleteNote(note.id, e)}>delete</button>
          </li>
        )}
      </ul>
      
    </div>
  )
}

export default App