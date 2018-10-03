export const diseases = (state = [], action) => {
    switch (action.type) {
        case "FETCH_DISEASES":
            return action.payload;
        case "SEARCH_DISEASE_BY_ICD":
            return action.payload;
        case "SEARCH_DISEASE_BY_NAME":
            return action.payload;
        default:
            return state;
    }
}