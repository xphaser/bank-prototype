import React from 'react'
import DefaultLayout from './layouts/default'

function TransferConfirm(props) {
    return (
        <DefaultLayout >
            <div className="wrapper">
                <p className="message">Amount</p>
                <p>{parseFloat(props.transfer.amount).toFixed(2)}</p>
                <p className="message">Account number</p>
                <p>{props.transfer.receiverId}</p>
                <p className="message">Title</p>
                <p>{props.transfer.title}</p>
                <a href={"/transfers/"+props.transfer.id+"/confirm"}><button>Confirm</button></a>
                <a href={"/transfers/"+props.transfer.id+"/cancel"}><button>Cancel</button></a>
            </div>
        </DefaultLayout>
    )
}

export default TransferConfirm
