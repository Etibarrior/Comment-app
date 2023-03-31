import React, {useCallback, useEffect, useState} from 'react'
import {Card, Container, Form, Pagination} from 'react-bootstrap'
import {NavbarBlock} from '../components/Navbar'
import {useHttp} from '../hooks/http.hook'
import {PostCard} from '../components/PostCard'


export const PostPage = () => {
    const [posts, setPosts] = useState(null)
    const [showPage, setShowPage] = useState(1)
    const {loading, request} = useHttp()

    let pages = []

    if (posts) {
        const pageCount = Math.ceil(posts.count / 5)
        for (let i = 0; i < pageCount; i++) {
            pages.push(i + 1)
        }
    }

    const fetchPosts = useCallback( async () => {
        try {
            const fetched = await request(`/post/page/${showPage}`, 'GET', null)
            setPosts(fetched)
        } catch (e) {
        }
    }, [request, showPage])

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    return (
        <div>
            <div className="jumbotron text-center">
                <h1>Posts</h1>
            </div>
            <NavbarBlock/>
            <br/>
            <div>
                <Container className="d-flex justify-content-center align-items-center">
                    <Card style={{width: 1100}} className="p-5">
                        <Form className="d-flex flex-column">
                            {!loading && posts && <PostCard array={posts.rows}/>}
                        </Form>
                        <Pagination>{pages.map(page =>
                            <Pagination.Item
                                key={page}
                                active={showPage === page}
                                onClick={() => setShowPage(page)}
                            >
                                {page}
                            </Pagination.Item>
                        )}</Pagination>
                    </Card>

                </Container>
            </div>
        </div>
    )
}
