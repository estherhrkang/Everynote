import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotes, getOneNote, getAllNotesInNotebook } from '../../store/note';
import { getOneNotebook } from '../../store/notebook';
import '../../index.css';

const NoteInNotebookShow = ({ setClickedNote, notebookid, notebooks, notes, setNoteTitle, setNoteContent, setShowForm }) => {
    const dispatch = useDispatch();
    
    const sessionUser = useSelector(state => state.session.user);
    // .find returns the value of the first element in the provided array
    const notebook = notebooks.find(notebook => notebook?.id === Number(notebookid));
    // .filter returns all the matches in an array
    const subNotes = notes.filter(note => note.notebookId === Number(notebookid));
    
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        dispatch(getAllNotesInNotebook(notebookid));
        dispatch(getOneNotebook({id: notebookid}))
    }, [dispatch, notebookid]);

    if (!sessionUser) return <Redirect to='/' />

    const handleSearchNote = (e) => {
        e.preventDefault();

        let firstMatchingNote;
        if (subNotes) {
            firstMatchingNote = subNotes?.find(note => note.title.toLowerCase().includes(searchInput.toLowerCase()));
        } else {
            firstMatchingNote = notes?.find(note => note.title.toLowerCase().includes(searchInput.toLowerCase()));
        }

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
                    <h1><i className='fas fa-book'> {notebook ? ` ${notebook.title}` : ' Notes'}</i></h1>
                    <p className='list-counter'>{subNotes?.length} Notes</p>
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
                    {subNotes?.map(subNote => (
                        <li className='notes-list-li' key={subNote?.id}>
                            <button 
                                className='notes-list-li__btn' 
                                onClick={() => {
                                    setNoteTitle(subNote?.title)
                                    setNoteContent(subNote?.content)
                                    setClickedNote(subNote ? subNote : null)
                                    setShowForm(true)
                                }}
                            >
                                <div className='notes-list-li__title'>{subNote?.title.length < 50 ? subNote?.title : `${subNote?.title.slice(0, 50)}...`}</div>
                                <div className='notes-list-li__content'>{subNote?.content.length < 50 ? subNote?.content : `${subNote?.content.slice(0, 50)}...`}</div>
                                <div className='notes-list-li__date'>{subNote?.updatedAt.slice(0,10)}</div>
                        </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default NoteInNotebookShow;