import React, {useContext, useEffect, useState} from 'react'
import {Button, Card, Container, Form, Row} from 'react-bootstrap'
import {useMessage} from '../hooks/message.hook'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {NavbarBlock} from '../components/Navbar'

export const LoginPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    
    const loginHandler = async () => {
        try {
            const data = await request('/user/login', 'POST', {...form})
            auth.login(data.token)
        } catch (e) {
        }
    }

    return (
        <div>
            <div className="jumbotron text-center">
                <h1>Authorization</h1>
            </div>
            <NavbarBlock />
            <br/>
            <div>
                <Container className="d-flex justify-content-center align-items-center">
                    <Card style={{width: 600}} className="p-5">
                        <Form className="d-flex flex-column">
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Введите email..."
                                    onChange={changeHandler}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Введите пароль..."
                                    onChange={changeHandler}
                                />
                            </Form.Group>
                            <Row
                                className="justify-content-between "
                                style={{marginLeft: 0, marginRight: 0}}
                            >
                                <Button
                                    className="mt-3 align-self-baseline"
                                    variant="outline-dark"
                                    style={{width: 'auto'}}
                                    onClick={loginHandler}
                                    disabled={loading}
                                >Login
                                </Button>
                                <Button
                                    className="mt-3"
                                    variant="outline-warning"
                                    style={{width: 'auto'}}
                                    href="/registration"
                                >Registration
                                </Button>
                            </Row>
                        </Form>
                    </Card>
                </Container>
            </div>
        </div>
    )
}
