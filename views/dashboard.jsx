import React from 'react'
import DefaultLayout from './layouts/default'

function Main(props) {
    return (
        <DefaultLayout title={props.title}>
            <a href="/logout">Logout</a>
        </DefaultLayout>
    )
}

export default Main
