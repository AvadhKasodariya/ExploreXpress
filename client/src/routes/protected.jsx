import React, { useLayoutEffect } from 'react'
import { useAuthSession } from '../hook/auth'
import { Outlet, useNavigate } from 'react-router-dom'

export default function () {

    const session = useAuthSession()
    const redirect = useNavigate()

    useLayoutEffect(() => {
        if (session.status === 'unauthenticated')
            redirect('/login')
    }, [session])
    return session.status !== 'loading' && <Outlet />
}
