export const editDisease = (state = "", action) => {
    switch (action.type) {
        case "RESET_DISEASE":
            return { icd: "", diseaseName: "", typeCode: "", typeName: ""};
        case "EDIT_DISEASE":
            return action.payload;
        default:
            return state;
    }
}