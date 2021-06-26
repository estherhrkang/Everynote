import { useState, useEffect } from "react";
import { NavLink, Route, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAllNotebooks } from "../../store/notebook";
import { getAllNotes, getAllNotesInNotebook } from "../../store/note";

import ProfileButton from './ProfileButton';
import NotebookPage from "../NotebookPage";
import NotePage from "../NotePage";
import ShowNotes from "../NotebookPage/ShowNotes";
import CreateNoteForm from "../NotePage/CreateNoteForm";
import EditNoteForm from "../NotePage/EditNoteForm";

import '../../index.css';

const MainPage = ({ isLoaded }) => {
    const dispatch = useDispatch();

    const { notebookid } = useParams();
    const { id } = useParams();

    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebook.fullNotebook);
    const notes = useSelector(state => state.note.fullNote);

    const [showNoteField, setShowNoteField] = useState(false);

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
                            <button className='new-note-btn' onClick={() => setShowNoteField(true)}>add new note</button>
                        </li>
                        <li className='navigation-li'>
                            <NavLink to='/notebooks'><i className='fas fa-book'> Notebooks</i></NavLink>
                        </li>
                        <li className='navigation-li'> 
                            <NavLink to='/notes'><i className='fas fa-sticky-note'> Notes</i></NavLink>
                        </li>
                    </ul>
                </div>
                <div className=''>
                    main div 1 - list
                    <Route path={'/notes'}>
                        <NotePage />
                    </Route>
                    <Route path={'/notebooks/:notebookid/notes'}>
                        <ShowNotes />
                    </Route>
                </div>
                <div>
                    main div 2 - type
                    <CreateNoteForm hideNoteField={() => setShowNoteField(false)}/>
                </div>
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