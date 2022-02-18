import React, { createContext, useCallback, useContext, useState} from "react";
import api from '../services/api';

interface AuthState {
    authorization: string;
    user: string;
}

interface LoginCredentials {
    email: string,
    senha: string;
}

interface AuthContextData {
    user: string;
    authorization: string;
    login(credentials: LoginCredentials): Promise<void>;
    logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {

    const [data, setData] = useState<AuthState>(() => {
        const authorization = localStorage.getItem('@ControleEstoque:token');
        const user = localStorage.getItem('@ControleEstoque:user');

        if(authorization && user) {
            return {authorization, user};
        }

        return {} as AuthState;
    });

    const login = useCallback(async ({email, senha}) => {
        const response = await api.post('login', {
            email, 
            senha
        });

        const {authorization} = response.headers;

        localStorage.setItem('@ControleEstoque:token', authorization);
        localStorage.setItem('@ControleEstoque:user', email);

        setData({authorization, user:email});
    },[]);

    const logout = useCallback(() => {
        localStorage.removeItem('@ControleEstoque:token');
        localStorage.removeItem('@ControleEstoque:user');

        setData({} as AuthState);
    },[]);

    return(
        <AuthContext.Provider value={{user: data.user, authorization: data.authorization, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context;
}