export const editDrug = (state = "", action) => {
    switch (action.type) {
        case "RESET_DRUG":
            return { drugName: ""};
        case "EDIT_DRUG":
            return action.payload;
        default:
            return state;
    }
}