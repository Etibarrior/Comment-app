import React from 'react'
import {Accordion, Badge, NavLink} from 'react-bootstrap'


export const PostCard = (posts) => {
    return (
        <Accordion className="mb-5">
            {posts.array.map(post => {
                return (
                    <Accordion.Item eventKey={post.id} key={post.id} className="mb-5">
                        <Accordion.Header>
                            <Badge bg="dark">
                                <NavLink eventKey="1" href={'/comments/' + post.id}>{post.userLogin}</NavLink>
                            </Badge>
                            <Badge bg="light" text="dark">
                                {post.userEmail}
                            </Badge>
                        </Accordion.Header>
                        <Accordion.Body>
                            {post.text}
                        </Accordion.Body>
                    </Accordion.Item>
                )
            })
            }
        </Accordion>
    )
}