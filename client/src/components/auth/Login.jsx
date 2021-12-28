import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";

import { login } from "../../actions/user";

import "./Auth.sass";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authMessage = useSelector((state) => state.user.authMessage);

    const dispatch = useDispatch();

    return (
        <Row className="justify-content-center">
            <Col sm={4}>
                <Form className="form-entrance py-5">
                    <h1 className="h3 my-3 fw-normal">Вход</h1>

                    <div className="form-floating-wrapper">
                        <Form.Group className="form-floating">
                            <Form.Control
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                type="email"
                                placeholder="E-mail"
                                className="form-control"
                            />
                            <Form.Label>E-mail</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-floating">
                            <Form.Control
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                type="password"
                                placeholder="Пароль"
                                className="form-control"
                            />
                            <Form.Label>Пароль</Form.Label>
                        </Form.Group>
                    </div>

                    <div className="d-flex justify-content-center">
                        <Button
                            variant="primary"
                            size="lg"
                            className="w-100"
                            type="button"
                            onClick={() => dispatch(login(email, password))}
                        >
                            Войти
                        </Button>
                    </div>

                    {authMessage.responseMessage && (
                        <Alert className="mt-3" variant={authMessage.variant}>
                            {authMessage.responseMessage}
                        </Alert>
                    )}

                    <p className="mt-5 text-muted">© 1991–2021</p>
                </Form>
            </Col>
        </Row>
    );
};

export default Login;
