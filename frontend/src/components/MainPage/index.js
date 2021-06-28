import { useState, useEffect } from "react";
import { NavLink, Route, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAllNotebooks } from "../../store/notebook";
import { getAllNotes } from "../../store/note";

import ProfileButton from './ProfileButton';
import NotebookPage from "./NotebookPage";
import NoteAllShow from "./NoteAllShow";
import NoteInNotebookShow from "./NoteInNotebookShow";
import NoteCreateForm from "./NoteCreateForm";
import NoteEditForm from "./NoteEditForm";

import '../../index.css';

const MainPage = ({ isLoaded }) => {
    const dispatch = useDispatch();

    const [notebookTitle, setNotebookTitle] = useState('');
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');

    const [showForm, setShowForm] = useState(false);
    const [clickedNote, setClickedNote] = useState({});

    const { notebookid } = useParams();
    const { id } = useParams();

    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebook.fullNotebook);
    const notes = useSelector(state => state.note.fullNote);

    useEffect(() => {
        dispatch(getAllNotebooks());
        dispatch(getAllNotes());
    }, [dispatch]);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='main-container'>
                <div className='navigation-container'>
                    <ul className='navigation-ul'>
                        <li className='navigation-li navigation-li__title'>
                            <NavLink className='navigation-li__navlink' to='/notes'>Everynote</NavLink>
                        </li>
                        <li className='navigation-li'>
                            <ProfileButton user={sessionUser} />
                        </li>
                        <li className='navigation-li'> 
                            <NavLink className='navigation-li__navlink' to='/notes'><i className='fas fa-sticky-note'> Notes</i></NavLink>
                        </li>
                        <li className='navigation-li'>
                            <NavLink className='navigation-li__navlink' to='/notebooks'><i className='fas fa-book'> Notebooks</i></NavLink>
                        </li>
                    </ul>
                </div>
                <div className='list-container'>
                    <Route exact path='/notebooks'>
                        <NotebookPage 
                            notebooks={notebooks} notes={notes} notebookTitle={notebookTitle} setNotebookTitle={setNotebookTitle}
                            showForm={showForm} setShowForm={setShowForm}
                        />
                    </Route>
                    <Route path={['/notebooks/:notebookid/notes', '/notes/:id']}>
                        <NoteInNotebookShow 
                            notebookid={notebookid} id={id} notebooks={notebooks} notes={notes}
                            noteTitle={noteTitle} setNoteTitle={setNoteTitle} noteContent={noteContent} setNoteContent={setNoteContent}
                            showForm={showForm} setShowForm={setShowForm}
                            setClickedNote={setClickedNote}
                        />
                    </Route>
                    <Route exact path='/notes'>
                        <NoteAllShow 
                            notebookid={notebookid} id={id} notebooks={notebooks} notes={notes}
                            noteTitle={noteTitle} setNoteTitle={setNoteTitle} noteContent={noteContent} setNoteContent={setNoteContent}
                            showForm={setShowForm} setShowForm={setShowForm}
                            setClickedNote={setClickedNote}
                        />
                    </Route>
                </div>
                {/* <div className='form-container'> */}
                    {showForm ? (
                        <NoteEditForm 
                            id={id} notebookid={notebookid} notebooks={notebooks} notes={notes}
                            noteTitle={noteTitle} setNoteTitle={setNoteTitle} noteContent={noteContent} setNoteContent={setNoteContent}
                            setShowForm={setShowForm}
                            clickedNote={clickedNote}
                        />
                    ) : (
                        <>
                        {/* <Route exact path='/notebooks'>
                            {null}
                        </Route> */}
                        <Route exact path={['/notes', '/notebooks/:notebookid/notes']}>
                            <NoteCreateForm
                            notebookid={notebookid} notebooks={notebooks} notes={notes} 
                            noteTitle={noteTitle} setNoteTitle={setNoteTitle} noteContent={noteContent} setNoteContent={setNoteContent}
                            />
                        </Route>
                        </>
                    )}
                {/* </div> */}
            </div>
        )
    }

    return (
        <>
            {isLoaded && sessionLinks}
        </>
    );
};

export default MainPage;