import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Root from './Root.jsx';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { patients } from './reducers/patients/patients.js';
import { editPatient } from './reducers/patients/editPatient.js';
import { searchAPatient, patientSearchError } from './reducers/patients/searchPatients.js';
import { visitLogs, visitLogID } from './reducers/visitlogs/visitLogs.js';
import { visitLogForm, visitLogSearchError, visitLogDetail } from './reducers/visitlogs/searchVisitLog.js';
import { diagnosedDiseasesPerVisit } from './reducers/diagnoseddiseases/diagnosedDiseases.js';
import { diseases } from './reducers/diseases/diseases.js';
import { diseaseSearchError } from './reducers/diseases/searchDisease.js';
import { editDisease } from './reducers/diseases/editDisease.js';
import { drugs } from './reducers/drugs/drugs.js';
import { editDrug } from './reducers/drugs/editDrug.js';
import { drugSearchError } from './reducers/drugs/searchDrug.js';
import { problemsPerVisit, editProblem } from './reducers/problems/problems.js';
import { prescriptionsPerVisit, savedPrescriptions } from './reducers/prescriptions/prescriptions.js';
import { medicalServices, medicalServiceSearchError } from './reducers/medicalservices/medicalservices.js';
import { labTestsPerVisit, savedLabTests, editLabMedical } from './reducers/labtests/labtests.js';

import { formDisplay, problemFormDisplay, labTestFormDisplay, diseaseFormDisplay } from './reducers/form/formDisplay.js';
import { authentication, authenticationFail } from './reducers/security/security.js'
import { loadState, saveState } from './localStorage.js';

//use localStorage to persist state after reset the page
const persistedState = loadState();

const store = createStore(
    combineReducers({
        patients, editPatient, searchAPatient, patientSearchError,
        visitLogs, visitLogForm, visitLogSearchError, visitLogID, visitLogDetail,
        diagnosedDiseasesPerVisit, 
        diseases, editDisease, diseaseSearchError,
        drugs, editDrug, drugSearchError,
        problemsPerVisit, editProblem,
        prescriptionsPerVisit, savedPrescriptions, 
        labTestsPerVisit, savedLabTests, editLabMedical,
        medicalServices, medicalServiceSearchError,
        formDisplay, problemFormDisplay, labTestFormDisplay, diseaseFormDisplay,

        authentication, authenticationFail
    }), persistedState, 
    applyMiddleware(thunk)
);

store.subscribe(() => {
     saveState({authentication: store.getState().authentication})
});

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>
    , document.getElementById('app')

)


