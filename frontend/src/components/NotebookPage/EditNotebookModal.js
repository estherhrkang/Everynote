import { useSelector } from 'react-redux';
import { editOneNotebook } from '../../store/notebook';

import '../index.css';

const EditNotebookModal = ({ setPopUp, title }) => {
    const notebooks = useSelector(state => state.notebook.fullNotebook);
    // const notebook = notebooks.find(notebook => )


    return (
        <div className='popup-container'>
            <div className="popup-form-container">
                <h3>Rename notebook</h3>
                <form>
                    <input
                        placeholder={title}
                        value={title}
                        onChange={() => editOneNotebook()}
                    >
                    </input>
                    <button onClick={()=> setPopUp(false)}> Submit </button>
                    <button className='cancel-btn' onClick={()=> setPopUp(false)}> Cancel </button>
                </form>
            </div>
        </div>
    );
};

export default EditNotebookModal;