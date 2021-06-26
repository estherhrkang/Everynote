import { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, getAllNotes, getOneNote, deleteOneNote, editOneNote } from '../../store/note';
import '../../index.css';

const NoteCreateForm = ({ notebookid, title, setTitle, content, setContent }) => {
    const dispatch = useDispatch();
    
    // const sessionUser = useSelector(state => state.session.user);
    // const notebooks = useSelector(state => state.notebook.fullNotebook);
    // const notes = useSelector(state => state.note.fullNote);

    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title) {
            setErrors([]);
            return dispatch(createNote(title, content))
                .catch(async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        };
        return setErrors(['Please provide title for this note.']);
    };

    const handleCancelSubmit = () => {
        setTitle('');
        setContent('');
        setErrors([]);
    };

    return (
        <form className='note-body-content__form' onSubmit={handleSubmit}>
            <ul className='note-body-content__error-ul'>
                {errors.map(error => <li className='note-body-content__error-li' key={error}>{error}</li>)}
            </ul>
            <input
                className='note-body-content__title-input'
                placeholder={title ? title : 'Title'}
                type='text'
                value={title}
                onChange={e => setTitle(e.target.value)}
            ></input>
            <textarea
                className='note-body-content__content-input'
                placeholder={content ? content : 'Start writing here...'}
                wrap='hard'
                cols='20'
                value={content}
                onChange={e => setContent(e.target.value)}
            ></textarea>
            <div>
                <button className='create-note-btn' type='submit'>Create</button>
                <button className='cancel-create-note-btn' type='button' onClick={handleCancelSubmit}>Cancel</button>
            </div>
        </form>
    );
};

export default NoteCreateForm;