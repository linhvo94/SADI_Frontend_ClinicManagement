import React from 'react';

export const DoctorDashboard = (props) => {
    return (
        <div className="row">
            <div>
                <h1>Welcome Doctor!</h1>
                <p>You can create, read, update, delete patients under <strong>Patient Control</strong>.</p>
                <p><strong>Patient Search Service</strong> also helps you to find the patient information as well.
                Both links are located under Patient tab</p>

                <p>Under <strong>Visit Logs</strong> tab, with <strong>Visit Log Control </strong>you can create new record the patient's visit information
                or edit the data based on your need.</p>
                <p><strong>Find Visit Log</strong> will aid you to look for a visit detail of a patient.</p>
                <p><strong>Find Disease & Drug</strong> will help you to look all the diseases and drugs as well as search
                for a specific disease and drug. Please contact the Admin to update Disease list or Drug list
                if you can't find a particular disease or disease.</p>

            </div>
        </div>
    );
}