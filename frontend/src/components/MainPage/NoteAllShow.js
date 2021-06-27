import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, getAllNotes, getOneNote, deleteOneNote, editOneNote } from '../../store/note';
import CreateNoteForm from './NoteCreateForm';
import EditNoteForm from './NoteEditForm';
import '../../index.css';

const NoteAllShow = ({ notebookid, id, notebooks, subNotes, notes, noteTitle, setNoteTitle, noteContent, setNoteContent, setShowForm }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    // const notebooks = useSelector(state => state.notebook.fullNotebook);
    // const notes = useSelector(state => state.note.fullNote);
    
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [clickedNote, setClickedNote] = useState({});

    useEffect(() => {
        dispatch(getAllNotes());
    }, [dispatch]);
    
    // let currentNote = notes !== null ? notes.find(note => note.title.toLowerCase() === clickedNote.title.toLowerCase()) : null;

    if (!sessionUser) return <Redirect to='/' />

    const handleSearchNote = (e) => {
        e.preventDefault();

        const firstMatchingNote = notes.find(note => note.title.toLowerCase().includes(searchInput.toLowerCase()));

        dispatch(getOneNote(firstMatchingNote));
    };

    const handleCancelSearch = () => {
        setSearchInput('');
        dispatch(getAllNotes());
    };

    return (
        <div className='notes-container'>
            <div className='notes-list-container'>
                <div className='notes-list-header'>
                    <h1><i className='fas fa-sticky-note'> NOTES</i></h1>
                    {notes?.length} Notes
                </div>
                <form className='search-note-box' onSubmit={handleSearchNote}>
                    <input
                        className='search-note-box__input'
                        placeholder='Find Note'
                        type='text'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    >
                    </input>
                    <button className='search-note-btn' type='submit'><i className="fas fa-search"></i></button>
                    <button className='cancel-search-note-btn' type='button' onClick={handleCancelSearch}>Cancel</button>
                </form>
                <ul className='notes-list-ul'>
                    {notes?.map(note => (
                        <li className='notes-list-li' key={note.id}>
                            <button 
                                className='notes-list-li__btn' 
                                onClick={() => {
                                    setNoteTitle(note.title)
                                    setNoteContent(note.content)
                                    setClickedNote(note)
                                    setShowForm(true)
                                }}
                            >
                                <Link to={`/notes/${note.id}`}>
                                    <div className='notes-list-li__title'>{note.title}</div>
                                    <div className='notes-list-li__content'>{note.content.length < 40 ? note.content : `${note.content.slice(0, 40)}...`}</div>
                                    <div className='notes-list-li__date'>{note.updatedAt.slice(0,10)}</div>
                                </Link>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NoteAllShow;