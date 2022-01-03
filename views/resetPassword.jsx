import React from 'react'
import DefaultLayout from './layouts/default'

function Main(props) {
    return (
        <DefaultLayout title={props.title}>
            <form action="/resetPassword" method="post">
                <input type="hidden" name="userId" value={props.userId}></input>
                <input type="hidden" name="token" value={props.token}></input>
                <input name="password"></input>
                <input type="submit"></input>
            </form>
        </DefaultLayout>
    )
}

export default Main
