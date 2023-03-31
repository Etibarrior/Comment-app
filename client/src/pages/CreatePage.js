import React, {useState, useEffect, useContext} from 'react'
import {Button, Card, Container, Form, Row} from 'react-bootstrap'
import {NavbarBlock} from '../components/Navbar'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
import jwtDecode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'


export const CreatePage = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const decodeToken = jwtDecode(auth.token)
    const [form, setForm] = useState({text: '', file: 'null', userId: decodeToken.id})


    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const changeHandlerFile = (event) => {
        setForm({...form, file: event.target.files[0]})
        console.log(event.target.files[0])
    }

    const createHandler = async () => {
        try {
            const data = await request('/post', 'POST', {...form}, {
                Authorization: `Bearer ${auth.token}`
            })
            navigate(`/comments/${data.id}`)
        } catch (e) {}
    }

    return (
        <div>
            <div className="jumbotron text-center">
                <h1>Create</h1>
            </div>
            <NavbarBlock />
            <br/>
            <div>
                <Container className="d-flex justify-content-center align-items-center">
                    <Card style={{width: 1100}} className="p-5">
                        <Form.Group className="mb-3">
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={8}
                                name="text"
                                placeholder="Введите text..."
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
                                onClick={createHandler}
                                disabled={loading}
                            >Create Post
                            </Button>
                            <Form.Group controlId="formFile" className="mt-3" style={{width: '163px'}}>
                                <Form.Control
                                    type="file"
                                    accept="image/*, text/*"
                                    onChange={changeHandlerFile}
                                />
                            </Form.Group>
                        </Row>
                    </Card>
                </Container>
            </div>
        </div>
    )
}
