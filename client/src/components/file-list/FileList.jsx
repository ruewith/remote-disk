import React from "react";
import "./FileList.sass";
import { useSelector } from "react-redux";
import FileItem from "./FileItem";

const FileList = () => {
    const files = useSelector((state) => state.files.files);
    const view = useSelector((state) => state.files.view);

    if (files.length === 0) {
        return (
            <div className="loader">
                <h2 className="h2">Файлы не найдены</h2>
            </div>
        );
    }

    return (
        <div className={view}>
            <div className="fileListHeader m-1 p-1">
                <div className="fileType"></div>
                <div className="fileName">Название</div>
                <div className="fileDate">Дата</div>
                <div className="fileSize">Размер</div>
                <div className="fileActions"></div>
            </div>
            <div className="fileEnum">
                {files.map((file) => (
                    <FileItem key={file._id} file={file} />
                ))}
            </div>
        </div>
    );
};

export default FileList;
