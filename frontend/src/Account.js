import React, { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from '../../UserPool';

const AccountContext = createContext();

const Account = (props) => {
    const authenticate = async (Email, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({ Email, Pool });

            const authDetails = new AuthenticationDetails({ Email, Password });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    localStorage.setItem('usuario-login', data.getIdToken().getJwtToken());
                    console.log("onSuccess: ", data);
                    setLoading(true)
                },
                onFailure: (err) => {
                    setLoading(false)
                    // setMsg(true)
                    console.error("onFailure: ", err);
                    toast.error("Dados inválidos!")
                },
                newPasswordRequired: (data) => {
                    setLoading(false)
                    // navigate("/main")
                    console.log("newPasswordRequired: ", data);
                },
            });


        })


    }

    return (
        <AccountContext.Provider value={{ authenticate }}>
            {props.children}

        </AccountContext.Provider>
    )
}