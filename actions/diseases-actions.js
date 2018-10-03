export function fetchDiseases() {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/diseases/?access_token=${access_token}`)
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'FETCH_DISEASES',
                    payload: data
                });
            });
    }
}

export function addDisease(disease) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/diseases/?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(disease)
        })
            .then((res) => { return res.text() })
            .then((data) => {
                dispatch(fetchDiseases())
            })
    }
};

export function deleteDisease(diseaseID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/diseases/${diseaseID}/?access_token=${access_token}`, {
            method: 'DELETE'
        })
            .then((res) => { return res.text() })
            .then((data) => {
                dispatch(fetchDiseases())
            })
    }
};

export function updateDisease(disease) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/diseases/${disease.id}/?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(disease)
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                dispatch(fetchDiseases())
            })
    }
};

export function findEditDiseaseByID(diseaseID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/diseases/findbyid/${diseaseID}/?access_token=${access_token}`, {
            method: 'GET',
        })
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'EDIT_DISEASE',
                    payload: data
                })
            })
            .catch(error => {
                dispatch({
                    type: 'DISEASE_NOT_FOUND',
                    payload: 'There is no disease with ID ' + id
                });
            });
    }
};

export function resetDisease() {
    return {
        type: "RESET_DISEASE"
    };
}


export function findDiseaseByICD(icd) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/diseases/findbyicd/${icd}/?access_token=${access_token}`, {
            method: 'GET',
        })
            .then((res) => { return res.json() })
            .then((data) => {
                if (data.length !== 0) {
                    dispatch({
                        type: 'SEARCH_DISEASE_BY_ICD',
                        payload: data
                    })
                } else {
                    dispatch({
                        type: 'DISEASE_NOT_FOUND',
                        payload: `There is no disease with ICD "${icd}"`
                    });
                }
            })
    }
};

export function findDiseaseByName(diseaseName) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/diseases/findbyname/${diseaseName}/?access_token=${access_token}`, {
            method: 'GET',
        })
            .then((res) => { return res.json() })
            .then((data) => {
                if (data.length !== 0) {
                    dispatch({
                        type: 'SEARCH_DISEASE_BY_NAME',
                        payload: data
                    })
                } else {
                    dispatch({
                        type: 'DISEASE_NOT_FOUND',
                        payload: `There is no disease with name "${diseaseName}"`
                    });
                }
            })
    }
}