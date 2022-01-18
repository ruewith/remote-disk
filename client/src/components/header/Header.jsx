import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaUniversity, FaUserCircle } from "react-icons/fa";
import { Container, Button, Row, Col, Form, Image } from "react-bootstrap";

import "./Header.sass";

import { logout } from "../../reducers/userReducer";
import { getFiles, searchFiles } from "../../actions/file";
import { showLoader } from "../../reducers/appReducer";

import { API_URL } from "../../config";

const Header = () => {
    const dispatch = useDispatch();

    const isAuth = useSelector((state) => state.user.isAuth);
    const currentDir = useSelector((state) => state.files.currentDir);
    const currentUser = useSelector((state) => state.user.currentUser);
    const [searchName, setSearchName] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(false);

    const avatarUrl = currentUser.avatar ? `${API_URL + currentUser.avatar}` : null;

    const searchChangeHandler = (event) => {
        setSearchName(event.target.value);
        if (searchTimeout != false) {
            clearTimeout(searchTimeout);
        }
        dispatch(showLoader());
        if (event.target.value != "") {
            setSearchTimeout(
                setTimeout(
                    (value) => {
                        dispatch(searchFiles(value));
                    },
                    500,
                    event.target.value
                )
            );
        } else {
            dispatch(getFiles(currentDir));
        }
    };

    return (
        <header className="header py-3 bg-dark text-white">
            <Container>
                <Row className="justify-content-between align-items-center">
                    <Col sm={1}>
                        <NavLink to="/">
                            <FaUniversity fontSize={48} />
                        </NavLink>
                    </Col>
                    {!isAuth && (
                        <Col sm={3}>
                            <Button as={NavLink} to="/login" variant="success" className="m-1">
                                Вход
                            </Button>

                            <Button as={NavLink} to="/registration" className="m-1">
                                Регистрация
                            </Button>
                        </Col>
                    )}
                    {isAuth && (
                        <Col sm={4} className="d-flex justify-content-end align-items-center">
                            <Form.Control
                                type="text"
                                placeholder="Название файла..."
                                value={searchName}
                                onChange={(event) => searchChangeHandler(event)}
                            />
                            <NavLink className="d-inline-block mx-1" to="/profile">
                                {avatarUrl ? (
                                    <Image src={avatarUrl} width={48} roundedCircle />
                                ) : (
                                    <FaUserCircle fontSize={48} />
                                )}
                            </NavLink>
                            <Button className="ms-3" onClick={() => dispatch(logout())}>
                                Выход
                            </Button>
                        </Col>
                    )}
                </Row>
            </Container>
        </header>
    );
};

export default Header;
