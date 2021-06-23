import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNotebook, getAllNotebooks, deleteOneNotebook, editOneNotebook } from '../../store/notebook';
import '../index.css';

const NotebookPage = () => {
    const dispatch = useDispatch();
    const notebooks = useSelector(state => state.notebook.fullNotebook);
    
    const [title, setTitle] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [popUp, setPopUp] = useState(false);
    const [errors, setErrors] = useState([]);
    // const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        dispatch(getAllNotebooks());
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

    const handleCreateNotebook = async (e) => {
        e.preventDefault();
        if (title) {
            setErrors([]);
            return dispatch(createNotebook(title))
                .catch(async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors)
                });
        }
        return setErrors(['Please provide title for this notebook.']);
    };

    const handleCancelCreate = () => {
        setTitle('');
        setErrors([]);
    };

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
                    <form onSubmit={handleCreateNotebook}>
                        <ul>
                            {errors.map(error => <li key={error}>{error}</li>)}
                        </ul>
                        <input
                            placeholder='New Notebook'
                            type='text'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        ></input>
                        <button type='submit'>Create</button>
                        <button type='button' onClick={handleCancelCreate}>Cancel</button>
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
                                        <button className='notebook-action-btn' onClick={openMenu}><i className="fas fa-ellipsis-h"></i></button>
                                    </th>
                                        {showMenu && (
                                            <>
                                                <button className='add-note-notebook-btn'>Add new note</button>
                                                <button className='rename-notebook-btn'>}>Rename notebook</button>
                                                <button className='delete-notebook-btn' onClick={() => dispatch(deleteOneNotebook(notebook))}>Delete notebook</button>
                                                {/* <button onClick={() => dispatch(editOneNotebook(notebook))}>Edit</button> */}
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

export default NotebookPage;