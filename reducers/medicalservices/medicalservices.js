export const medicalServices = (state = [], action) => {
    switch (action.type) {
        case "FETCH_MEDICAL_SERVICES":
            if(action.payload.length > 0 ) {
                return action.payload.sort((a, b) => parseInt(a.id) - parseInt(b.id)); 
            } else {
                return action.payload
            }
        case "SEARCH_MEDICAL_SERVICES_BY_ID":
            return [].concat(action.payload)
        case "SEARCH_MEDICAL_SERVICES_BY_NAME":
            return action.payload;
        default:
            return state;

    }
}

export const medicalServiceSearchError = (state = "", action) => {
    switch (action.type) { 
        case "MEDICAL_SERVICE_NOT_FOUND": 
            return action.payload;
        default: 
            return "";
    }
}