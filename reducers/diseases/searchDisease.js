export const diseaseSearchError = (state = "", action) => {
    switch (action.type) { 
        case "DISEASE_NOT_FOUND": 
            return action.payload;

        default: 
            return "";
    }
}