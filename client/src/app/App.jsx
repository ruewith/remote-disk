import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import "bootswatch/dist/flatly/bootstrap.min.css";
import "./App";

import Header from "../components/header/Header";
import Main from "../components/main/Main";

import { auth } from "../actions/user";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, []);

    return (
        <Router>
            <div className="app">
                <Header />
                <Main />
            </div>
        </Router>
    );
};

export default App;
