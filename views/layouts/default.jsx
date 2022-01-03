import React from 'react'

function DefaultLayout(props) {
    return (
        <html>
            <head>
                <title>{props.title}</title>
                <link rel="stylesheet" href="/styles.css"></link>
            </head>
            <body>{props.children}</body>
        </html>
    )
}

export default DefaultLayout
