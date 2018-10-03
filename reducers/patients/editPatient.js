export const editPatient = (state = "", action) => {
    switch (action.type) {
        case "RESET_PATIENT":
            return { name: "", gender: "", dob: "", address: "" };
        case "EDIT_PATIENT":
            return action.payload;
        default:
            return state;
    }
}
