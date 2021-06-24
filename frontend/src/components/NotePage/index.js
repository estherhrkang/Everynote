import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, getAllNotes, deleteOneNote, editOneNote } from '../../store/note';
import '../../index.css';

const NotePage = () => {
    const dispatch = useDispatch();
    const notebooks = useSelector(state => state.notebook.fullNotebook);
    const notes = useSelector(state => state.note.fullNote);
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [errors, setErrors] = useState([]);
    // const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        dispatch(getAllNotes());
    }, [dispatch]);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => setShowMenu(false);

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const handleCreateNote = (e) => {
        e.preventDefault();

        if (title) {
            setErrors([]);
            return dispatch(createNote(title, content))
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
                <Navigation />
            </div> */}
            {/* <div className='notes-notebook-header'>
                display notebook title accordingly
            </div> */}
            <div className='notes-list-container'>
                <div className='notes-list-header'>
                    <h1><i className='fas fa-sticky-note'> NOTES</i></h1>
                    <div>{notes?.length} Notes</div>
                    <div className='note-body-header'>
                        search box
                        {/* <div>
                            <form onSubmit={handleSubmit}>
                                <input
                                    placeholder='Find Note'
                                    type='text'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                >
                                </input>
                                <button type='submit'><i class="fas fa-search"></i></button>
                            </form>
                        </div> */}
                    </div>
                </div>
                <ul className='notes-list-ul'>
                    {notes?.map(note => (
                        <li className='notes-list-li' key={note.id}>
                            <div className='notes-list-li__title'>{note.title}</div>
                            <div className='notes-list-li__content'>{note.content.length < 40 ? note.content : `${note.content.slice(0, 40)}...`}</div>
                            <div className='notes-list-li__date'>{note.updatedAt.slice(0,10)}</div>
                            
                            <div>
                                <button className='note-action-btn' onClick={openMenu}><i className="fas fa-ellipsis-h"></i></button>  
                            </div>
                                {showMenu && (
                                    <>
                                        <button>Add to a notebook</button>
                                        <button onClick={() => dispatch(deleteOneNote(note))}>Delete</button>
                                        {/* <button onClick={() => dispatch(editOneNote(note))}>Edit</button> */}
                                    </>
                                )}
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
                            placeholder='Title'
                            type='text'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        ></input>
                        
                        <textarea
                            className='note-body-content__content-input'
                            placeholder='Start writing here...'
                            wrap='hard'
                            cols='20'
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        ></textarea>
                        <div>
                            <button className='create-note-btn' type='submit'>Create</button>
                            <button className='cancel-create-note-btn' type='button' onClick={handleCancelCreate}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NotePage;