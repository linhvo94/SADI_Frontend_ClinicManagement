export function fetchVisitLogs() {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/?access_token=${access_token}`)
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'FETCH_VISITLOGS',
                    payload: data
                })
            })
    }
}

export function createNewVisitLogWithNewPatient(visitLog) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visitsByNewPatient/?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(visitLog)
        })
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: "INITIALIZED_VISITLOG_ID",
                    payload: data
                })
            })
    }
}

export function createNewVisitLogWithExistingPatient(visitLog) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visitsByCurrentPatient/?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(visitLog)
        })
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: "INITIALIZED_VISITLOG_ID",
                    payload: data
                })
            })
    }
}




export function findVisitLogByID(visitLogID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/findbyvisitid/${visitLogID}/?access_token=${access_token}`, {
            method: 'GET',
        })
            .then((res) => { return res.json() })
            .then((data) => {
                if (data !== undefined || data !== "" || data !== null) {
                    dispatch({
                        type: "SEARCH_VISITLOG_BY_ID",
                        payload: data
                    })
                } else {
                    dispatch({
                        type: "VISITLOG_NOT_FOUND",
                        payload: 'There is no visit log with ID ' + visitLogID
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: 'VISITLOG_NOT_FOUND',
                    payload: 'There is no visit log with ID ' + visitLogID
                });
            });
    }
};

export function findVisitLogByPatientID(patientID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/findbypatient/${patientID}/?access_token=${access_token}`, {
            method: 'GET',
        })
            .then((res) => { return res.json() })
            .then((data) => {
                if (data.length !== 0) {
                    dispatch({
                        type: "SEARCH_VISITLOG_BY_PATIENT_ID",
                        payload: data
                    })
                } else {
                    dispatch({
                        type: "VISITLOG_NOT_FOUND",
                        payload: 'There is no visit log with patient ID ' + patientID
                    });
                }
            })
    }
};

export function findVisitLogByDate(visitDate) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/findbydate/${visitDate}/?access_token=${access_token}`, {
            method: "GET",
        })
            .then((res) => { return res.json() })
            .then((data) => {
                if (data.length !== 0) {
                    dispatch({
                        type: "SEARCH_VISITLOG_BY_DATE",
                        payload: data
                    })
                } else {
                    dispatch({
                        type: "VISITLOG_NOT_FOUND",
                        payload: `There is no visit log on "${visitDate.substring(8, 10)}-${visitDate.substring(5, 7)}-${visitDate.substring(0, 4)}"`
                    });
                }
            })
    }
};


export function findVisitLogForForm(visitLogID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/findbyvisitid/${visitLogID}/?access_token=${access_token}`, {
            method: 'GET',
        })
            .then((res) => { return res.json() })
            .then((data) => {
                if (data !== undefined || data !== "" || data !== null) {
                    dispatch({
                        type: "SEARCH_VISITLOG_FORM_BY_ID",
                        payload: data
                    })
                } else {
                    dispatch({
                        type: "VISITLOG_NOT_FOUND",
                        payload: 'There is no visit log with ID ' + visitLogID
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: 'VISITLOG_NOT_FOUND',
                    payload: 'There is no visit log with ID ' + visitLogID
                });
            });
    }
};

export function findVisitLogForDetailPage(visitLogID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/findbyvisitid/${visitLogID}/?access_token=${access_token}`, {
            method: 'GET',
        })
            .then((res) => { return res.json() })
            .then((data) => {
                if (data !== undefined || data !== "" || data !== null) {
                    dispatch({
                        type: "SEARCH_VISITLOG_DETAIL_BY_ID",
                        payload: data
                    })
                } else {
                    dispatch({
                        type: "VISITLOG_NOT_FOUND",
                        payload: 'There is no visit log with ID ' + visitLogID
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: 'VISITLOG_NOT_FOUND',
                    payload: 'There is no visit log with ID ' + visitLogID
                });
            });
    }
};


