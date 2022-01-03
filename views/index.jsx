import React from 'react'
import DefaultLayout from './layouts/default'

function Main(props) {
    return (
        <DefaultLayout title={props.title}>
            <div className="form">
                <form action="/login" method="post">
                    <p className="error">{props.error}</p>
                    <input name="email" type="text" placeholder="email"/>
                    <input name="password" type="password" placeholder="password"/>
                    <button type="submit">LOGIN</button>
                    <p className="message">Not registered? <a href="/register">Create an account</a></p>
                    <p className="message"><a href="/resetPassword">Forgot password?</a></p>
                </form>
            </div>
        </DefaultLayout>
    )
}

export default Main
