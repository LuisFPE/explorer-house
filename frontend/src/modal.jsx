import "./scss/modal.scss"
import PropTypes from 'prop-types';


function Modal({ children, isOpen}) {
  if (!isOpen) return null;


  return (
    <div className="modal">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
}


Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
};



export {
  Modal
}