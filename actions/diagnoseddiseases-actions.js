export function getAllDiagnosedDiseasesPerVisit(visitLogID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/diagnosedDiseases/findbyvisitID/${visitLogID}/?access_token=${access_token}`, {
            method: 'GET',
        })
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'GET_ALL_DIAGNOSEDDISEASES_BY_VISITLOG_ID',
                    payload: data
                })
            });
    }
};


export function addDiagnosedDiseasesForAVisit(diagnosedDiseases, visitLogID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/addDiagnosedDiseases/${visitLogID}/?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(diagnosedDiseases)
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                dispatch(getAllDiagnosedDiseasesPerVisit(visitLogID))
            })
    }
}

export function fetchDiagnosedDiseases() {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/diagnosedDiseases/?access_token=${access_token}`)
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'FETCH_DIAGNOSED_DISEASES',
                    payload: data
                });
            });
    }
}

