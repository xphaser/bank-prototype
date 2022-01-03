import React from 'react'
import DefaultLayout from './layouts/default'

function Main(props) {
    return (
        <DefaultLayout title={props.title}>
            <form action="/resetRequest" method="post">
                <input name="email"></input>
                <input type="submit"></input>
            </form>
        </DefaultLayout>
    )
}

export default Main
