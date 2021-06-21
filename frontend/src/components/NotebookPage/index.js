import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNotebook, getAllNotebooks } from '../../store/notebook';

const NotebookPage = () => {
    const dispatch = useDispatch();
    const notebooks = useSelector(state => Object.values(state.notebook));
    
    const [title, setTitle] = useState('');

    console.log(Array.isArray(notebooks));

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
            <div># Notebooks
                {/* {notebooks} */}
                {/* <ul>
                    {notebooks.map(notebook => (
                        <li>{notebook.title}</li>
                    ))}
                </ul> */}
            </div>
        </div>
    );
};

export default NotebookPage;