export function getAllProblemsPerVisit(visitLogID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/problems/findbyvisitID/${visitLogID}/?access_token=${access_token}`, {
            method: 'GET',
        })
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'GET_ALL_PROBLEMS_BY_VISITLOG_ID',
                    payload: data
                })
            });
    }
};

export function addProblemsForAVisit(problems, visitLogID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/addProblems/${visitLogID}/?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(problems)
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                dispatch(getAllProblemsPerVisit(visitLogID));
            })
    }
};

export function findEditProblemByID(problemID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/problems/findbyid/${problemID}/?access_token=${access_token}`, {
            method: 'GET',
        })
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'EDIT_PROBLEM',
                    payload: data
                })
            })
        // .catch(error => {
        //     dispatch({
        //         type: 'PROBLEM_NOT_FOUND',
        //         payload: 'There is no patient with ID ' + id
        //     });
        // });
    }
};


export function updateProblem(problem, visitLogID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/problems/${problem.id}/?access_token=${access_token}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(problem)
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                dispatch(getAllProblemsPerVisit(visitLogID))
            })
    }
};


export function deleteProblem(problemID, visitLogID) {
    var access_token = localStorage.getItem('access_token')
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/problems/${problemID}/?access_token=${access_token}`, {
            method: 'DELETE'
        })
            .then((res) => { return res.text() })
            .then((data) => {
                dispatch(getAllProblemsPerVisit(visitLogID))
            })
    }
};


export function resetProblem() {
    return {
        type: "RESET_PROBLEM"
    };
} 



