export const drugSearchError = (state = "", action) => {
    switch (action.type) { 
        case "DRUG_NOT_FOUND": 
            return action.payload;

        default: 
            return "";
    }
}
