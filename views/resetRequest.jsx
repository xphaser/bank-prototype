import React from 'react'
import DefaultLayout from './layouts/default'

function Main(props) {
    return (
        <DefaultLayout title={props.title}>
            <div className="form">
                <form action="/resetRequest" method="post">
                    <p>Enter your email:</p>
                    <input type="text" name="email" placeholder="email"></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </DefaultLayout>
    )
}

export default Main
