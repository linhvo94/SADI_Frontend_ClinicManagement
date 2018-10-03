export function getAllPrescriptionsPerVisit(visitLogID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/prescriptions/findbyvisitID/${visitLogID}/?access_token=${access_token}`, {
            method: 'GET',
        })
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'GET_ALL_PRESCRIPTIONS_BY_VISITLOG_ID',
                    payload: data
                })
            });
    }
};

export function addPrescriptionsForAVisit(prescriptions, visitLogID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/addPrescriptions/${visitLogID}/?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(prescriptions)
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                dispatch(getAllPrescriptionsPerVisit(visitLogID));
            })
    }
}

export function savePrescriptionsState(prescription) {
    return {
        type: 'SAVE_PRESCRIPTIONS_STATE',
        payload: prescription
    };
};


export function resetPrescription() {
    return {
        type: 'RESET_PRESCRIPTIONS'
    };
};

export function getPrescription() {
    return {
        type: 'GET_PRESCRIPTIONS_CURRENT_STATE'
    };
};

