import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNotebook, getAllNotebooks, deleteOneNotebook, editOneNotebook } from '../../store/notebook';
import { getAllNotes } from '../../store/note';
import EditNotebookModal from './EditNotebookModal';
import ShowNotes from './ShowNotes';
import '../../index.css';

const NotebookPage = () => {
    const dispatch = useDispatch();
    const notebooks = useSelector(state => state.notebook.fullNotebook);

    const [title, setTitle] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [errors, setErrors] = useState([]);
    const [popUp, setPopUp] = useState(false);
    // const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        dispatch(getAllNotebooks());
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

    const duringPopUp = popUp ? ' during-popup' : '';

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
        <div className='notebooks-container'>
            {/* <div className='nav-sidebar'>
                <h3>here</h3>
                <Navigation />
            </div> */}
            <div className='notebook-list-header'>
                <h1><i className='fas fa-book'> NOTEBOOKS</i></h1>
                {notebooks?.length} Notebooks
            </div>
            <div className='search-notebook-form'>
                Search box       
                {/* <form onSubmit={handleSubmit}>
                <input
                placeholder='Find Notebooks'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                >
                </input>
                    <button type='submit'><i class="fas fa-search"></i></button>
                </form> */}
            </div>
            <form className='create-notebook-form' onSubmit={handleCreateNotebook}>
                <ul>
                    {errors.map(error => <li className='create-notebook-form__li' key={error}>{error}</li>)}
                </ul>
                <input
                    className='create-notebook-form__input'
                    placeholder='New Notebook Title'
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                ></input>
                <div className='create-notebook-form__buttons'>
                    <button className='create-notebook-btn' type='submit'>Create</button>
                    <button className='cancel-create-notebook-btn' type='button' onClick={handleCancelCreate}>Cancel</button>
                </div>
            </form>
            <div className='notebook-list-subheader'>

            </div>
            <div className='notebook-list-body'>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Updated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notebooks?.map(notebook => (
                                <>
                                    {/* {setNotebookState(notebook)} */}
                                    <tr key={notebook.id}>
                                        <th className='table__tbody__tr__th' onClick={() => {
                                            return <Redirect to={`/notebooks/${notebook.id}/notes`} notebook={notebook}/>}
                                        }>{notebook.title}</th>
                                        <th className='table__tbody__tr__th'>{notebook.updatedAt.slice(0,10)}</th>
                                        <th>
                                            <button className='notebook-action-btn' onClick={openMenu}><i className="fas fa-ellipsis-h"></i></button>
                                        </th>
                                            {showMenu && (
                                                <>
                                                    <button className='add-note-notebook-btn'>Add new note</button>
                                                    <button className={'rename-notebook-btn' + duringPopUp} onClick={() => setPopUp(true)}>Rename notebook</button>
                                                    <button className='delete-notebook-btn' onClick={() => dispatch(deleteOneNotebook(notebook))}>Delete notebook</button>
                                                </>
                                            )}
                                    </tr>
                                </>
                            ))}
                            {popUp && <EditNotebookModal setPopUp={setPopUp}/>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NotebookPage;