import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../mutations/userMutations';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Must be a valid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match")
}).required();

const RegistrationForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

    const onSubmit = async (formData) => {
        const { name, email, password } = formData;
        try {
            await registerUser({ variables: { name, email, password } });
            console.log('Registration successful', data);
        } catch (e) {
            console.error('Registration failed', e);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>An error occurred</p>;

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Аты</Form.Label>
                            <Form.Control type="text" placeholder="Атың енгізіңіз" {...register('name')} isInvalid={!!errors.name} />
                            <Form.Control.Feedback type="invalid">
                                {errors.name?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Жеке пошта</Form.Label>
                            <Form.Control type="email" placeholder="Пошта енгізіңіз" {...register('email')} isInvalid={!!errors.email} />
                            <Form.Control.Feedback type="invalid">
                                {errors.email?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Құпиясөз</Form.Label>
                            <Form.Control type="password" placeholder="Құпиясөз енгізіңіз" {...register('password')} isInvalid={!!errors.password} />
                            <Form.Control.Feedback type="invalid">
                                {errors.password?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Құпиясөз растау</Form.Label>
                            <Form.Control type="password" placeholder="Құпиясөзді растаңыз" {...register('confirmPassword')} isInvalid={!!errors.confirmPassword} />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="success" type="submit">
                            Регистрация
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegistrationForm;
