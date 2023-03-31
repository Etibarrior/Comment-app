import React from 'react'
import {Route} from 'react-router-dom'
import {Routes, Navigate} from 'react-router'
import {PostPage} from './pages/PostPage'
import {CreatePage} from './pages/CreatePage'
import {CommentsPage} from './pages/CommentsPage'
import {AuthPage} from './pages/AuthPage'
import {LoginPage} from './pages/LoginPage'

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/posts" element={<PostPage />}/>
                <Route path="/posts/create" element={<CreatePage />}/>
                <Route path="/comments/:id" element={<CommentsPage />}/>
                <Route path="*" element={<Navigate to="/posts" replace={true} />}/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/registration" element={<AuthPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/posts" element={<PostPage />}/>
            <Route path="*" element={<Navigate to="/registration" replace={true} />}/>
        </Routes>
    )

}