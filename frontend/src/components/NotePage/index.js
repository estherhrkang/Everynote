import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, getAllNotes, deleteOneNote, editOneNote } from '../../store/note';
import '../index.css';

const NotePage = () => {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.note.fullNote);
    // const notes = useSelector(state => state.note);
    
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
        <div className='note-root-div'>
            <div className='header'>
                <h1><i className='fas fa-sticky-note'> NOTES</i></h1>
            </div>
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
            <div className='main'>
                <div>
                    <form className='create-note-form' onSubmit={handleCreateNote}>
                        <ul>
                            {errors.map(error => <li key={error}>{error}</li>)}
                        </ul>
                        <input
                            placeholder='New Note Title'
                            type='text'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        ></input>
                        <input
                            placeholder='New Note Content'
                            type='text'
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        ></input>
                        <div>
                        <button type='submit'>Create</button>
                        <button className='cancel-btn' type='button' onClick={handleCancelCreate}>Cancel</button>
                        </div>
                    </form>
                </div>
                <div>{notes?.length} Notes
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Created</th>
                                <th>Updated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes?.map(note => (
                                <tr key={note.id}>
                                    <th className='table__tbody__tr__th'>{note.title}</th>
                                    <th className='table__tbody__tr__th'>{note.content}</th>
                                    <th className='table__tbody__tr__th'>{note.createdAt.slice(0,10)}</th>
                                    <th className='table__tbody__tr__th'>{note.updatedAt.slice(0,10)}</th>
                                    <th>
                                        <button className='note-action-btn' onClick={openMenu}><i className="fas fa-ellipsis-h"></i></button>  
                                    </th>
                                        {showMenu && (
                                            <>
                                                <button>Add to a notebook</button>
                                                <button onClick={() => dispatch(deleteOneNote(note))}>Delete</button>
                                                {/* <button onClick={() => dispatch(editOneNote(note))}>Edit</button> */}
                                            </>
                                        )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NotePage;