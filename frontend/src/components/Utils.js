import React from "react";
import {useContext, useState} from "react";
import AuthContext from "../context/AuthContext";

export function Utils(){

    return {
        getToken: GetToken
    };
}


const GetToken = () => {
    const { authTokens } = useContext(AuthContext);
    const { access, refresh } = authTokens;

    return access
}

