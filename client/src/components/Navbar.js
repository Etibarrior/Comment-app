import React, {useContext} from 'react'
import {Button, Container, Navbar} from 'react-bootstrap'
import {useAuth} from '../hooks/auth.hook'
import {AuthContext} from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'

export const NavbarBlock = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate('/login')
    }

    const {token} = useAuth()
    const isAuthenticated = !!token
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/posts">SPA</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    { isAuthenticated ?
                        <Navbar.Text>
                            <Button href="/posts/create" variant="dark">Create</Button>
                            <Button href="/login" variant="dark" onClick={logoutHandler}>Logout</Button>
                        </Navbar.Text>
                        :
                        <Navbar.Text>
                            <Navbar.Brand href="/login">Login</Navbar.Brand>
                            <Navbar.Brand href="/posts">Post</Navbar.Brand>
                        </Navbar.Text>

                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
