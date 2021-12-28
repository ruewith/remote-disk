import React from "react";
import { useDispatch } from "react-redux";
import { Button, ProgressBar } from "react-bootstrap";

import "./Uploader.sass";

import { removeUploadFile } from "../../reducers/uploadReducer";

const UploadFile = ({ file }) => {
    const dispatch = useDispatch();

    return (
        <div className="upload-file bg-light p-2 m-1 rounded">
            <div className="d-flex justify-content-between mb-1">
                <div className="upload-filename">{file.name}</div>
                <Button
                    className="btn-close btn-close-white"
                    onClick={() => dispatch(removeUploadFile(file.id))}
                ></Button>
            </div>

            <ProgressBar striped variant="success" now={file.progress} label={`${file.progress}%`} />
        </div>
    );
};

export default UploadFile;
