import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, getAllNotes, getOneNote, getAllNotesInNotebook, deleteOneNote, editOneNote } from '../../store/note';
import { getOneNotebook } from '../../store/notebook';
import '../../index.css';

const ShowNotes = () => {
    const dispatch = useDispatch();
    
    const sessionUser = useSelector(state => state.session.user);

    const { notebookid } = useParams(); 
    const notebooks = useSelector(state => state.notebook.fullNotebook);
    // .find returns the value of the first element in the provided array
    const notebook = notebooks?.find(notebook => notebook.id === Number(notebookid));

    const notes = useSelector(state => state.note.fullNote);
    // .filter creates a new array
    const subNotesArr = notes?.filter(note => note.notebookId === Number(notebookid));
    
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

        const firstMatchingNote = subNotesArr.find(note => note.title.toLowerCase().includes(searchInput.toLowerCase()));

        dispatch(getOneNote(firstMatchingNote));
    };

    const handleCancelSearch = () => {
        setSearchInput('');
        dispatch(getAllNotes());
    };

    const handleCreateNote = (e) => {
        e.preventDefault();

        if (title) {
            setErrors([]);
            return dispatch(createNote(title, content, notebookid))
                .catch(async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        };
        return setErrors(['Please provide title for this note.']);
    };

    const handleCancelCreate = () => {
        setTitle('');
        setContent('');
        setErrors([]);
    };

    return (
        <div className='notes-container'>
            {/* <div className='nav-sidebar'>
                <h3>here</h3>
                <MainPage />
            </div> */}
            <div className='notes-list-container'>
                <div className='notes-list-header'>
                    <h1><i className='fas fa-book'> {notebook?.title}</i></h1>
                    {subNotesArr?.length} Notes
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
                    {subNotesArr?.map(subNote => (
                        <li className='notes-list-li' key={subNote.id}>
                            <button 
                                className='notes-list-li__btn' 
                                onClick={() => {
                                    setTitle(subNote.title)
                                    setContent(subNote.content)
                                }}
                            >
                                <div className='notes-list-li__title'>{subNote.title}</div>
                                <div className='notes-list-li__content'>{subNote.content.length < 40 ? subNote.content : `${subNote.content.slice(0, 40)}...`}</div>
                                <div className='notes-list-li__date'>{subNote.updatedAt.slice(0,10)}</div>
                                
                                <div>
                                    <button className='note-action-btn' onClick={openMenu}><i className="fas fa-ellipsis-h"></i></button>  
                                </div>
                                    {showMenu && (
                                        <>
                                            <button onClick={() => dispatch(deleteOneNote(subNote))}>Delete</button>
                                            {/* <button onClick={() => dispatch(editOneNote(note))}>Edit</button> */}
                                        </>
                                    )}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='note-body'>
                <div className='note-body-content'>
                    <form className='note-body-content__form' onSubmit={handleCreateNote}>
                        <ul className='note-body-content__error-ul'>
                            {errors.map(error => <li className='note-body-content__error-li' key={error}>{error}</li>)}
                        </ul>
                        <input
                            className='note-body-content__title-input'
                            placeholder={title ? title : 'Title'}
                            type='text'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        ></input>
                        <textarea
                            className='note-body-content__content-input'
                            placeholder={content ? content : 'Start writing here...'}
                            wrap='hard'
                            cols='20'
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        ></textarea>
                        <div>
                            {title ? (
                                <button className='save-note-btn' type='submit'>Save</button>
                            ) : (
                                <button className='create-note-btn' type='submit'>Create</button>
                            )}
                            <button className='cancel-create-note-btn' type='button' onClick={handleCancelCreate}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ShowNotes;