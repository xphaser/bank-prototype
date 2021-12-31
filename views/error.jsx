import React from 'react'
import DefaultLayout from './layouts/default'

function Error(props) {
    return (
        <DefaultLayout title='Error'>
            <div>Error: {props.message}</div>
        </DefaultLayout>
    )
}

export default Error
