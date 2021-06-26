import { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, getAllNotes, getOneNote, getAllNotesInNotebook, deleteOneNote, editOneNote } from '../../store/note';
import { getOneNotebook } from '../../store/notebook';
import '../../index.css';

const NoteInNotebookShow = ({ notebookid, id, notebooks, subNotes, notes }) => {
    const dispatch = useDispatch();
    
    const sessionUser = useSelector(state => state.session.user);

    // const notebooks = useSelector(state => state.notebook.fullNotebook);
    // .find returns the value of the first element in the provided array
    const notebook = notebooks?.find(notebook => notebook.id === Number(notebookid));

    // const notes = useSelector(state => state.note.fullNote);
    // .filter creates a new array
    // const subNotesArr = notes?.filter(note => note.notebookId === Number(notebookid));
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [errors, setErrors] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        dispatch(getAllNotesInNotebook(notebookid));
        dispatch(getOneNotebook({id: notebookid}));
    }, [dispatch]);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => setShowMenu(false);

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    if (!sessionUser) return <Redirect to='/' />

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

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
                    {subNotes?.length} notes
                    <button className='new-note-btn'>New note</button>
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
                    {subNotes?.map(subNote => (
                        <li className='notes-list-li' key={subNote.id}>
                            <Link to={`/notes/${subNote.id}`}>
                                    <div className='notes-list-li__title'>{subNote.title}</div>
                                    <div className='notes-list-li__content'>{subNote.content.length < 40 ? subNote.content : `${subNote.content.slice(0, 40)}...`}</div>
                                    <div className='notes-list-li__date'>{subNote.updatedAt.slice(0,10)}</div>
                                    
                                    <div>
                                        <button className='note-action-btn' onClick={openMenu}><i className="fas fa-ellipsis-h"></i></button>  
                                    </div>
                                        {showMenu && (
                                            <>
                                                <button onClick={() => dispatch(deleteOneNote(subNote))}>Delete</button>
                                            </>
                                        )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default NoteInNotebookShow;