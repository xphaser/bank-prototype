import React from 'react'
import DefaultLayout from './layouts/default'

function TransferForm(props) {
    return (
        <DefaultLayout title={props.title}>
            <a href="/">Back</a>
            <div className="form">
            <p className="error">{props.error}</p>
            <p>New transfer</p>
            <form action="/transfers/new" method="post">
                <input name="id" placeholder="recipient's account number" pattern="[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}" maxLength="36"></input>
                <input name="title" placeholder="title" maxLength="130"></input>
                <input name="amount" placeholder="amount" pattern="[0-9]{1,10}\.?[0-9]{0,2}" maxLength="10"></input>
                <button type="submit">Confirm</button>
            </form>
            </div>
        </DefaultLayout>
    )
}

export default TransferForm
