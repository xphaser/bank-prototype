import React from 'react'
import DefaultLayout from './layouts/default'

function TransferDetails(props) {
    return (
        <DefaultLayout >
            <div className="wrapper">
                <p className="message">Amount</p>
                <p className={props.transfer.senderId==props.user ? "error" : ""}>
                    {(props.transfer.senderId==props.user ? "-" : "") + parseFloat(props.transfer.amount).toFixed(2)}
                </p>
                <p className="message">Transaction</p>
                <p>{props.transfer.senderId==props.user ? "Outgoing transfer" : "Incoming transfer"}</p>
                <p className="message">{(props.transfer.senderId==props.user ? "Recipient's" : "Sender's") + " account number"}</p>
                <p>{props.transfer.senderId==props.user ? props.transfer.receiverId : props.transfer.senderId}</p>
                <p className="message">Title</p>
                <p>{props.transfer.title}</p>
                <p className="message">Date</p>
                <p>{props.transfer.datetime.toISOString()}</p>
                <a href="/transfers">Back</a>
            </div>
        </DefaultLayout>
    )
}

export default TransferDetails
