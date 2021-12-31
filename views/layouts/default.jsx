import React from 'react'

function DefaultLayout(props) {
    return (
        <html>
            <head><title>{props.title}</title></head>
            <body>{props.children}</body>
        </html>
    )
}

export default DefaultLayout
