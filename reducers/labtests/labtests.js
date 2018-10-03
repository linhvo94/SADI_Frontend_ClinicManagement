export const labTestsPerVisit = (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL_LABTESTS_BY_VISITLOG_ID':
            return action.payload;
        default:
            return state;
    }
}


export const savedLabTests = (state = [], action) => {
    switch (action.type) {
        case 'SAVE_LABTESTS_STATE':
            return state.concat(action.payload);
        case 'GET_LABTESTS_CURRENT_STATE':
            return state;
        default:
            return state;
    }
}

export const editLabMedical = (state = "", action) => {
    switch (action.type) {
        case "EDIT_LABMEDICAL":
            return action.payload;

        default:
            return state;
    }
}