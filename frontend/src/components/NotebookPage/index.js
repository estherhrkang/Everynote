import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNotebook, getAllNotebooks, deleteOneNotebook } from '../../store/notebook';

const NotebookPage = () => {
    const dispatch = useDispatch();
    const notebooks = useSelector(state => state.notebook.fullNotebook);
    
    const [title, setTitle] = useState('');

    useEffect(() => {
        dispatch(getAllNotebooks());
    }, [dispatch]);

    return (
        <div>Notebooks
            <div>New Notebook
                <input
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                ></input>
                <button onClick={() => dispatch(createNotebook(title))}>Submit</button>
            </div>
            <div>{notebooks?.length} Notebooks
                <ul>
                    {notebooks?.map(notebook => (
                        <li key={notebook.id}>
                            {notebook.title}
                            <button onClick={() => dispatch(deleteOneNotebook(notebook))}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NotebookPage;