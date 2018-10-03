import React from "react";
import PatientForm from './PatientForm.jsx';
import PatientList from './PatientList.jsx';
import PatientAddButtonAndSearchBar from './PatientAddButtonAndSearchBar.jsx';


export default class PatientsControl extends React.Component {

    componentWillMount() {
        this.props.fetchPatients();
    }

    render() {
        return (
            <div className="row">
                <div className={this.props.formDisplay ? "col-md-5" : "col-md-1"} >
                    {this.props.formDisplay ?
                        <PatientForm
                            editPatient={this.props.editPatient}
                            addPatient={this.props.addPatient}
                            updatePatient={this.props.updatePatient}
                            resetPatient={this.props.resetPatient}
                            closeForm={this.props.closeForm} />
                        : null}

                </div>

                <div className={this.props.formDisplay ? "col-md-7" : "col-md-10"}>
                    <PatientAddButtonAndSearchBar
                        fetchPatients={this.props.fetchPatients}
                        toggleForm={this.props.toggleForm}
                        resetPatient={this.props.resetPatient}
                        findPatientByName={this.props.findPatientByName}
                        findPatientByID={this.props.findPatientByID}
                        findPatientByDOB={this.props.findPatientByDOB}
                        patientSearchError={this.props.patientSearchError} />

                    <PatientList
                        patients={this.props.patients}
                        deletePatient={this.props.deletePatient}
                        findEditPatientByID={this.props.findEditPatientByID}
                        openEditForm={this.props.openEditForm}
                        closeForm={this.props.closeForm} />
                </div>

            </div>
        )
    }

}