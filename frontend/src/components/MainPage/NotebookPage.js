import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNotebook, getAllNotebooks, getOneNotebook, deleteOneNotebook } from '../../store/notebook';
import { getAllNotes } from '../../store/note';
import EditNotebookModal from './NotebookEditModal';
import '../../index.css';

const NotebookPage = ({ notebooks }) => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    const [notebookTitle, setNotebookTitle] = useState('');
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

    if (!sessionUser) return <Redirect to='/' />

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const duringPopUp = popUp ? ' during-popup' : '';

    const handleSearchNotebook = (e) => {
        e.preventDefault();

        // .find finds the fist match vs .filter finds all the match put in an array
        const firstMatchingNotebook = notebooks.find(notebook => notebook.title.toLowerCase().includes(searchInput.toLowerCase()));
        dispatch(getOneNotebook(firstMatchingNotebook));
    };

    const handleCancelSearch = () => {
        setSearchInput('');
        dispatch(getAllNotebooks());
    };

    const handleCreateNotebook = async (e) => {
        e.preventDefault();
        if (notebookTitle) {
            setErrors([]);
            return dispatch(createNotebook(notebookTitle))
                .catch(async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors)
                });
        }
        return setErrors(['Please provide title for this notebook.']);
    };

    const handleCancelCreate = () => {
        setNotebookTitle('');
        setErrors([]);
    };

    return (
        <div className='notebooks-container'>
            {/* <div className='nav-sidebar'>
                <h3>here</h3>
                <MainPage />
            </div> */}
            <div className='notebook-list-header'>
                <h1><i className='fas fa-book'> NOTEBOOKS</i></h1>
                <p className='list-counter'>{notebooks?.length} Notebooks</p>
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
                    value={notebookTitle}
                    onChange={e => setNotebookTitle(e.target.value)}
                ></input>
                <button className='create-notebook-btn' type='submit'>Create</button>
                <button className='cancel-create-notebook-btn' type='button' onClick={handleCancelCreate}>Cancel</button>
            </form>
            <div className='notebook-list'>
                <div>
                    <table>
                        <thead className='notebook-list-thead'>
                            <tr>
                                <th className='notebook-list-row'>Title</th>
                                <th className='notebook-list-row'>Updated</th>
                                <th className='notebook-list-row'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='notebook-list-tbody'>
                            {notebooks?.map(notebook => (
                                <>
                                    <tr key={notebook.id}>
                                        <th className='notebook-list-row'><Link to={`/notebooks/${notebook.id}/notes`}>{notebook.title}</Link></th>
                                        <th className='notebook-list-row'>{notebook.updatedAt.slice(0,10)}</th>
                                        <th className='notebook-list-row'>
                                            <button className='notebook-action-btn' onClick={openMenu}><i className="fas fa-ellipsis-h"></i></button>
                                        </th>
                                            {showMenu && (
                                                <>
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