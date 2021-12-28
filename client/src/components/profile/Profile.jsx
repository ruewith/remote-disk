import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";

import { API_URL } from "../../config";

import { deleteAvatar, uploadAvatar } from "../../actions/user";

const Profile = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const changeHandler = (event) => {
        const file = event.target.files[0];
        dispatch(uploadAvatar(file));
    };

    const avatarUrl = currentUser.avatar ? `${API_URL + currentUser.avatar}` : null;

    return (
        <Row className="py-3">
            <Col>
                {avatarUrl ? (
                    <Button onClick={() => dispatch(deleteAvatar())}>Удалить аватар</Button>
                ) : (
                    <Form.Control accept="image/*" type="file" onChange={(event) => changeHandler(event)} />
                )}
            </Col>
        </Row>
    );
};

export default Profile;
