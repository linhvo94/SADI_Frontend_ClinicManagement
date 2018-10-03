export const problemsPerVisit = (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL_PROBLEMS_BY_VISITLOG_ID':
            if (action.payload.length > 0) {
                state = action.payload.sort((a, b) => parseInt(a.id) - parseInt(b.id));
            } else {
                state = action.payload
            }
            return state;
        default:
            return state;
    }
}

export const editProblem = (state = "", action) => {
    switch (action.type) {
        case "RESET_PROBLEM":
            return { problem: "" };

        case "EDIT_PROBLEM":
            return action.payload;

        default:
            return state;
    }
}