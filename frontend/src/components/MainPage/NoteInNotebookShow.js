import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotes, getOneNote, getAllNotesInNotebook } from '../../store/note';
import { getAllNotebooks, getOneNotebook } from '../../store/notebook';
import '../../index.css';

const NoteInNotebookShow = ({ setClickedNote, notebookid, id, notebooks, notes, noteTitle, setNoteTitle, noteContent, setNoteContent, showForm, setShowForm }) => {
    const dispatch = useDispatch();
    
    const sessionUser = useSelector(state => state.session.user);

    // .find returns the value of the first element in the provided array
    const notebook = notebooks.find(notebook => notebook?.id === Number(notebookid));
    const subNotes = notes.filter(note => note.notebookId === Number(notebookid));
    
    const [searchInput, setSearchInput] = useState('');
    // const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getAllNotesInNotebook(notebookid));
        dispatch(getOneNotebook({id: notebookid}))
            // .then(() => { setIsLoaded(true) })
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
                    {/* {isLoaded && (
                        <> */}
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
                                    {/* <Link to={`/notes/${subNote.id}`}> */}
                                        <div className='notes-list-li__title'>{subNote?.title}</div>
                                        <div className='notes-list-li__content'>{subNote?.content.length < 40 ? subNote?.content : `${subNote?.content.slice(0, 40)}...`}</div>
                                        <div className='notes-list-li__date'>{subNote?.updatedAt.slice(0,10)}</div>
                                    {/* </Link> */}
                                </button>
                                </li>
                            ))}
                        {/* </>
                    )} */}
                </ul>
            </div>
        </div>
    )
}

export default NoteInNotebookShow;