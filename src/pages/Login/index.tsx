import React, {useCallback, useRef, useState} from 'react';
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import {Form} from '@unform/web';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import {Link, useHistory} from 'react-router-dom';

import {useAuth} from '../../hooks/AuthContext';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Content} from './styles';

interface LoginFormData{
    email: string;
    senha: string
}

const Login: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [erro, setErro] = useState<String | null>();

    const history = useHistory();

    const {login} = useAuth();

    const handleSubmit = useCallback(async (data: LoginFormData) => {
        try {
            setErro(null);
            formRef.current?.setErrors({});
            
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido.'),
                senha: Yup.string().required('Senha é obrigatória')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            await login({
                email: data.email,
                senha: data.senha
            });

            history.push('/produto');
            
        }catch(err) {
            console.log(err);
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                
                return;
            } 
            setErro('E-mail ou senha incorretos.');
            return;
        }
    }, [login, setErro]);

    return(
        <Container>
            <Content>
                <Form ref={formRef} onSubmit={handleSubmit} >
                    <h1>Login</h1>
                    {erro &&(
                        <h5>{erro}</h5>
                    )}
                    <Input name='email' icon={FiMail} placeholder='E-mail' />
                    <Input name='senha' icon={FiLock} type="password" placeholder='Senha' />
                    <Button type='submit'>Entrar</Button>
                    
                    <Link to="/cadastrar">
                        <FiLogIn />
                        Criar conta
                    </Link>
                </Form>
                
            </Content>
        </Container>
    );
};

export default Login;