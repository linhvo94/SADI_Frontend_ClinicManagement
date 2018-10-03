export const drugs = (state = [], action) => {
    switch (action.type) {
        case "FETCH_DRUGS":
        if(action.payload.length > 0 ) {
            state = action.payload.sort((a, b) => parseInt(a.id) - parseInt(b.id)); 
        } else {
            state = action.payload
        }
        return state;
        case "SEARCH_DRUGS_BY_ID":
            return [].concat(action.payload)
        case "SEARCH_DRUGS_BY_NAME":
            return action.payload;
        default:
            return state;

    }
}