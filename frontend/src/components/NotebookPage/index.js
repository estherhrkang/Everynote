import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNotebook, getAllNotebooks, getOneNotebook, deleteOneNotebook, editOneNotebook } from '../../store/notebook';
import { getAllNotes } from '../../store/note';
import EditNotebookModal from './EditNotebookModal';
import '../../index.css';

const NotebookPage = () => {
    const dispatch = useDispatch();
    // array
    const notebooks = useSelector(state => state.notebook.fullNotebook);

    const [title, setTitle] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [errors, setErrors] = useState([]);
    const [popUp, setPopUp] = useState(false);
    const [searchInput, setSearchInput] = useState('');

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

    const handleSearchNotebook = (e) => {
        e.preventDefault();

        //need to filter here and send only one object
        // .find finds the fist match vs .filter finds all the match put in an array

        // if notebook.title partially includes searchInput, 
        const firstMatchingNotebook = notebooks.find(notebook => notebook.title.toLowerCase().includes(searchInput.toLowerCase()));
        // dispatch that notebook.title & receive matching notebook
        dispatch(getOneNotebook(firstMatchingNotebook));
        // update display on notebooks page
    };

    const handleCancelSearch = () => {
        setSearchInput('');
        dispatch(getAllNotebooks());
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
        <div className='notebooks-container'>
            {/* <div className='nav-sidebar'>
                <h3>here</h3>
                <Navigation />
            </div> */}
            <div className='notebook-list-header'>
                <h1><i className='fas fa-book'> NOTEBOOKS</i></h1>
                {notebooks?.length} Notebooks
            </div>
            <form className='search-notebook-form' onSubmit={handleSearchNotebook}>
                <input
                    className='search-notebook-form__input'
                    placeholder='Find a notebook'
                    type='text'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                >
                </input>
                <button className='search-notebook-btn' type='submit'><i className="fas fa-search"></i></button>
                <button className='cancel-search-notebook-btn' type='button' onClick={handleCancelSearch}>Cancel</button>
            </form>
            <form className='create-notebook-form' onSubmit={handleCreateNotebook}>
                <ul>
                    {errors.map(error => <li className='create-notebook-form__li' key={error}>{error}</li>)}
                </ul>
                <input
                    className='create-notebook-form__input'
                    placeholder='New notebook title'
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                ></input>
                <button className='create-notebook-btn' type='submit'>Create</button>
                <button className='cancel-create-notebook-btn' type='button' onClick={handleCancelCreate}>Cancel</button>
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
                                    <tr key={notebook.id}>
                                        <th className='table__tbody__tr__th'><Link to={`/notebooks/${notebook.id}/notes`}>{notebook.title}</Link></th>
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