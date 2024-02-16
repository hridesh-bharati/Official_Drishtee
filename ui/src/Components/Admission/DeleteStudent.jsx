import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteStudents = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <div style={{ margin: '4rem 0' }}>
            <div className="row py-4 m-auto">
                <div className="col-md-6 col-sm-12 m-auto myshadow2 my-4 text-center bg-light">
                    <label htmlFor="password" className='BadLine fs-3 py-4 lh-1'>Enter Student ID's</label>
                    <div className="input-group mb-3">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            id="deleteStudent"
                            value={password}
                            placeholder="Enter Student id's..."
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        <span className="input-group-text bg-warning p-0 m-0" id="basic-addon2">
                            <button className="btn btn-sm" type="button" onClick={togglePasswordVisibility}>
                                {showPassword ? (
                                    <>
                                        <i className="bi bi-eye-slash-fill"></i>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-eye-fill"></i>
                                    </>
                                )}
                            </button>

                        </span>
                    </div>
                    <button className="btn btn-danger my-3" type="button" onClick={handleDeleteClick}>
                        Delete
                    </button>
                </div>
            </div>

            <Modal show={showModal} onHide={handleModalClose} animation={false}>
                <Modal.Header className='bg-primary ' closeButton>
                    <Modal.Title>
                        <div className="h2 fw-bold myFlex2 text-white">
                            <b className="px-2 text-uppercase"> DELETE STUDENT'S</b>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><i class="bi bi-exclamation-triangle-fill text-warning fs-4"></i> Are you sure you want to delete this student?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleModalClose}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DeleteStudents;
