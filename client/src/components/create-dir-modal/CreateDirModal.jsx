import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import "./CreateDirModal.sass";

import { useDispatch, useSelector } from "react-redux";
import { setModalDisplay } from "../../reducers/fileReducer";
import { createDir } from "../../actions/file";

const Popup = () => {
    const [dirName, setDirName] = useState("");
    const modalDisplay = useSelector((state) => state.files.modalDisplay);
    const currentDir = useSelector((state) => state.files.currentDir);
    const dispatch = useDispatch();

    const handleClose = () => dispatch(setModalDisplay(false));

    const createHandler = (event) => {
        event.preventDefault();
        dispatch(createDir(currentDir, dirName));
        dispatch(setModalDisplay(false));
        setDirName("");
    };

    return (
        <Modal show={modalDisplay} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Создать новую папку</Modal.Title>
            </Modal.Header>
            <Form onSubmit={createHandler}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            value={dirName}
                            onChange={(event) => setDirName(event.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary">
                        Создать
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default Popup;
