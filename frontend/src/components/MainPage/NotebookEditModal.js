import { editOneNotebook } from '../../store/notebook';

import '../../index.css';

const NotebookEditModal = ({ setPopUp, title }) => {
    
    return (
        <div className='popup-container'>
            <div className="popup-form-container">
                <h3>Rename notebook</h3>
                <form>
                    <input
                        placeholder={title}
                        value={title}
                        onChange={() => editOneNotebook( )}
                    >
                    </input>
                    <button onClick={()=> setPopUp(false)}> Submit </button>
                    <button className='cancel-btn' onClick={()=> setPopUp(false)}> Cancel </button>
                </form>
            </div>
        </div>
    );
};

export default NotebookEditModal;