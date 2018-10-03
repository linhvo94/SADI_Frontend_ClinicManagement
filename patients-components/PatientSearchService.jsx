import React from 'react';
import SearchBarForSearchPatientService from './SearchBarForSearchPatientService.jsx';
import PatientSearchResult from './PatientSearchResult.jsx';

export default class PatientSearchService extends React.Component {

    componentWillMount() {
        this.props.fetchPatients();
    }

    render() {
        return (
            <div>
                <div className="mb-10">
                    <SearchBarForSearchPatientService
                        fetchPatients={this.props.fetchPatients}
                        findPatientByName={this.props.findPatientByName}
                        findPatientByID={this.props.findPatientByID}
                        findPatientByDOB={this.props.findPatientByDOB}
                        patientSearchError={this.props.patientSearchError} />
                </div>

                <div>
                    <PatientSearchResult patients={this.props.patients} />
                </div>
            </div>
        )
    }
}