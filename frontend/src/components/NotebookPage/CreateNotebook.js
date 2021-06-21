import { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { createNotebook } from '../../store/notebook';

const CreateNotebookButton = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();

        await dispatch(createNotebook(title));

        history.push('/notebooks');
    };

    return (
        <div>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
            ></input>
            <button onClick={handleCreate}>Submit</button>
        </div>
    );
};

export default CreateNotebookButton;