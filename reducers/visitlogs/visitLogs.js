export const visitLogs = (state = [], action) => {
    switch (action.type) {
        case "FETCH_VISITLOGS":
            return action.payload;
        case "SEARCH_VISITLOG_BY_ID":
            return [].concat(action.payload);
        case "SEARCH_VISITLOG_BY_PATIENT_ID":
            return action.payload;
        case "SEARCH_VISITLOG_BY_DATE":
            return action.payload;
        default:
            return state
    }
}

export const visitLogID = (state = "", action) => {
    switch (action.type) {
        case "INITIALIZED_VISITLOG_ID":
            return action.payload;
        default:
            return state;
    }
}