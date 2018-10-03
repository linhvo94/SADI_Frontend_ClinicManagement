export function fetchMedicalServices() {
    return (dispatch) => {
        fetch('http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/medicalservices')
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: "FETCH_MEDICAL_SERVICES",
                    payload: data
                });
            });
    }
};

export function findMedicalServiceByName(medicalServiceName) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/medicalservices/findbyname/${medicalServiceName}/?access_token=${access_token}`, {
            method: 'GET'
        })
            .then((res) => { return res.json() })
            .then((data) => {
                if (data.length !== 0) {
                    dispatch({
                        type: 'SEARCH_MEDICAL_SERVICES_BY_NAME',
                        payload: data
                    })
                } else {
                    dispatch({
                        type: 'MEDICAL_SERVICE_NOT_FOUND',
                        payload: `There is no medical service with name "${medicalServiceName}"`
                    });
                }
            })
    }
};


export function findMedicalServiceByID(medicalServiceID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/medicalservices/findbyid/${medicalServiceID}/?access_token=${access_token}`, {
            method: 'GET'
        })
            .then((res) => { return res.json() })
            .then((data) => {
                if (data !== undefined || data !== "" || data !== null) {
                    dispatch({
                        type: 'SEARCH_MEDICAL_SERVICES_BY_ID',
                        payload: data
                    })
                } else {
                    dispatch({
                        type: 'SEARCH_MEDICAL_SERVICES_BY_ID',
                        payload: 'There is no medical service with ID ' + medicalServiceID
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: 'SEARCH_MEDICAL_SERVICES_BY_ID',
                    payload: 'There is no medical service with ID ' + medicalServiceID
                });
            });
    }
};



