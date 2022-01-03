import React from 'react'
import DefaultLayout from './layouts/default'

function Main(props) {
    return (
        <DefaultLayout title={props.title}>
            <div className="form">
                <form action="/resetPassword" method="post">
                    <p>Enter new password:</p>
                    <input type="hidden" name="userId" value={props.userId}></input>
                    <input type="hidden" name="token" value={props.token}></input>
                    <input name="password" type="password" placeholder="password"></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </DefaultLayout>
    )
}

export default Main
