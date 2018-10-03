import React from 'react';
import { connect } from 'react-redux';
import './style/style-page.css';
import { BrowserRouter, Switch, Route, Link, browserHistory, Redirect } from 'react-router-dom';

//import components for External Users
import Header from './external-users-components/header-footer/Header.jsx';
import Footer from './external-users-components/header-footer/Footer.jsx';
import App from './external-users-components/home/App.jsx';
import AboutUs from './external-users-components/home/AboutUs.jsx';
import ServicePage from './external-users-components/home/ServicePage.jsx';
import LoginPage from './external-users-components/login/LoginPage.jsx';

//import components for Internal Users
import DoctorSideBar from './internal-users-components/sidebars/DoctorSideBar.jsx';
import NurseSideBar from './internal-users-components/sidebars/NurseSideBar.jsx';
import PatientSideBar from './internal-users-components/sidebars/PatientSideBar.jsx';
import AdminSideBar from './internal-users-components/sidebars/AdminSideBar.jsx';
import { DoctorDashboard } from './internal-users-components/dashboard/DoctorDashboard.jsx';
import { NurseDashboard } from './internal-users-components/dashboard/NurseDashboard.jsx';
import { AdminDashboard } from './internal-users-components/dashboard/AdminDashboard.jsx';
import { PatientDashboard } from './internal-users-components/dashboard/PatientDashboard.jsx';

//import Error Pages
import Error401 from './errors/Error401.jsx';

//import Patients Components
import PatientsControl from './patients-components/PatientsControl.jsx';
import PatientSearchService from './patients-components/PatientSearchService.jsx';


//import Visit Logs Components
import VisitLogsOptions from './visitlogs-components/VisitLogsOptions.jsx';
import GenerateVisitLogForm from './visitlogs-components/GenerateVisitLogForm.jsx';
import VisitLogSearch from './visitlogs-components/VisitLogSearch.jsx';
import VisitLogForm from './visitlogs-components/VisitLogForm.jsx';
import VisitLogSearchService from './visitlogs-components/VisitLogSearchService.jsx';
import VisitLogDetail from './visitlogs-components/VisitLogDetail.jsx';

//import Drugs Components
import DrugsControl from './drugs-components/DrugsControl.jsx';
import DrugSearchService from './drugs-components/DrugSearchService.jsx';

//import Diseases Components
import DiseasesControl from './diseases-components/DiseasesControl.jsx';
import DiseaseSearchService from './diseases-components/DiseaseSearchService.jsx';

//import security actions
import { login, logout } from './actions/security-actions.js';

//import patients actions
import {
    fetchPatients, addPatient, deletePatient, updatePatient, findEditPatientByID,
    findPatientByName, findPatientByID, findPatientByDOB, resetPatient
} from './actions/patients-actions.js';

//import visitlogs actions
import {
    fetchVisitLogs, createNewVisitLogWithNewPatient, createNewVisitLogWithExistingPatient,
    findVisitLogByID, findVisitLogByPatientID, findVisitLogByDate, findVisitLogForForm,
    findVisitLogForDetailPage
} from './actions/visitlogs-actions.js';

//import diseases actions
import {
    fetchDiseases, findDiseaseByICD, findDiseaseByName, addDisease, updateDisease,
    resetDisease, deleteDisease, findEditDiseaseByID
} from './actions/diseases-actions.js';

//import drugs actions
import {
    fetchDrugs, findDrugByID, findDrugByName, addDrug, updateDrug, resetDrug,
    deleteDrug, findEditDrugByID
} from './actions/drugs-actions.js';

//import problems actions
import {
    getAllProblemsPerVisit, addProblemsForAVisit, findEditProblemByID,
    updateProblem, deleteProblem, resetProblem
} from './actions/problems-actions.js';

//import diagnosed diseases actions
import {
    getAllDiagnosedDiseasesPerVisit, addDiagnosedDiseasesForAVisit
} from './actions/diagnoseddiseases-actions.js';

//import prescriptions actions
import {
    getAllPrescriptionsPerVisit, addPrescriptionsForAVisit, savePrescriptionsState,
    resetPrescription, getPrescription
} from './actions/prescriptions-actions.js';

