import React, {useContext, useEffect, useState} from 'react'
import {Badge, Button, Card, Form, Modal, Row} from 'react-bootstrap'
import {AuthContext} from '../context/AuthContext'
import {useMessage} from '../hooks/message.hook'
import {useHttp} from '../hooks/http.hook'
import jwtDecode from 'jwt-decode'


export const CommentsCard = (post) => {

    const [show, setShow] = useState(false)
    const auth = useContext(AuthContext)
    const message = useMessage()
    const decodeToken = jwtDecode(auth.token)
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        text: '',
        file: '',
        postId: null,
        commentId: null,
        userId: decodeToken.id
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const createHandler = async () => {
        try {
            await request('/comment', 'POST', {...form}, {
                Authorization: `Bearer ${auth.token}`
            })
            handleClose()
        } catch (e) {
        }
    }

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const getComment = id => {
        return (
            post.obj[1].map(comment => {
                if (comment.id === id) {
                    if (comment.comments.length) {
                        return (
                            comment.comments.map(comment => {
                                return (
                                    <Card
                                        style={{width: 'auto', marginLeft: '20px'}}
                                        key={comment.id}
                                        className="p-1 mt-3 "
                                    >
                                        <Form.Group>
                                            <Badge bg="dark">{comment.userLogin}</Badge>
                                            <Badge bg="light" text="dark">{comment.userEmail}</Badge>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                defaultValue={`${comment.text}`}
                                                aria-label="Disabled input example"
                                                readOnly
                                            />
                                            <Button
                                                variant="dark"
                                                size="sm"
                                                className="mt-2 mx-2"
                                                onClick={() => {
                                                    handleShow()
                                                    setForm({...form, commentId: comment.id, postId: null})
                                                }}
                                            >Reply</Button>

                                        </Form.Group>
                                        {getComment(comment.id)}
                                    </Card>
                                )
                            })
                        )
                    }
                }
                return null
            })
        )
    }

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const modal = () => {
        return (
            <Modal show={show} onHide={handleClose} centered size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Create Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        as="textarea"
                        rows={6}
                        name="text"
                        placeholder="Введите text..."
                        onChange={changeHandler}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Row style={{marginLeft: 0, marginRight: 0}}>
                        <Button
                            variant="outline-dark"
                            style={{width: 'auto'}}
                            onClick={createHandler}
                            disabled={loading}
                        >Create Post
                        </Button>
                        <Form.Group controlId="formFile" style={{width: '163px'}}>
                            <Form.Control type="file"/>
                        </Form.Group>
                    </Row>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <Form className="d-flex flex-column">
            <Card style={{width: 'auto'}} className="p-1">
                <Form.Group>
                    <Badge bg="dark">{post.obj[0].userLogin}</Badge>
                    <Badge bg="light" text="dark">{post.obj[0].userEmail}</Badge>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        defaultValue={`${post.obj[0].text}`}
                        aria-label="Disabled input example"
                        readOnly
                    />
                    <Button
                        variant="dark"
                        size="sm"
                        className="mt-2 mx-2"
                        onClick={() => {
                            handleShow()
                            setForm({...form, postId: post.obj[0].id, commentId: null})
                        }}
                    >Reply</Button>

                    {modal()}

                </Form.Group>
            </Card>

            {post.obj[0].comment.map(comment => {
                return (
                    <Card style={{width: 'auto', marginLeft: '20px'}} key={comment.id} className="p-1 mt-3 ">
                        <Form.Group>
                            <Badge bg="dark">{comment.userLogin}</Badge>
                            <Badge bg="light" text="dark">{comment.userEmail}</Badge>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                defaultValue={`${comment.text}`}
                                aria-label="Disabled input example"
                                readOnly
                            />
                            <Button
                                variant="dark"
                                size="sm"
                                className="mt-2 mx-2"
                                onClick={() => {
                                    handleShow()
                                    setForm({...form, commentId: comment.id, postId: null})
                                }}
                            >Reply</Button>

                        </Form.Group>
                        {getComment(comment.id)}
                    </Card>
                )
            })}
        </Form>
    )
}