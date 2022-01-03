import React from 'react'
import DefaultLayout from './layouts/default'

function Main(props) {
    return (
        <DefaultLayout title={props.title}>
            <form action="/transfers/new" method="post">
                <input name="id" placeholder="recipient's account number" pattern="[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}" maxlength="36"></input>
                <input name="title" placeholder="title" maxlength="130"></input>
                <input name="amount" placeholder="amount" maxlength="9"></input>
                <input type="submit"></input>
            </form>
        </DefaultLayout>
    )
}

export default Main
