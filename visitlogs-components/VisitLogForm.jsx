import React from 'react';
import ProblemForm from './problems-components/ProblemForm.jsx';
import ProblemEditForm from './problems-components/ProblemEditForm.jsx';
import DiagnosedDiseasesForm from './diagnoseddiseases-components/DiagnosedDiseasesForm.jsx';
import PrescriptionsForm from './prescriptions-components/PrescriptionsForm.jsx';
import LabTestForm from './labtests-components/LabTestForm.jsx';
import LabTestEditForm from './labtests-components/LabTestEditForm.jsx';


export default class VisitLogForm extends React.Component {
    componentWillMount() {
        if (this.props.visitLogID !== "") {
            this.props.findVisitLogForForm(this.props.visitLogID);
        }
        $('#Problems a:first').tab('show')
    }

    componentWillReceiveProps(props) {
        if (props.visitLogForm === "") {
            this.props.history.push("/visitlogform/")
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.visitLogForm !== this.props.visitLogForm) {
            this.props.getAllProblemsPerVisit(this.props.visitLogID)
        }
    }

    render() {
        return (
            <div>
                {this.props.visitLogForm !== "" ?
                    <div className="mt-30">
                        <ul className="nav nav-tabs justify-content-center mb-30" role="tablist">
                            <li className="nav-item mr-3"><a className="nav-link active" href="#Problems" data-toggle="tab" role="tab">Problems</a></li>
                            <li className="nav-item mr-3"><a className="nav-link" href="#DiagnosedDiseases" data-toggle="tab" role="tab">Diagnosed Diseases</a></li>
                            <li className="nav-item mr-3"><a className="nav-link" href="#LabTests" data-toggle="tab" role="tab">Lab Tests</a></li>
                            <li className="nav-item mr-3"><a className="nav-link" href="#Prescriptions" data-toggle="tab" role="tab">Prescriptions</a></li>
                        </ul>

                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane active" id="Problems">
                                <div>
                                    <div className="row">
                                        <div className={this.props.problemFormDisplay ? "col-md-5" : "col-md-1"} >
                                            {this.props.problemFormDisplay ?
                                                <ProblemEditForm
                                                    editProblem={this.props.editProblem}
                                                    updateProblem={this.props.updateProblem}
                                                    visitLogID={this.props.visitLogID}
                                                    resetProblem={this.props.resetProblem}
                                                    closeProblemForm={this.props.closeProblemForm} />
                                                : null}
                                        </div>

                                        <div className={this.props.problemFormDisplay ? "col-md-7" : "col-md-10"}>
                                            <ProblemForm
                                                addProblemsForAVisit={this.props.addProblemsForAVisit}
                                                visitLogID={this.props.visitLogID}
                                                problemsPerVisit={this.props.problemsPerVisit}
                                                findEditProblemByID={this.props.findEditProblemByID}
                                                deleteProblem={this.props.deleteProblem}
                                                openProblemEditForm={this.props.openProblemEditForm}
                                                closeProblemForm={this.props.closeProblemForm} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div role="tabpanel" className="tab-pane fade in" id="DiagnosedDiseases">
                                <DiagnosedDiseasesForm
                                    visitLogID={this.props.visitLogID}
                                    fetchDiseases={this.props.fetchDiseases}
                                    findDiseaseByICD={this.props.findDiseaseByICD}
                                    findDiseaseByName={this.props.findDiseaseByName}
                                    diseases={this.props.diseases}
                                    diseaseSearchError={this.props.diseaseSearchError}

                                    addDiagnosedDiseasesForAVisit={this.props.addDiagnosedDiseasesForAVisit}
                                    getAllDiagnosedDiseasesPerVisit={this.props.getAllDiagnosedDiseasesPerVisit}
                                    diagnosedDiseasesPerVisit={this.props.diagnosedDiseasesPerVisit}
                                    closeLabTestForm={this.props.closeLabTestForm} />
                            </div>

                            <div role="tabpanel" className="tab-pane fade in" id="LabTests">
                                <div className="row">

                                    <div className={this.props.labTestFormDisplay ? "col-md-5" : "col-md-1"} >
                                        {this.props.labTestFormDisplay ?
                                            <LabTestEditForm
                                                updateLabMedical={this.props.updateLabMedical}
                                                visitLogID={this.props.visitLogID}
                                                resetProblem={this.props.resetProblem}
                                                closeLabTestForm={this.props.closeLabTestForm}
                                                editLabMedical={this.props.editLabMedical}
                                                updateLabMedical={this.props.updateLabMedical} />
                                            : null}
                                    </div>
                                    <div className={this.props.labTestFormDisplay ? "col-md-7" : "col-md-11"} >
                                        <LabTestForm
                                            visitLogID={this.props.visitLogID}
                                            labTestsPerVisit={this.props.labTestsPerVisit}
                                            addLabTestsForAVisit={this.props.addLabTestsForAVisit}
                                            savedLabTests={this.props.savedLabTests}
                                            getAllLabTestPerVisit={this.props.getAllLabTestPerVisit}
                                            saveLabTestsState={this.props.saveLabTestsState}
                                            getLabTest={this.props.getLabTest}
                                            findEditLabMedicalByID={this.props.findEditLabMedicalByID}

                                            medicalServices={this.props.medicalServices}
                                            medicalServiceSearchError={this.props.medicalServiceSearchError}

                                            fetchMedicalServices={this.props.fetchMedicalServices}
                                            findMedicalServiceByID={this.props.findMedicalServiceByID}
                                            findMedicalServiceByName={this.props.findMedicalServiceByName}
                                            openLabTestEditForm={this.props.openLabTestEditForm}
                                            closeLabTestForm={this.props.closeLabTestForm} />
                                    </div>
                                </div>
                            </div>

                            <div role="tabpanel" className="tab-pane fade in" id="Prescriptions">
                                <PrescriptionsForm
                                    visitLogID={this.props.visitLogID}

                                    drugSearchError={this.props.drugSearchError}
                                    drugs={this.props.drugs}
                                    fetchDrugs={this.props.fetchDrugs}

                                    findDrugByID={this.props.findDrugByID}
                                    findDrugByName={this.props.findDrugByName}

                                    prescriptionsPerVisit={this.props.prescriptionsPerVisit}
                                    addPrescriptionsForAVisit={this.props.addPrescriptionsForAVisit}
                                    getAllPrescriptionsPerVisit={this.props.getAllPrescriptionsPerVisit}

                                    savedPrescriptions={this.props.savedPrescriptions}
                                    getPrescription={this.props.getPrescription}
                                    savePrescriptionsState={this.props.savePrescriptionsState}
                                    resetPrescription={this.props.resetPrescription} />

                            </div>
                        </div>
                    </div>

                    : null}
            </div>
        )
    }
}