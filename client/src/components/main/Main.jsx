import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import "./Main.sass";

import { Login, Registration } from "../auth";
import Disk from "../disk/Disk";
import Profile from "../profile/Profile";

const Main = () => {
    const isAuth = useSelector((state) => state.user.isAuth);

    return (
        <div className="main bg-light">
            <Container>
                {!isAuth ? (
                    <Switch>
                        <Route path="/registration" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Redirect to="/login" />
                    </Switch>
                ) : (
                    <Switch>
                        <Route exact path="/" component={Disk} />
                        <Route exact path="/profile" component={Profile} />
                        <Redirect to="/" />
                    </Switch>
                )}
            </Container>
        </div>
    );
};

export default Main;
