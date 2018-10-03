export const prescriptionsPerVisit = (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL_PRESCRIPTIONS_BY_VISITLOG_ID':
            return action.payload;
        default:
            return state;
    }
}

export const savedPrescriptions = (state = [], action) => {
    switch (action.type) {
        case 'SAVE_PRESCRIPTIONS_STATE':
            return state.concat(action.payload);
        case 'RESET_PRESCRIPTIONS':
            state = [];
            return state;
        case 'GET_PRESCRIPTIONS_CURRENT_STATE':
            return state;
        default:
            return state;
    }
}


