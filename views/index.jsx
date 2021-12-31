import React from 'react'
import DefaultLayout from './layouts/default'

function Main(props) {
    return (
        <DefaultLayout title={props.title}>
            <div>Hellos</div>
        </DefaultLayout>
    )
}

export default Main
