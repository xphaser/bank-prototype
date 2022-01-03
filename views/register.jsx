import React from 'react'
import DefaultLayout from './layouts/default'

function Main(props) {
    return (
        <DefaultLayout title={props.title}>
            <div className="form">
                <form action="/register" method="post">
                    <p className="error">{props.error}</p>
                    <input name="email" type="text" placeholder="email"></input>
                    <input name="password" type="password" placeholder="password"></input>
                    <input name="confirm" type="password" placeholder="confirm password"></input>
                    <button type="submit">REGISTER</button>
                    <p className="message">Already registered? <a href="/login">Sign In</a></p>
                </form>
            </div>
        </DefaultLayout>
    )
}

export default Main
