import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getIsLoggedIn } from "../store/users";

const Busket = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    return isLoggedIn ? (
        <div className="container mt-5">
            <h1>Корзина</h1>
            <p>Ваша корзина пуста</p>
        </div>
    ) : (
        <Redirect to="/login" />
    );
};

export default Busket;
