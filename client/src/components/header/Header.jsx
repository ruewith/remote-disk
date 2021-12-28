import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaUniversity, FaUserCircle } from "react-icons/fa";
import { Container, Button, Row, Col, Image } from "react-bootstrap";

import "./Header.sass";

import { logout } from "../../reducers/userReducer";

import { API_URL } from "../../config";

const Header = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const avatarUrl = currentUser.avatar ? `${API_URL + currentUser.avatar}` : null;

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
                        <Col sm={3} className="d-flex justify-content-end align-items-center">
                            <NavLink to="/profile">
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
