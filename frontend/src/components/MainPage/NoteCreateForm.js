import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../../store/note';
import '../../index.css';

const NoteCreateForm = ({ notebookid, notebooks, notes, noteTitle, setNoteTitle, noteContent, setNoteContent }) => {
    const dispatch = useDispatch();
    
    // const sessionUser = useSelector(state => state.session.user);
    // const notebooks = useSelector(state => state.notebook.fullNotebook);
    // const notes = useSelector(state => state.note.fullNote);

    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (noteTitle) {
            setErrors([]);
            return dispatch(createNote(noteTitle, noteContent, notebookid))
                .then(setNoteTitle(''))
                .then(setNoteContent(''))
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
    };

    return (
        <form className='note-body-content__form' onSubmit={handleSubmit}>
            {/* create drop down menu that sets which notebook it should create the note in*/}
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
                <button className='create-note-btn' type='submit'>Create</button>
                <button className='cancel-create-note-btn' type='button' onClick={handleCancelSubmit}>Cancel</button>
            </div>
        </form>
    );
};

export default NoteCreateForm;