import '../index.css';

const EditNotebookModal = ({ setPopUp, title, setTitle }) => {

    return (
        <div className='popup-container'>
            <div className="popup-form-container">
                <h1>Rename notebook</h1>
                <form>
                    <input
                        value={title}
                        onChange={setTitle}
                    >
                    </input>
                    <button onClick={()=> setPopUp(false)}> Submit </button>
                </form>
            </div>
            <div className="popup-button-container">
                <button className='cancel-btn' onClick={()=> setPopUp(false)}> Cancel </button>
            </div>
        </div>
    );
};

export default EditNotebookModal;