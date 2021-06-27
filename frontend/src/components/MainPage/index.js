import { useState, useEffect } from "react";
import { NavLink, Route, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAllNotebooks } from "../../store/notebook";
import { getAllNotes, getAllNotesInNotebook } from "../../store/note";

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

    const { notebookid } = useParams();
    const { id } = useParams();

    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebook.fullNotebook);
    const notes = useSelector(state => state.note.fullNote);
    const subNotes = notes?.filter(note => note.notebookId === Number(notebookid));

    useEffect(() => {
        dispatch(getAllNotebooks());
        dispatch(getAllNotes());
    }, [dispatch]);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='main-container'>
                <div className='navigation-div'>
                    <ul className='navigation-ul'>
                        <li className='navigation-li'>
                            <ProfileButton user={sessionUser} />
                        </li>
                        <li className='navigation-li'>
                            <NavLink to='/notebooks'><i className='fas fa-book'> Notebooks</i></NavLink>
                        </li>
                        <li className='navigation-li'> 
                            <NavLink to='/notes'><i className='fas fa-sticky-note'> Notes</i></NavLink>
                        </li>
                    </ul>
                </div>
                <div className='list-container'>
                    main div 1 - list
                    <Route exact path='/notebooks'>
                        <NotebookPage notebooks={notebooks} notes={notes} notebookTitle={notebookTitle} setNotebookTitle={setNotebookTitle}/>
                    </Route>
                    <Route path={['/notebooks/:notebookid/notes', '/notes/:id']}>
                        <NoteInNotebookShow 
                            notebookid={notebookid} id={id} notebooks={notebooks} subNotes={subNotes} notes={notes}
                            noteTitle={noteTitle} setNoteTitle={setNoteTitle} noteContent={noteContent} setNoteContent={setNoteContent}
                            setShowForm={setShowForm}
                        />
                    </Route>
                    <Route exact path='/notes'>
                        <NoteAllShow 
                            notebookid={notebookid} id={id} notebooks={notebooks} subNotes={subNotes} notes={notes}
                            noteTitle={noteTitle} setNoteTitle={setNoteTitle} noteContent={noteContent} setNoteContent={setNoteContent}
                            setShowForm={setShowForm}
                        />
                    </Route>
                </div>

                {showForm ? (
                    <NoteEditForm 
                        id={id} notebookid={notebookid} notebooks={notebooks} notes={notes}
                        noteTitle={noteTitle} setNoteTitle={setNoteTitle} noteContent={noteContent} setNoteContent={setNoteContent}
                    />
                ) : (
                    <Route exact path={['/notes', '/notebooks/:notebookid/notes']}>
                        <NoteCreateForm
                        notebookid={notebookid} notebooks={notebooks} notes={notes} 
                        noteTitle={noteTitle} setNoteTitle={setNoteTitle} noteContent={noteContent} setNoteContent={setNoteContent}
                        />
                    </Route>
                )}
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