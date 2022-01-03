import React from 'react'
import DefaultLayout from './layouts/default'

function Message(props) {
    return (
        <DefaultLayout title={props.title}>
            <div className="form">
                <p className={props.err ? "error" : ""}>{props.message}</p>
                <a href="/">Return to homepage</a>
            </div>
        </DefaultLayout>
    )
}

export default Message
