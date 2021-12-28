import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

import "./Uploader.sass";

import UploadFile from "./UploadFile";

import { hideUploader } from "../../reducers/uploadReducer";

const Uploader = () => {
    const files = useSelector((state) => state.upload.files);
    const isVisible = useSelector((state) => state.upload.isVisible);
    const dispatch = useDispatch();

    return (
        isVisible && (
            <div className="uploader bg-dark border border-primary p-3 m-2 rounded">
                <div className="d-flex justify-content-between">
                    <div className="uploader-title text-white fw-bold">Загрузки</div>
                    <Button className="btn-close" onClick={() => dispatch(hideUploader())}></Button>
                </div>
                {files.map((file) => (
                    <UploadFile key={file.id} file={file} />
                ))}
            </div>
        )
    );
};

export default Uploader;
