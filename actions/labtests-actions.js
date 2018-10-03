export function getAllLabTestPerVisit(visitLogID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/labtests/findbyvisitID/${visitLogID}/?access_token=${access_token}`, {
            method: 'GET',
        })
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'GET_ALL_LABTESTS_BY_VISITLOG_ID',
                    payload: data
                })
            });
    }
};


export function addLabTestsForAVisit(labTests, visitLogID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/addLabTests/${visitLogID}/?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(labTests)
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                dispatch(getAllLabTestPerVisit(visitLogID))
            })
    }
}

export function saveLabTestsState(labTest) {
    return {
        type: 'SAVE_LABTESTS_STATE',
        payload: labTest
    };
};


export function resetLabTest() {
    return {
        type: 'RESET_LABTEST'
    };
};

export function getLabTest() {
    return {
        type: 'GET_LABTESTS_CURRENT_STATE'
    };
};


export function findEditLabMedicalByID(labMedicalID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/labmedicals/findbyid/${labMedicalID}/?access_token=${access_token}`, {
            method: 'GET',
        })
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'EDIT_LABMEDICAL',
                    payload: data
                })
            })
    }
};


export function updateLabMedical(labMedical, visitLogID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/labmedicals/${labMedical.id}/?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(labMedical)
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                dispatch(getAllLabTestPerVisit(visitLogID))
            })
    }
};

