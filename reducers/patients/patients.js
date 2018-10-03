export const patients = (state = [], action) => {
    switch (action.type) {
        case "FETCH_PATIENTS":
            if(action.payload.length > 0 ) {
                state = action.payload.sort((a, b) => parseInt(a.id) - parseInt(b.id)); 
            } else {
                state = action.payload
            }
            return state;
        case "SEARCH_PATIENT_BY_ID":
            return [].concat(action.payload)
        case "SEARCH_PATIENTS_BY_NAME":
            return action.payload;
        case "SEARCH_PATIENTS_BY_DOB":
            return action.payload;
        default:
            return state;
    }
}
