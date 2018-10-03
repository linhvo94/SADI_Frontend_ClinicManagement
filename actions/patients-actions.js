export function fetchPatients() {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/patients/?access_token=${access_token}`)
            .then((res) => { return res.json() })
            .then((data) => {
                console.log(data)
                dispatch({
                    type: 'FETCH_PATIENTS',
                    payload: data
                });
            });
    }
}


export function addPatient(patient) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/patients/?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(patient)
        })
            .then((res) => { return res.text() })
            .then((data) => {
                dispatch(fetchPatients())
            })
    }
};

export function deletePatient(patientID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/patients/${patientID}/?access_token=${access_token}`, {
            method: 'DELETE'
        })
            .then((res) => { return res.text() })
            .then((data) => {
                dispatch(fetchPatients())
            })
    }
};


export function updatePatient(patient) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/patients/${patient.id}?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(patient)
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                dispatch(fetchPatients())
            })
    }
};


export function findPatientByName(patientName) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/patients/findbyname/${patientName}/?access_token=${access_token}`, {
            method: "GET",
        })
            .then((res) => { return res.json() })
            .then((data) => {
                if (data.length !== 0) {
                    dispatch({
                        type: "SEARCH_PATIENTS_BY_NAME",
                        payload: data
                    })
                } else {
                    dispatch({
                        type: "PATIENT_NOT_FOUND",
                        payload: `There is no patient with name "${patientName}"`
                    });
                }
            })
    }
};

export function findEditPatientByID(patientID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/patients/findbyid/${patientID}/?access_token=${access_token}`, {
            method: 'GET',
        })
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'EDIT_PATIENT',
                    payload: data
                })
            })
            .catch(error => {
                dispatch({
                    type: 'PATIENT_NOT_FOUND',
                    payload: 'There is no patient with ID ' + id
                });
            });
    }
};

export function findPatientByID(patientID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/patients/findbyid/${patientID}/?access_token=${access_token}`, {
            method: "GET",
        })
            .then((res) => { return res.json() })
            .then((data) => {
                if (data !== undefined || data !== "" || data !== null) {
                    dispatch({
                        type: "SEARCH_PATIENT_BY_ID",
                        payload: data
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: "PATIENT_NOT_FOUND",
                    payload: `There is no patient with ID ${patientID}`
                });
            });
    }
};

export function findPatientByDOB(dob) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/patients/findbydob/${dob}/?access_token=${access_token}`, {
            method: "GET",
        })
            .then((res) => { return res.json() })
            .then((data) => {
                if (data.length !== 0) {
                    dispatch({
                        type: "SEARCH_PATIENTS_BY_DOB",
                        payload: data
                    })
                } else {
                    dispatch({
                        type: "PATIENT_NOT_FOUND",
                        payload: `There is no patient with birthdate "${dob.substring(8, 10)}-${dob.substring(5, 7)}-${dob.substring(0, 4)}"`
                    });
                }
            })
    }
};


export function resetPatient() {
    return {
        type: "RESET_PATIENT"
    };
} 