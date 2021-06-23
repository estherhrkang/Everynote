import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNotebook, getAllNotebooks, deleteOneNotebook, editOneNotebook } from '../../store/notebook';
import '../index.css';

const NotebookPage = () => {
    const dispatch = useDispatch();
    const notebooks = useSelector(state => state.notebook.fullNotebook);
    
    const [title, setTitle] = useState('');
    // const [searchInput, setSearchInput] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getAllNotebooks());
    }, [dispatch]);

    useEffect(() => {

    }, [errors]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     dispatch()
    // };

    return (
        <div className='notebook-root-div'>
            <div className='header'>
                <h1><i className='fas fa-book'> NOTEBOOKS</i></h1>
            </div>
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
            <div className='main'>
                <div>
                    <form onSubmit={() => dispatch(createNotebook(title))}>
                        <input
                            placeholder='New Notebook'
                            type='text'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        ></input>
                        <button type='submit'>Create</button>
                    </form>
                </div>
                <div>{notebooks?.length} Notebooks
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
                            {notebooks?.map(notebook => (
                                <tr key={notebook.id}>
                                    <th className='table__tbody__tr__th'>{notebook.title}</th>
                                    <th className='table__tbody__tr__th'>{notebook.createdAt.slice(0,10)}</th>
                                    <th className='table__tbody__tr__th'>{notebook.updatedAt.slice(0,10)}</th>
                                    <th>
                                        <i class="fas fa-ellipsis-h"></i>
                                        <button>Add new note</button>
                                        <button>Rename notebook</button>
                                        <button onClick={() => dispatch(deleteOneNotebook(notebook))}>Delete notebook</button>
                                        {/* <button onClick={() => dispatch(editOneNotebook(notebook))}>Edit</button> */}
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </div>
        </div>
    );
};

export default NotebookPage;