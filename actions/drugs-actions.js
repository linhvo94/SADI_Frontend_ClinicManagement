export function fetchDrugs() {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/drugs/?access_token=${access_token}`)
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'FETCH_DRUGS',
                    payload: data
                });
            });
    }
}

export function addDrug(drug) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/drugs/?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(drug)
        })
            .then((res) => { return res.text() })
            .then((data) => {
                dispatch(fetchDrugs())
            })
    }
};

export function deleteDrug(drugID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/drugs/${drugID}/?access_token=${access_token}`, {
            method: 'DELETE'
        })
            .then((res) => { return res.text() })
            .then((data) => {
                dispatch(fetchDrugs())
            })
    }
};

export function updateDrug(drug) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/drugs/${drug.id}/?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(drug)
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                dispatch(fetchDrugs())
            })
    }
};

export function resetDrug() {
    return {
        type: "RESET_DRUG"
    };
}


export function findDrugByID(drugID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/drugs/findbyid/${drugID}/?access_token=${access_token}`, {
            method: 'GET',
        })
            .then((res) => { return res.json() })
            .then((data) => {
                if (data !== undefined || data !== "" || data !== null) {
                    dispatch({
                        type: 'SEARCH_DRUGS_BY_ID',
                        payload: data
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: 'DRUG_NOT_FOUND',
                    payload: 'There is no drug with ID ' + drugID
                });
            });
    }
};

export function findDrugByName(drugName) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/drugs/findbyname/${drugName}/?access_token=${access_token}`, {
            method: 'GET',
        })
            .then((res) => { return res.json() })
            .then((data) => {
                if (data.length !== 0) {
                    dispatch({
                        type: 'SEARCH_DRUGS_BY_NAME',
                        payload: data
                    })
                } else {
                    dispatch({
                        type: 'DRUG_NOT_FOUND',
                        payload: `There is no drug with name "${drugName}"`
                    });
                }
            })
    }
};

export function findEditDrugByID(drugID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/drugs/findbyid/${drugID}/?access_token=${access_token}`, {
            method: 'GET',
        })
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'EDIT_DRUG',
                    payload: data
                })
            })
            .catch(error => {
                dispatch({
                    type: 'DRUG_NOT_FOUND',
                    payload: 'There is no drug with ID ' + id
                });
            });
    }
};