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
    // const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        dispatch(getAllNotes());
    }, [dispatch]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     dispatch()
    // };

    return (
        <div className='note-root-div'>
            <h1><i className='fas fa-sticky-note'> NOTES</i></h1>
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
            <div>
                <form className='create-note-form' onSubmit={() => dispatch(createNote(title, content))}>
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
                                    <button onClick={() => dispatch(deleteOneNote(note))}>Delete</button>
                                    {/* <button onClick={() => dispatch(editOneNote(note))}>Edit</button> */}
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NotePage;