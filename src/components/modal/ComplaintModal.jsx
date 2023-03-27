import React from "react";
import "./ComplaintModal.css";

const ComplaintModal = ({ complaint, setShowModal, onHide }) => {
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="complaint-modal" show={true} onHide={onHide}>
        <span className="close-button" onClick={handleCloseModal}>
          &times;
        </span>
        <div className="modal-content">
          <h2 className="modal-title ">{complaint.title}</h2>
          <div className=" modal-body ">
            <p>
              <strong className=" modal-body-title ">Date Created:</strong>{" "}
              {complaint.dateCreated}
            </p>
            <p>
              <strong className=" modal-body-title ">Name:</strong>{" "}
              {complaint.firstName} {complaint.lastName}
            </p>
            <p>
              <strong className=" modal-body-title ">Email:</strong>{" "}
              {complaint.email}
            </p>
            <p>
              <strong className=" modal-body-title ">Student Year:</strong>{" "}
              {complaint.studentYear}
            </p>
            <p>
              <strong className=" modal-body-title ">Phone:</strong>{" "}
              {complaint.phone}
            </p>
            <p>
              <strong className=" modal-body-title ">Report To:</strong>{" "}
              {complaint.reportTo}
            </p>
            <p>
              <strong className=" modal-body-title ">Description:</strong>{" "}
              {complaint.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplaintModal;
