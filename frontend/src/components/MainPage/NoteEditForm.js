import { useState, useEffect } from 'react';
import { Redirect, useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, getAllNotes, getOneNote, deleteOneNote, editOneNote } from '../../store/note';
import '../../index.css';

const NoteEditForm = ({ id, notebookid, notebooks, notes, currentNote, noteTitle, setNoteTitle, noteContent, setNoteContent }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    // const sessionUser = useSelector(state => state.session.user);
    // const notebooks = useSelector(state => state.notebook.fullNotebook);
    // const notes = useSelector(state => state.note.fullNote);

    useEffect(() => {
        dispatch(getAllNotes());
    }, [dispatch]);

    // const currentNote = notes?.find(note => note.id === id);

    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (noteTitle) {
            setErrors([]);
            // need to pass in userId as well
            return dispatch(editOneNote(noteTitle, noteContent, {notebookId: notebookid}))
                .catch(async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        };
        return setErrors(['Please provide title for this note.']);
    };

    const handleCancelSubmit = () => {
        setNoteTitle('');
        setNoteContent('');
        setErrors([]);
        // render noteCreateForm
        history.push('/notes');
    };

    return (
        <form className='note-body-content__form' onSubmit={handleSubmit}>
            <ul className='note-body-content__error-ul'>
                {errors.map(error => <li className='note-body-content__error-li' key={error}>{error}</li>)}
            </ul>
            <input
                className='note-body-content__title-input'
                placeholder={noteTitle ? noteTitle : 'Title'}
                type='text'
                value={noteTitle}
                onChange={e => setNoteTitle(e.target.value)}
            ></input>
            <textarea
                className='note-body-content__content-input'
                placeholder={noteContent ? noteContent : 'Start writing here...'}
                wrap='hard'
                cols='20'
                value={noteContent}
                onChange={e => setNoteContent(e.target.value)}
            ></textarea>
            <div>
                <button className='create-note-btn' type='submit'>Save</button>
                <button className='cancel-create-note-btn' type='button' onClick={handleCancelSubmit}>Cancel</button>
                <button onClick={() => dispatch(deleteOneNote(currentNote))}>Delete</button>
            </div>
        </form>
    );
};

export default NoteEditForm;