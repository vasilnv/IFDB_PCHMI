import React, { useState } from 'react';

import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

const AddCommentDialog = ({
    handleClose,
    handleSubmit,
    handleSendComment,
    isOpen
}) => {

    const [comment, setComment] = useState('');

    return (
        <Modal
            show={isOpen}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавяне на коментар
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="form-comment" >
                    <Form.Group controlId="formComment" controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                            as="textarea"
                            className="input-field name"
                            name="name"
                            rows="3"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" onClick={(e) => handleSendComment(comment, setComment)}>Добавяне</Button>
                <Button onClick={handleClose}>Затвори</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default AddCommentDialog;
