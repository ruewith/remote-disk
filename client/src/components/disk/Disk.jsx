import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Form } from "react-bootstrap";
import { FaUndo, FaFolderPlus, FaCloudUploadAlt, FaList } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

import "./Disk.sass";

import FileList from "../file-list";
import CreateDirModal from "../create-dir-modal";
import Uploader from "../uploader";

import { getFiles, uploadFile } from "../../actions/file";
import { setCurrentDir, setFileView, setModalDisplay } from "../../reducers/fileReducer";

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.files.currentDir);
    const dirStack = useSelector((state) => state.files.dirStack);
    const loader = useSelector((state) => state.app.loader);
    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState("type");

    useEffect(() => {
        dispatch(getFiles(currentDir, sort));
    }, [currentDir, sort]);

    const showModalHandler = () => {
        dispatch(setModalDisplay(true));
    };

    const backClickHandler = () => {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId));
    };

    const fileUploadHandler = (event) => {
        const files = [...event.target.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    };

    const dragEnterHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
    };

    const dragLeaveHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    };

    const dropHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let files = [...event.dataTransfer.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));
        setDragEnter(false);
    };

    if (loader) {
        return (
            <div className="loader">
                <div className="lds-dual-ring"></div>
            </div>
        );
    }

    return !dragEnter ? (
        <div
            className="disk"
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}
        >
            <Row className="py-3 justify-content-between">
                <Col sm={3}>
                    <Button className="m-1" variant="outline-primary" onClick={() => backClickHandler()}>
                        <FaUndo fontSize={24} />
                    </Button>
                    <Button className="m-1" variant="outline-primary" onClick={() => showModalHandler()}>
                        <FaFolderPlus fontSize={24} />
                    </Button>
                    <Form.Group as={Button} variant="outline-primary" className="disk-upload m-1">
                        <Form.Label className="mb-0" htmlFor="fileInput">
                            <FaCloudUploadAlt fontSize={24} />
                        </Form.Label>
                        <Form.Control
                            id="fileInput"
                            className="d-none"
                            multiple="true"
                            type="file"
                            onChange={(event) => fileUploadHandler(event)}
                        />
                    </Form.Group>
                </Col>
                <Col sm={4} className="d-flex m-1 align-items-center">
                    <Form.Select value={sort} onChange={(event) => setSort(event.target.value)}>
                        <option value="type">По типу</option>
                        <option value="name">По имени</option>
                        <option value="date">По дате</option>
                    </Form.Select>
                    <Button variant="outline-primary" className="m-1" onClick={() => dispatch(setFileView("fileList"))}>
                        <FaList fontSize={24} />
                    </Button>
                    <Button variant="outline-primary" className="m-1" onClick={() => dispatch(setFileView("fileGrid"))}>
                        <BsFillGrid3X3GapFill fontSize={24} />
                    </Button>
                </Col>
            </Row>
            <FileList />
            <CreateDirModal />
            <Uploader />
        </div>
    ) : (
        <Row className="p-3">
            <div
                className="drop-area"
                onDrop={dropHandler}
                onDragEnter={dragEnterHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragEnterHandler}
            >
                <h2 className="h2">Перетащите файлы сюда</h2>
            </div>
        </Row>
    );
};

export default Disk;