import {
    getAllLabTestPerVisit, addLabTestsForAVisit, saveLabTestsState,
    getLabTest, findEditLabMedicalByID, updateLabMedical
} from './actions/labtests-actions.js';

//import medical services actions
import {
    fetchMedicalServices, findMedicalServiceByID, findMedicalServiceByName
} from './actions/medicalservices-actions.js';

//actions for form
import {
    toggleForm, closeForm, openEditForm, closeProblemForm,
    openProblemEditForm, closeLabTestForm, openLabTestEditForm,
    toggleDiseaseForm, openDiseaseEditForm, closeDiseaseForm
} from './actions/form-actions.js';

class Root extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" render={(props) =>
                        (props.location.pathname === "/" || props.location.pathname === "/home" ||
                            props.location.pathname === "/aboutus"
                            || props.location.pathname === "/services")
                        && <Header
                            authenticated={this.props.authentication.authenticated}
                            userRole={this.props.authentication.userRole}
                            logout={this.props.logout} />} />

                    <Route exact path="/" render={(props) => <App {...props} />} />
                    <Route exact path="/home" render={(props) => <App {...props} />} />
                    <Route exact path="/aboutus" render={() => <AboutUs />} />
                    <Route exact path="/services"
                        render={(props) => <ServicePage
                            {...props}
                            medicalServices={this.props.medicalServices}
                            fetchMedicalServices={this.props.fetchMedicalServices} />} />

                    <Route path="/" render={(props) =>
                        (props.location.pathname === "/" || props.location.pathname === "/home" || props.location.pathname === "/aboutus"
                            || props.location.pathname === "/services")
                        && <Footer />} />

                    <Route exact path="/login"
                        render={(props) => <LoginPage {...props}
                            authentication={this.props.authentication}
                            authenticationFail={this.props.authenticationFail}
                            login={this.props.login}
                            logout={this.props.logout} />} />

                    <div className="row">
                        <div className="col-md-2 col-sm-2 col-xs-12">
                            <Route path="/" render={(props) =>
                                ((props.location.pathname === "/admindashboard" ||
                                    props.location.pathname === "/patientscontrol" ||
                                    props.location.pathname === "/visitlogdetail" ||
                                    props.location.pathname.includes("/visitlogdetail") ||
                                    props.location.pathname === "/searchvisitlogservice" ||
                                    props.location.pathname === "/drugscontrol" ||
                                    props.location.pathname === "/diseasescontrol") &&
                                    this.props.authentication.authenticated &&
                                    this.props.authentication.userRole[0].authority == "ROLE_ADMIN")
                                && <AdminSideBar {...props} logout={this.props.logout} />} />

                            <Route path="/" render={(props) =>
                                ((props.location.pathname === "/doctordashboard" ||
                                    props.location.pathname === "/patientscontrol" ||
                                    props.location.pathname === "/searchpatientservice" ||
                                    props.location.pathname === "/visitlogcontrol" ||
                                    props.location.pathname === "/createnewvisitlog" ||
                                    props.location.pathname === "/fillinvisitlogform" ||
                                    props.location.pathname === "/visitlogform" ||
                                    props.location.pathname.includes("/visitlogform") ||
                                    props.location.pathname === "/searchvisitlogservice" ||
                                    props.location.pathname === "/visitlogdetail" ||
                                    props.location.pathname.includes("/visitlogdetail") ||
                                    props.location.pathname === "/searchdrugservice" ||
                                    props.location.pathname === "/searchdiseaseservice") &&
                                    this.props.authentication.authenticated &&
                                    this.props.authentication.userRole[0].authority == "ROLE_DOCTOR")
                                && <DoctorSideBar {...props} logout={this.props.logout} />} />

                            <Route path="/" render={(props) =>
                                ((props.location.pathname === "/nursedashboard" ||
                                    props.location.pathname === "/patientscontrol" ||
                                    props.location.pathname === "/searchpatientservice" ||
                                    props.location.pathname === "/visitlogcontrol" ||
                                    props.location.pathname === "/createnewvisitlog" ||
                                    props.location.pathname === "/fillinvisitlogform" ||
                                    props.location.pathname === "/visitlogform" ||
                                    props.location.pathname.includes("/visitlogform") ||
                                    props.location.pathname === "/searchvisitlogservice" ||
                                    props.location.pathname === "/visitlogdetail" ||
                                    props.location.pathname.includes("/visitlogdetail") ||
                                    props.location.pathname === "/searchdrugservice" ||
                                    props.location.pathname === "/searchdiseaseservice") &&
                                    this.props.authentication.authenticated &&
                                    this.props.authentication.userRole[0].authority == "ROLE_NURSE")
                                && <NurseSideBar {...props} logout={this.props.logout} />} />

                            <Route path="/" render={(props) =>
                                ((props.location.pathname === "/patientdashboard" ||
                                    props.location.pathname === "/patientdashboard" ||
                                    props.location.pathname === "/visitlogform/:id" ||
                                    props.location.pathname === "/searchvisitlogservice" ||
                                    props.location.pathname === "/visitlogdetail" ||
                                    props.location.pathname === "/visitlogdetail/:id" ||
                                    props.location.pathname === "/drugscontrol" ||
                                    props.location.pathname === "/searchdrugservice" ||
                                    props.location.pathname === "/diseasescontrol" ||
                                    props.location.pathname === "/searchdiseaseservice") &&
                                    this.props.authentication.authenticated &&
                                    this.props.authentication.userRole[0].authority == "ROLE_PATIENT")
                                && <PatientSideBar {...props} logout={this.props.logout} />} />
                        </div>
                        <div className="col-md-10 col-sm-10 col-xs-12 mt-10">

                            <Route exact path="/doctordashboard"
                                render={(props) => !this.props.authentication.authenticated ?
                                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                    : (this.props.authentication.userRole[0].authority !== "ROLE_DOCTOR") ?
                                        <Redirect to="/error401" />
                                        :
                                        <DoctorDashboard />} />

                            <Route exact path="/nursedashboard"
                                render={(props) => !this.props.authentication.authenticated ?
                                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                    : (this.props.authentication.userRole[0].authority !== "ROLE_NURSE") ?
                                        <Redirect to="/error401" />
                                        :
                                        <NurseDashboard />} />

                            <Route exact path="/admindashboard"
                                render={(props) => !this.props.authentication.authenticated ?
                                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                    : (this.props.authentication.userRole[0].authority !== "ROLE_ADMIN") ?
                                        <Redirect to="/error401" />
                                        :
                                        <AdminDashboard />} />

                            <Route exact path="/patientdashboard"
                                render={(props) => !this.props.authentication.authenticated ?
                                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                    : (this.props.authentication.userRole[0].authority !== "ROLE_PATIENT") ?
                                        <Redirect to="/error401" />
                                        :
                                        <PatientDashboard />} />


                            <Route exact path="/patientscontrol"
                                render={(props) =>
                                    !this.props.authentication.authenticated ?
                                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                        : (this.props.authentication.userRole[0].authority !== "ROLE_ADMIN" &&
                                            this.props.authentication.userRole[0].authority !== "ROLE_DOCTOR" &&
                                            this.props.authentication.userRole[0].authority !== "ROLE_NURSE") ?
                                            <Redirect to="/error401" />
                                            :
                                            <PatientsControl
                                                patients={this.props.patients}
                                                editPatient={this.props.editPatient}
                                                patientSearchError={this.props.patientSearchError}
                                                formDisplay={this.props.formDisplay}

                                                fetchPatients={this.props.fetchPatients}
                                                addPatient={this.props.addPatient}
                                                updatePatient={this.props.updatePatient}
                                                resetPatient={this.props.resetPatient}
                                                deletePatient={this.props.deletePatient}

                                                findPatientByName={this.props.findPatientByName}
                                                findPatientByID={this.props.findPatientByID}
                                                findEditPatientByID={this.props.findEditPatientByID}
                                                findPatientByDOB={this.props.findPatientByDOB}

                                                toggleForm={this.props.toggleForm}
                                                closeForm={this.props.closeForm}
                                                openEditForm={this.props.openEditForm} />

                                } />

                            <Route exact path="/searchpatientservice"
                                render={(props) =>
                                    !this.props.authentication.authenticated ?
                                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                        : (this.props.authentication.userRole[0].authority !== "ROLE_ADMIN" &&
                                            this.props.authentication.userRole[0].authority !== "ROLE_DOCTOR" &&
                                            this.props.authentication.userRole[0].authority !== "ROLE_NURSE") ?

                                            <Redirect to="/error401" />
                                            :
                                            <PatientSearchService
                                                patients={this.props.patients}
                                                patientSearchError={this.props.patientSearchError}

                                                fetchPatients={this.props.fetchPatients}

                                                findPatientByName={this.props.findPatientByName}
                                                findPatientByID={this.props.findPatientByID}
                                                findPatientByDOB={this.props.findPatientByDOB} />} />

                            <Route exact path="/visitlogcontrol"
                                render={(props) => !this.props.authentication.authenticated ?
                                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                    : (this.props.authentication.userRole[0].authority !== "ROLE_ADMIN" &&
                                        this.props.authentication.userRole[0].authority !== "ROLE_DOCTOR" &&
                                        this.props.authentication.userRole[0].authority !== "ROLE_NURSE") ?
                                        <Redirect to="/error401" />
                                        :
                                        <VisitLogsOptions />} />

                            <Route exact path="/createnewvisitlog"
                                render={(props) =>
                                    !this.props.authentication.authenticated ?
                                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                        : (this.props.authentication.userRole[0].authority !== "ROLE_DOCTOR" &&
                                            this.props.authentication.userRole[0].authority !== "ROLE_NURSE") ?

                                            <Redirect to="/error401" />

                                            :
                                            <GenerateVisitLogForm
                                                {...props}
                                                visitLogID={this.props.visitLogID}
                                                searchAPatient={this.props.searchAPatient}
                                                findPatientByID={this.props.findPatientByID}
                                                patientSearchError={this.props.patientSearchError}
                                                createNewVisitLogWithNewPatient={this.props.createNewVisitLogWithNewPatient}
                                                createNewVisitLogWithExistingPatient={this.props.createNewVisitLogWithExistingPatient} />} />

                            <Route exact path="/fillinvisitlogform"
                                render={(props) =>
                                    !this.props.authentication.authenticated ?
                                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                        : (this.props.authentication.userRole[0].authority !== "ROLE_DOCTOR" &&
                                            this.props.authentication.userRole[0].authority !== "ROLE_NURSE") ?

                                            <Redirect to="/error401" />
                                            :
                                            <VisitLogSearch
                                                {...props}
                                                visitLogSearchError={this.props.visitLogSearchError}
                                                visitLogForm={this.props.visitLogForm}
                                                findVisitLogForForm={this.props.findVisitLogForForm} />} />

                            <Route exact path="/visitlogform" render={(props) =>
                                !this.props.authentication.authenticated ?
                                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                    : (this.props.authentication.userRole[0].authority !== "ROLE_DOCTOR" &&
                                        this.props.authentication.userRole[0].authority !== "ROLE_NURSE") ?

                                        <Redirect to="/error401" />

                                        :
                                        <VisitLogsOptions />} />

                            <Route exact path="/visitlogform/:id"
                                render={(props) =>
                                    !this.props.authentication.authenticated ?
                                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                        : (this.props.authentication.userRole[0].authority !== "ROLE_DOCTOR" &&
                                            this.props.authentication.userRole[0].authority !== "ROLE_NURSE") ?

                                            <Redirect to="/error401" />

                                            :
                                            <VisitLogForm
                                                {...props}
                                                visitLogForm={this.props.visitLogForm}
                                                visitLogID={props.match.params.id}
                                                findVisitLogForForm={this.props.findVisitLogForForm}

                                                addProblemsForAVisit={this.props.addProblemsForAVisit}
                                                getAllProblemsPerVisit={this.props.getAllProblemsPerVisit}
                                                problemsPerVisit={this.props.problemsPerVisit}
                                                editProblem={this.props.editProblem}
                                                findEditProblemByID={this.props.findEditProblemByID}
                                                updateProblem={this.props.updateProblem}
                                                deleteProblem={this.props.deleteProblem}
                                                resetProblem={this.props.resetProblem}

                                                fetchDiseases={this.props.fetchDiseases}
                                                addDiagnosedDiseasesForAVisit={this.props.addDiagnosedDiseasesForAVisit}
                                                getAllDiagnosedDiseasesPerVisit={this.props.getAllDiagnosedDiseasesPerVisit}
                                                diagnosedDiseasesPerVisit={this.props.diagnosedDiseasesPerVisit}
                                                diseaseSearchError={this.props.diseaseSearchError}
                                                findDiseaseByICD={this.props.findDiseaseByICD}
                                                findDiseaseByName={this.props.findDiseaseByName}
                                                diseases={this.props.diseases}

                                                fetchDrugs={this.props.fetchDrugs}
                                                drugSearchError={this.props.drugSearchError}
                                                drugs={this.props.drugs}
                                                findDrugByID={this.props.findDrugByID}
                                                findDrugByName={this.props.findDrugByName}

                                                prescriptionsPerVisit={this.props.prescriptionsPerVisit}
                                                addPrescriptionsForAVisit={this.props.addPrescriptionsForAVisit}
                                                getAllPrescriptionsPerVisit={this.props.getAllPrescriptionsPerVisit}
                                                savedPrescriptions={this.props.savedPrescriptions}
                                                savePrescriptionsState={this.props.savePrescriptionsState}
                                                resetPrescription={this.props.resetPrescription}
                                                getPrescription={this.props.getPrescription}

                                                labTestsPerVisit={this.props.labTestsPerVisit}
                                                addLabTestsForAVisit={this.props.addLabTestsForAVisit}
                                                savedLabTests={this.props.savedLabTests}
                                                getAllLabTestPerVisit={this.props.getAllLabTestPerVisit}
                                                saveLabTestsState={this.props.saveLabTestsState}
                                                getLabTest={this.props.getLabTest}
                                                editLabMedical={this.props.editLabMedical}
                                                findEditLabMedicalByID={this.props.findEditLabMedicalByID}
                                                updateLabMedical={this.props.updateLabMedical}


                                                medicalServices={this.props.medicalServices}
                                                medicalServiceSearchError={this.props.medicalServiceSearchError}

                                                fetchMedicalServices={this.props.fetchMedicalServices}
                                                findMedicalServiceByID={this.props.findMedicalServiceByID}
                                                findMedicalServiceByName={this.props.findMedicalServiceByName}

                                                problemFormDisplay={this.props.problemFormDisplay}
                                                closeProblemForm={this.props.closeProblemForm}
                                                openProblemEditForm={this.props.openProblemEditForm}

                                                labTestFormDisplay={this.props.labTestFormDisplay}
                                                closeLabTestForm={this.props.closeLabTestForm}
                                                openLabTestEditForm={this.props.openLabTestEditForm} />} />

                            <Route exact path="/searchvisitlogservice"
                                render={(props) =>
                                    !this.props.authentication.authenticated ?
                                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                        : (this.props.authentication.userRole[0].authority !== "ROLE_ADMIN" &&
                                            this.props.authentication.userRole[0].authority !== "ROLE_DOCTOR" &&
                                            this.props.authentication.userRole[0].authority !== "ROLE_NURSE") ?
                                            <Redirect to="/error401" />
                                            :

                                            <VisitLogSearchService {...props}
                                                visitLogs={this.props.visitLogs}
                                                fetchVisitLogs={this.props.fetchVisitLogs}
                                                visitLogSearchError={this.props.visitLogSearchError}
                                                findVisitLogByPatientID={this.props.findVisitLogByPatientID}
                                                findVisitLogByID={this.props.findVisitLogByID}
                                                findVisitLogByDate={this.props.findVisitLogByDate} />} />

                            <Route exact path="/visitlogdetail"
                                render={(props) =>
                                    !this.props.authentication.authenticated ?
                                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                        : (this.props.authentication.userRole[0].authority !== "ROLE_ADMIN" &&
                                            this.props.authentication.userRole[0].authority !== "ROLE_DOCTOR" &&
                                            this.props.authentication.userRole[0].authority !== "ROLE_NURSE") ?
                                            <Redirect to="/error401" />
                                            :
                                            <VisitLogSearchService {...props}
                                                visitLogs={this.props.visitLogs}
                                                fetchVisitLogs={this.props.fetchVisitLogs}
                                                visitLogSearchError={this.props.visitLogSearchError}
                                                findVisitLogByPatientID={this.props.findVisitLogByPatientID}
                                                findVisitLogByID={this.props.findVisitLogByID}
                                                findVisitLogByDate={this.props.findVisitLogByDate} />} />

                            <Route exact path="/visitlogdetail/:id"
                                render={(props) =>
                                    !this.props.authentication.authenticated ?
                                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                        : (this.props.authentication.userRole[0].authority !== "ROLE_ADMIN" &&
                                            this.props.authentication.userRole[0].authority !== "ROLE_DOCTOR" &&
                                            this.props.authentication.userRole[0].authority !== "ROLE_NURSE") ?
                                            <Redirect to="/error401" />
                                            :
                                            <VisitLogDetail {...props}
                                                visitLogID={props.match.params.id}
                                                visitLogDetail={this.props.visitLogDetail}
                                                findVisitLogForDetailPage={this.props.findVisitLogForDetailPage} />} />

                            <Route exact path="/drugscontrol"
                                render={(props) =>
                                    !this.props.authentication.authenticated ?
                                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                        : this.props.authentication.userRole[0].authority !== "ROLE_ADMIN" ?
                                            <Redirect to="/error401" />
                                            :
                                            <DrugsControl
                                                drugs={this.props.drugs}
                                                editDrug={this.props.editDrug}
                                                drugSearchError={this.props.drugSearchError}
                                                formDisplay={this.props.formDisplay}

                                                fetchDrugs={this.props.fetchDrugs}
                                                addDrug={this.props.addDrug}
                                                updateDrug={this.props.updateDrug}
                                                resetDrug={this.props.resetDrug}
                                                deleteDrug={this.props.deleteDrug}

                                                findDrugByName={this.props.findDrugByName}
                                                findDrugByID={this.props.findDrugByID}
                                                findEditDrugByID={this.props.findEditDrugByID}

                                                toggleForm={this.props.toggleForm}
                                                closeForm={this.props.closeForm}
                                                openEditForm={this.props.openEditForm} />} />

                            <Route exact path="/searchdrugservice"
                                render={(props) =>
                                    !this.props.authentication.authenticated ?
                                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                        : (this.props.authentication.userRole[0].authority !== "ROLE_ADMIN" &&
                                            this.props.authentication.userRole[0].authority !== "ROLE_DOCTOR" &&
                                            this.props.authentication.userRole[0].authority !== "ROLE_NURSE") ?
                                            <Redirect to="/error401" />
                                            :
                                            <DrugSearchService
                                                drugs={this.props.drugs}
                                                drugSearchError={this.props.drugSearchError}
                                                fetchDrugs={this.props.fetchDrugs}
                                                findDrugByName={this.props.findDrugByName}
                                                findDrugByID={this.props.findDrugByID} />} />

                            <Route exact path="/diseasescontrol"
                                render={(props) =>
                                    !this.props.authentication.authenticated ?
                                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                        : this.props.authentication.userRole[0].authority !== "ROLE_ADMIN" ?
                                            <Redirect to="/error401" />
                                            :
                                            <DiseasesControl
                                                diseases={this.props.diseases}
                                                editDisease={this.props.editDisease}
                                                diseaseSearchError={this.props.diseaseSearchError}
                                                diseaseFormDisplay={this.props.diseaseFormDisplay}

                                                fetchDiseases={this.props.fetchDiseases}
                                                addDisease={this.props.addDisease}
                                                updateDisease={this.props.updateDisease}
                                                resetDisease={this.props.resetDisease}
                                                deleteDisease={this.props.deleteDisease}

                                                findDiseaseByName={this.props.findDiseaseByName}
                                                findDiseaseByICD={this.props.findDiseaseByICD}
                                                findEditDiseaseByID={this.props.findEditDiseaseByID}

                                                toggleDiseaseForm={this.props.toggleDiseaseForm}
                                                closeDiseaseForm={this.props.closeDiseaseForm}
                                                openDiseaseEditForm={this.props.openDiseaseEditForm} />} />

                            <Route exact path="/searchdiseaseservice"
                                render={(props) =>
                                    !this.props.authentication.authenticated ?
                                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                        : (this.props.authentication.userRole[0].authority !== "ROLE_ADMIN" &&
                                            this.props.authentication.userRole[0].authority !== "ROLE_DOCTOR" &&
                                            this.props.authentication.userRole[0].authority !== "ROLE_NURSE") ?
                                            <Redirect to="/error401" />
                                            :
                                            <DiseaseSearchService
                                                diseases={this.props.diseases}
                                                diseaseSearchError={this.props.diseaseSearchError}
                                                fetchDiseases={this.props.fetchDiseases}
                                                findDiseaseByName={this.props.findDiseaseByName}
                                                findDiseaseByICD={this.props.findDiseaseByICD} />} />
                            <Route exact path="/error401" render={(props) => <Error401 {...props} />} />
                        </div>
                    </div>


                </div>

            </BrowserRouter>
        )
    }

};

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication,
        authenticationFail: state.authenticationFail,

        patients: state.patients,
        editPatient: state.editPatient,
        searchAPatient: state.searchAPatient,
        patientSearchError: state.patientSearchError,

        visitLogs: state.visitLogs,
        visitLogForm: state.visitLogForm,
        visitLogDetail: state.visitLogDetail,
        visitLogSearchError: state.visitLogSearchError,
        visitLogID: state.visitLogID,

        diagnosedDiseasesPerVisit: state.diagnosedDiseasesPerVisit,
        diseases: state.diseases,
        editDisease: state.editDisease,
        diseaseSearchError: state.diseaseSearchError,

        drugs: state.drugs,
        editDrug: state.editDrug,
        drugSearchError: state.drugSearchError,

        problemsPerVisit: state.problemsPerVisit,
        editProblem: state.editProblem,

        prescriptionsPerVisit: state.prescriptionsPerVisit,
        savedPrescriptions: state.savedPrescriptions,

        medicalServices: state.medicalServices,
        medicalServiceSearchError: state.medicalServiceSearchError,

        labTestsPerVisit: state.labTestsPerVisit,
        savedLabTests: state.savedLabTests,
        editLabMedical: state.editLabMedical,

        formDisplay: state.formDisplay,
        problemFormDisplay: state.problemFormDisplay,
        labTestFormDisplay: state.labTestFormDisplay,
        diseaseFormDisplay: state.diseaseFormDisplay
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        login: (account) => { dispatch(login(account)) },
        logout: () => { dispatch(logout()) },

        fetchPatients: () => { dispatch(fetchPatients()) },
        addPatient: (patient) => { dispatch(addPatient(patient)) },
        findPatientByName: (patientName) => { dispatch(findPatientByName(patientName)) },
        findPatientByID: (patientID) => { dispatch(findPatientByID(patientID)) },
        findEditPatientByID: (patientID) => { dispatch(findEditPatientByID(patientID)) },
        findPatientByDOB: (dob) => { dispatch(findPatientByDOB(dob)) },
        updatePatient: (patient) => { dispatch(updatePatient(patient)) },
        resetPatient: () => { dispatch(resetPatient()) },
        deletePatient: (patientID) => {
            if (confirm(`Do you really want to delete patient with ID ${patientID}?`)) {
                dispatch(deletePatient(patientID));
            }
        },

        fetchVisitLogs: () => { dispatch(fetchVisitLogs()) },
        createNewVisitLogWithNewPatient: (visitLog) => { dispatch(createNewVisitLogWithNewPatient(visitLog)) },
        createNewVisitLogWithExistingPatient: (visitLog) => { dispatch(createNewVisitLogWithExistingPatient(visitLog)) },
        findVisitLogByID: (visitLogID) => { dispatch(findVisitLogByID(visitLogID)) },
        findVisitLogByPatientID: (patientID) => { dispatch(findVisitLogByPatientID(patientID)) },
        findVisitLogByDate: (visitDate) => { dispatch(findVisitLogByDate(visitDate)) },
        addProblemsForAVisit: (problems, visitLogID) => { dispatch(addProblemsForAVisit(problems, visitLogID)) },
        findVisitLogForForm: (visitLogID) => { dispatch(findVisitLogForForm(visitLogID)) },
        findVisitLogForDetailPage: (visitLogID) => { dispatch(findVisitLogForDetailPage(visitLogID)) },
        addDiagnosedDiseasesForAVisit: (diagnosedDiseases, visitID) => { dispatch(addDiagnosedDiseasesForAVisit(diagnosedDiseases, visitID)) },
        addPrescriptionsForAVisit: (prescriptions, visitLogID) => { dispatch(addPrescriptionsForAVisit(prescriptions, visitLogID)) },
        addLabTestsForAVisit: (labTests, visitLogID) => { dispatch(addLabTestsForAVisit(labTests, visitLogID)) },

        fetchDiseases: () => { dispatch(fetchDiseases()) },
        findDiseaseByICD: (icd) => { dispatch(findDiseaseByICD(icd)) },
        findDiseaseByName: (diseaseName) => { dispatch(findDiseaseByName(diseaseName)) },
        findEditDiseaseByID: (diseaseID) => { dispatch(findEditDiseaseByID(diseaseID)) },
        addDisease: (disease) => { dispatch(addDisease(disease)) },
        updateDisease: (disease) => { dispatch(updateDisease(disease)) },
        resetDisease: () => { dispatch(resetDisease()) },
        deleteDisease: (diseaseID) => {
            if (confirm(`Do you really want to delete disease with ID ${diseaseID}?`)) {
                dispatch(deleteDisease(diseaseID));
            }
        },

        fetchDrugs: () => { dispatch(fetchDrugs()) },
        findDrugByID: (id) => { dispatch(findDrugByID(id)) },
        findDrugByName: (drugName) => { dispatch(findDrugByName(drugName)) },
        findEditDrugByID: (drugID) => { dispatch(findEditDrugByID(drugID)) },
        addDrug: (drug) => { dispatch(addDrug(drug)) },
        updateDrug: (drug) => { dispatch(updateDrug(drug)) },
        resetDrug: () => { dispatch(resetDrug()) },
        deleteDrug: (drugID) => {
            if (confirm(`Do you really want to delete drug with ID ${drugID}?`)) {
                dispatch(deleteDrug(drugID));
            }
        },

        getAllProblemsPerVisit: (visitLogID) => { dispatch(getAllProblemsPerVisit(visitLogID)) },
        findEditProblemByID: (problemID) => { dispatch(findEditProblemByID(problemID)) },
        updateProblem: (problem, visitLogID) => { dispatch(updateProblem(problem, visitLogID)) },
        resetProblem: () => { dispatch(resetProblem()) },
        deleteProblem: (problemID, visitLogID) => {
            if (confirm(`Do you really want to delete problem with ID ${problemID}?`)) {
                dispatch(deleteProblem(problemID, visitLogID));
            }
        },

        getAllDiagnosedDiseasesPerVisit: (visitLogID) => { dispatch(getAllDiagnosedDiseasesPerVisit(visitLogID)) },

        getAllPrescriptionsPerVisit: (visitLogID) => { dispatch(getAllPrescriptionsPerVisit(visitLogID)) },
        savePrescriptionsState: (prescription) => { dispatch(savePrescriptionsState(prescription)) },
        getPrescription: () => { dispatch(getPrescription()) },
        resetPrescription: () => { dispatch(resetPrescription()) },


        getAllLabTestPerVisit: (visitLogID) => { dispatch(getAllLabTestPerVisit(visitLogID)) },
        saveLabTestsState: (labTest) => { dispatch(saveLabTestsState(labTest)) },
        getLabTest: () => { dispatch(getLabTest()) },

        findEditLabMedicalByID: (labMedicalID) => { dispatch(findEditLabMedicalByID(labMedicalID)) },
        updateLabMedical: (labMedical, visitLogID) => { dispatch(updateLabMedical(labMedical, visitLogID)) },

        fetchMedicalServices: () => { dispatch(fetchMedicalServices()) },
        findMedicalServiceByID: (medicalServiceID) => { dispatch(findMedicalServiceByID(medicalServiceID)) },
        findMedicalServiceByName: (medicalServiceName) => { dispatch(findMedicalServiceByName(medicalServiceName)) },


        toggleForm: () => { dispatch(toggleForm()); },
        closeForm: () => { dispatch(closeForm()); },
        openEditForm: () => { dispatch(openEditForm()); },

        closeProblemForm: () => { dispatch(closeProblemForm()); },
        openProblemEditForm: () => { dispatch(openProblemEditForm()); },

        closeLabTestForm: () => { dispatch(closeLabTestForm()); },
        openLabTestEditForm: () => { dispatch(openLabTestEditForm()); },

        toggleDiseaseForm: () => { dispatch(toggleDiseaseForm()); },
        closeDiseaseForm: () => { dispatch(closeDiseaseForm()); },
        openDiseaseEditForm: () => { dispatch(openDiseaseEditForm()); },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);