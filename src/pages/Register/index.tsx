import React, {useCallback, useRef} from 'react';
import {FiArrowLeft, FiUser, FiMail, FiLock} from 'react-icons/fi';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/web';
import * as Yup from 'yup';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Content} from './styles';

interface RegistrarFormData {
    nome: string;
    email: string;
    senha: string;
}

const Register: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const history = useHistory();
    
    const handleSubmit = useCallback(async (data: RegistrarFormData) => {
        try {
            formRef.current?.setErrors({});
            
            const schema = Yup.object().shape({
                name: Yup.string()
                    .min(5, 'No minimo 5 digitos.')
                    .max(80, 'No máximo 80 digitos'),
                email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido.'),
                senha: Yup.string().required('Senha é obrigatória')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            await api.post('/usuarios', data);
            alert('Cadastro realizado com sucesso!');
            history.push('/');
            
        }catch(err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);

                return;
            }

            alert('Ocorreu um erro ao realizar o cadastro.');
            return;
        }
    }, [history]);
    
    return(    
        <Container>
            <Content>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>

                    <Input name='nome' icon={FiUser} placeholder='Nome' />
                    <Input name='email' icon={FiMail} placeholder='E-mail' />
                    <Input name='senha' icon={FiLock} type="password" placeholder='Senha' />

                    <Button type='submit'>Cadastrar</Button>
                    
                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para login
                    </Link>
                </Form>
                
            </Content>
        </Container>
    );
};

export default Register;