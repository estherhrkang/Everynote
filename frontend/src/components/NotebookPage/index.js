import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createNotebook } from '../../store/notebook';

const NotebookPage = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');

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
        </div>
    );
};

export default NotebookPage;