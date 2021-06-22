import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNotebook, getAllNotebooks, deleteOneNotebook } from '../../store/notebook';
import './Notebook.css';

const NotebookPage = () => {
    const dispatch = useDispatch();
    const notebooks = useSelector(state => state.notebook.fullNotebook);
    
    const [title, setTitle] = useState('');

    useEffect(() => {
        dispatch(getAllNotebooks());
    }, [dispatch]);

    return (
        <div className='notebook-root-div'>NOTEBOOKS
            <div>New Notebook
                <input
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                ></input>
                <button onClick={() => (dispatch(createNotebook(title)))}>Submit</button>
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
                        <tr>
                            <th className='table__tbody__tr__th'>{notebook.title}</th>
                            <th className='table__tbody__tr__th'>{notebook.createdAt.slice(0,10)}</th>
                            <th className='table__tbody__tr__th'>{notebook.updatedAt.slice(0,10)}</th>
                            <th>
                                <button onClick={() => dispatch(deleteOneNotebook(notebook))}>Delete</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default NotebookPage;