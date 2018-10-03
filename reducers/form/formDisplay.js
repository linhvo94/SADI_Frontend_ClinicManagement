var initialFormState = false;
var initialProblemFormState = false;
var initialLabTestFormState = false;
var initalDiseaseFormState = false;

export const formDisplay = (state = initialFormState, action) => {
    switch (action.type) {
        case "TOGGLE_FORM":
            return !(state);
        case "CLOSE_FORM":
            state = false;
            return state;
        case "EDIT_FORM":
            state = true;
            return state;
        default:
            return state;
    }
}

export const problemFormDisplay = (state = initialProblemFormState, action) => {
    switch (action.type) {
        case "TOGGLE_PROBLEM_FORM":
            return !(state);
        case "CLOSE_PROBLEM_FORM":
            state = false;
            return state;
        case "EDIT_PROBLEM_FORM":
            state = true;
            return state;
        default:
            return state;
    }
}

export const diseaseFormDisplay = (state = initalDiseaseFormState, action) => {
    switch (action.type) {
        case "TOGGLE_DISEASE_FORM":
            return !(state);
        case "CLOSE_DISEASE_FORM":
            state = false;
            return state;
        case "EDIT_DISEASE_FORM":
            state = true;
            return state;
        default:
            return state;
    }
}


export const labTestFormDisplay = (state = initialLabTestFormState, action) => {
    switch (action.type) {
        case "TOGGLE_LABTEST_FORM":
            return !(state);
        case "CLOSE_LABTEST_FORM":
            state = false;
            return state;
        case "EDIT_LABTEST_FORM":
            state = true;
            return state;
        default:
            return state;
    }
}


