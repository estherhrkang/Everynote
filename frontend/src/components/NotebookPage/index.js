import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { createNotebook } from '../../store/notebook';

const NotebookPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [showInputField, setShowInputField] = useState(false);

    useEffect(() => {
        if (!showInputField) return;

        const closeInputField = () => setShowInputField(false);

        document.addEventListener('click', closeInputField);

        return () => document.removeEventListener('click', closeInputField);
    }, [showInputField]);

    const openInputField = () => {
        if (showInputField) return;
        setShowInputField(true);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        
        await dispatch(createNotebook(title));

        history.push('/notebooks');
    };


    return (
        <div>
            Notebooks
            <button onClick={openInputField}>New Notebook</button>
            {showInputField && (
                <>
                    <input
                        type='text'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    ></input>
                    <button onClick={handleCreate}>Submit</button>
                </>
            )}
        </div>
    );
};

export default NotebookPage;