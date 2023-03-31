import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Card, Container} from 'react-bootstrap'
import {NavbarBlock} from '../components/Navbar'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {CommentsCard} from '../components/CommentsCard'
import {Loader} from '../components/Loader'


export const CommentsPage = () => {
    const [post, setPost] = useState()
    const [comment, setComment] = useState()
    const id = useParams().id
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchPost = useCallback(async () => {
        try {
            const fetched = await request(`/post/${id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setPost(fetched)
        } catch (e) {}
    }, [token, request, id])

    const fetchComment = useCallback(async () => {
        try {
            const fetched = await request(`/comment`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setComment(fetched)
        } catch (e) {
        }
    }, [request, token])

    useEffect( () => {
        void fetchPost()
    }, [fetchPost])

    useEffect(() => {
        void fetchComment()
    }, [fetchComment])

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <div className="jumbotron text-center">
                <h1>Comments</h1>
            </div>
            <NavbarBlock />
            <br/>
            <div>
                <Container className="d-flex justify-content-center align-items-center">
                    <Card style={{width: 1100}} className="p-5">
                            {!loading && post && comment && <CommentsCard obj={[post, comment]}/>}
                    </Card>
                </Container>
            </div>
        </div>
    )
}
