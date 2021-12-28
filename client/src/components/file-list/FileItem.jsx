import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { FaFolder, FaFile, FaFileDownload, FaTrashAlt } from "react-icons/fa";

import { pushToStack, setCurrentDir } from "../../reducers/fileReducer";
import { deleteFile, downloadFile } from "../../actions/file";
import sizeFormat from "../../utils/sizeFormat";

const FileItem = ({ file }) => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.files.currentDir);

    const openDirHandler = (file) => {
        if (file.type === "dir") {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    };

    const downloadClickHandler = (event) => {
        event.stopPropagation();
        downloadFile(file);
    };

    function deleteClickHandler(event) {
        event.stopPropagation();
        dispatch(deleteFile(file));
    }

    return (
        <div className="fileItem p-2 border border-primary rounded" onDoubleClick={() => openDirHandler(file)}>
            <div className="fileType">
                {file.type === "dir" ? <FaFolder className="fileIcon" /> : <FaFile className="fileIcon" />}
            </div>
            <div className="fileName">{file.name}</div>
            <div className="fileDate">{file.date.slice(0, 10)}</div>
            <div className="fileSize">{sizeFormat(file.size)}</div>
            <div className="fileAction">
                {file.type !== "dir" && (
                    <Button className="m-1" variant="outline-success" onClick={(event) => downloadClickHandler(event)}>
                        <FaFileDownload />
                    </Button>
                )}
                <Button className="m-1" variant="outline-danger" onClick={(event) => deleteClickHandler(event)}>
                    <FaTrashAlt />
                </Button>
            </div>
        </div>
    );
};

export default FileItem;
