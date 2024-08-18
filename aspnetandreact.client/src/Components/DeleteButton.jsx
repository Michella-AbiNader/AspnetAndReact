import { useState } from 'react';
import PropTypes from 'prop-types';
import '../Styles/DeleteButton.css'; 
function DeleteButton({ id, type, onDelete }) {
    const [showConfirmation, setShowConfirmation] = useState(false);



    const handleDeleteClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = async (e) => {
        e.preventDefault();
        onDelete(id, type)
        setShowConfirmation(false);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    return (
        <>
            <button className="delete-button" onClick={handleDeleteClick}>
                Delete
            </button>
            {showConfirmation && (
                <>
                    <div className="overlay"></div> 
                <div className="confirmation-box">
                    <p>{type == "Shops"? "Are you sure you want to delete this shop and all products related to it?": "Are you sure you want to delete this product?"}</p>
                    <button className="confirm-button" onClick={handleConfirmDelete}>Yes, I am sure</button>
                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </>
            )}
        </>
    );
}

DeleteButton.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
