import { createContext, useState } from "react";

export const AuthContext = createContext({
  auth: false, 
  setAuth: () => {}
});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(localStorage.getItem('token') ? true : false);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;