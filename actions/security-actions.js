export function login(account) {
    console.log(account)
    return (dispatch) => {
        fetch(`http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/oauth/token?grant_type=password&username=${account.username}&password=${account.password}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Basic Y2xpZW50LWlkOnNlY3JldA=='
                },
                method: 'POST',
            })
            .then((res) => { return res.json() })
            .then((result) => {
                if (result.access_token != null) {
                    localStorage.setItem('access_token', result.access_token)
                    localStorage.setItem('userRole', result.userRole)
                    console.log("result,", result)

                    var userLoginInfo = {}
                    userLoginInfo["access_token"] = result.access_token;
                    userLoginInfo["userRole"] = result.userRole;
                    userLoginInfo["authenticated"] = true;
                    dispatch({
                        type: 'AUTHENTICATED',
                        payload: userLoginInfo
                    })
                } else {
                    dispatch({
                        type: "AUTHENTICATION_FAIL",
                        payload: "Wrong username/password. Please try again."
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: "SERVER_ERROR",
                    payload: "Remote server is not accessible."
                });
            });
    }
}


export function logout() {
    return {
        type: "LOGOUT"
    }
}

