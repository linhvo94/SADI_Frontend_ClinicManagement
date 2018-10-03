import React from 'react';

export const AdminDashboard = (props) => {
    return (
        <div className="row">
            <div>
                <h1>Welcome Admin!</h1>
                <p>You can create, read, update, delete patients with <strong>Patient Control</strong>.</p>
                <p>You can view all the visit logs with <strong>Visit Log Detail</strong>. </p>
                <p>You can create, read, update, delete Disease under <strong>Disease Control</strong>.</p>
                <p>You can create, read, update, delete Drug under <strong>Drug Control</strong>.</p>
            </div>
        </div>
    );
}