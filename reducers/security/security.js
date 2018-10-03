
export const authentication = (state = { authenticated: false, userRole: "", expires_in: null }, action) => {
    switch (action.type) {
        case 'AUTHENTICATED':
            return {
                authenticated: action.payload.authenticated,
                access_token: action.payload.access_token,
                userRole: action.payload.userRole,
                expires_in: action.payload.expires_in
            }
        case "LOGOUT":
            localStorage.removeItem("access_token");
            localStorage.removeItem("userRole");
            localStorage.removeItem("authenticated");
            localStorage.removeItem("authentication");

            return { authenticated: false, userRole: "", expires_in: null }

        default:
            return state;
    }
}


export const authenticationFail = (state = "", action) => {
    switch (action.type) {
        case 'AUTHENTICATION_FAIL':
            return action.payload;
        case 'SERVER_ERROR':
            return action.payload;
        default:
            return "";
    }
}