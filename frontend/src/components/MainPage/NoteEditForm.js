import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotes, deleteOneNote, editOneNote } from '../../store/note';
import '../../index.css';

const NoteEditForm = ({ clickedNote, id, notebookid, notebooks, noteTitle, setNoteTitle, noteContent, setNoteContent, setShowForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const notes = useSelector(state => state.note.fullNote);
    
    const [errors, setErrors] = useState([]);
    
    useEffect(() => {
        dispatch(getAllNotes());
    }, [dispatch]);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if (notes) {
            setErrors([]);

            const payload = {
                id: clickedNote.id,
                title: noteTitle,
                content: noteContent
                // notebookId: notebookid
            };

            return dispatch(editOneNote( payload ))
                .then(setShowForm(false))
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
        setShowForm(false);
        history.push('/notes');
    };

    const handleDeleteNote = async () => {
        if (notes && clickedNote) {
            await dispatch(deleteOneNote(clickedNote));
            setNoteTitle('');
            setNoteContent('');
            setShowForm(false);
            history.push('/notes');
        }

        // if (notebookid) {
        //     history.push(`/notebooks/${notebookid}/notes`)
        // } else {
        //     history.push('/notes');
        // }
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
                <button onClick={handleDeleteNote}>Delete</button>
            </div>
        </form>
    );
};

export default NoteEditForm;