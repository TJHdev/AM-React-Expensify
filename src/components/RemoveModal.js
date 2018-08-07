import React from 'react';
import Modal from 'react-modal';

const RemoveModal = (props) => (
  <Modal
    isOpen={Boolean(props.confirmRemoveExpense)}
    onRequestClose={props.handleCloseRemoveModal}
    contentLabel="Confirm Remove Expense"
    closeTimeoutMS={200}
    className="modal"
    ariaHideApp={false}
  >
    <h3 className="modal__title">Confirm Delete Expense</h3>
    <div className="modal__container">
      <button className="button" onClick={props.onRemove}>Delete</button>
      <button className="button test" onClick={props.handleCloseRemoveModal}>No</button>
    </div>
  </Modal>
);

export default RemoveModal;