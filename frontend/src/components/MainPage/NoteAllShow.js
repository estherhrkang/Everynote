import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotes, getOneNote } from '../../store/note';
import '../../index.css';

const NoteAllShow = ({ setClickedNote, notes, setNoteTitle, setNoteContent, setShowForm }) => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        dispatch(getAllNotes());
    }, [dispatch]);
    
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
        <div className='notes-list-container'>
            <div className='notes-list-header'>
                <h1><i className='fas fa-sticky-note'> NOTES</i></h1>
                <p className='list-counter'>{notes?.length} Notes</p>
            </div>
            <form className='search-note-box' onSubmit={handleSearchNote}>
                <input
                    className='search-note-box__input'
                    placeholder='Search note'
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
                    <li className='notes-list-li' key={note?.id}>
                        <button 
                            className='notes-list-li__btn' 
                            onClick={() => {
                                setNoteTitle(note?.title)
                                setNoteContent(note?.content)
                                setClickedNote(note ? note : null)
                                setShowForm(true)
                            }}
                        >
                            <div className='notes-list-li__title'>{note?.title.length < 50 ? note?.title : `${note?.title.slice(0, 50)}...`}</div>
                            <div className='notes-list-li__content'>{note?.content.length < 50 ? note?.content : `${note?.content.slice(0, 50)}...`}</div>
                            <div className='notes-list-li__date'>{note?.updatedAt.slice(0,10)}</div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoteAllShow;