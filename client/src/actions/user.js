import axios from "axios";
import { setUser, getResponseMessage } from "../reducers/userReducer";
import { API_URL } from "../config";

export const registration = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}api/auth/registration`, {
            email,
            password,
        });
        dispatch(getResponseMessage({ responseMessage: response.data.message, variant: "success" }));
    } catch (error) {
        dispatch(getResponseMessage({ responseMessage: error.response.data.message, variant: "danger" }));
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}api/auth/login`, {
            email,
            password,
        });
        dispatch(setUser(response.data.user));
        localStorage.setItem("token", response.data.token);
    } catch (error) {
        dispatch(getResponseMessage({ responseMessage: error.response.data.message, variant: "danger" }));
    }
};

export const auth = () => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}api/auth/auth`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        dispatch(setUser(response.data.user));
        localStorage.setItem("token", response.data.token);
    } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
    }
};

export const uploadAvatar = (file) => {
    return async (dispatch) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post(`${API_URL}api/files/avatar`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            dispatch(setUser(response.data));
        } catch (error) {
            console.error(error);
        }
    };
};

export const deleteAvatar = () => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}api/files/avatar`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            dispatch(setUser(response.data));
        } catch (error) {
            console.log(error);
        }
    };
};
