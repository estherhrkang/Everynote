import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, getAllNotes, deleteOneNote, editOneNote } from '../../store/note';
import './Note.css';

const NotePage = () => {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.note.fullNote);
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        dispatch(getAllNotes());
    }, [dispatch]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     dispatch()
    // };
    return (
        <div className='note-root-div'>
            <h1><i className='fas fa-sticky-note'>NOTES</i></h1>
            {/* <div>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder='Find Notebooks'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    >
                    </input>
                    <button type='submit'><i class="fas fa-search"></i></button>
                </form>
            </div> */}
            <div>
                <form onSubmit={() => dispatch(createNote(title, content))}>
                    <input
                        placeholder='New Notebook'
                        type='text'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    ></input>
                    <button type='submit'>Create</button>
                </form>
            </div>
            <div>{notes?.length} Notebooks
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Created</th>
                            <th>Updated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes?.map(notebook => (
                            <tr key={notebook.id}>
                                <th className='table__tbody__tr__th'>{notebook.title}</th>
                                <th className='table__tbody__tr__th'>{notebook.createdAt.slice(0,10)}</th>
                                <th className='table__tbody__tr__th'>{notebook.updatedAt.slice(0,10)}</th>
                                <th>
                                    <button onClick={() => dispatch(deleteOneNote(notebook))}>Delete</button>
                                    {/* <button onClick={() => dispatch(editOneNotebook(notebook))}>Edit</button> */}
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