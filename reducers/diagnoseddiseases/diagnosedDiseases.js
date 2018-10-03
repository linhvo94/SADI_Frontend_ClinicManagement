export const diagnosedDiseasesPerVisit = (state = [], action) => {
    switch (action.type) {
        case "GET_ALL_DIAGNOSEDDISEASES_BY_VISITLOG_ID":
            state = action.payload;
            return state;
        default: 
            return state;

    }
}