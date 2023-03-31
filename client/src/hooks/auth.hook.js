import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const storage = JSON.parse(localStorage.getItem(storageName))
    let dataToken = ''
    if (storage && storage.token) {
       dataToken = storage.token
    } else if (!storage) { dataToken = null}

    const [token, setToken] = useState(dataToken)
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken) => {
        setToken(jwtToken)

        localStorage.setItem(storageName, JSON.stringify({token: jwtToken}))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token)
        }
        setReady(true)
    }, [login])

    return {login, logout, token, ready}
}