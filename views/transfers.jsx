import React from 'react'
import DefaultLayout from './layouts/default'

const Transfers = (props) => {
    return (
        <DefaultLayout>
            <a href="/logout">Logout</a>
            <div className="form">
            <p>Transfers history</p>
            <table>
                {props.data.reverse().map(transfer => (
                    <tr key={transfer.id}>
                        <td>{transfer.title}</td>
                        <td classNameName={transfer.senderId==props.user ? "outgoing" : "incoming"}>
                            {(transfer.senderId==props.user ? "-" : "") + parseFloat(transfer.amount).toFixed(2)}
                        </td>
                        <td><a href={"/transfers/" + transfer.id}>Details</a></td>
                    </tr>
                ))}
            </table>
            <a href="/transfers/new"><button>New transfer</button></a>
            </div>
        </DefaultLayout>
    )
}

export default Transfers
