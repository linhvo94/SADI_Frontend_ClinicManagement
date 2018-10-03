// export const searchPatients = (state = [], action) => {
//     switch (action.type) {
//         case "SEARCH_PATIENTS_BY_NAME":
//             return action.payload;
//         case "SEARCH_PATIENTS_BY_DOB":
//             return action.payload;
//         case "SEARCH_PATIENT_BY_ID":
//             return [].concat(action.payload)
//         default:
//             return state;
//     }
// };

export const searchAPatient = (state = "", action) => {
    switch (action.type) {
        case "SEARCH_PATIENT_BY_ID":
            return action.payload;
        default:
            return state;
    }
};

export const patientSearchError = (state = "", action) => {
    switch (action.type) {
        case "PATIENT_NOT_FOUND":
            return action.payload;
        default:
            return "";
    }
}