import React from 'react';

export default class VisitLogDetail extends React.Component {
    componentWillMount() {
        if (this.props.visitLogID !== "") {
            this.props.findVisitLogForDetailPage(this.props.visitLogID);
        }
    }

    componentWillReceiveProps(props) {
        if (props.visitLogDetail === "") {
            this.props.history.push("/visitlogdetail/");
        }
    }

    handleReturnSelection(e) {
        e.preventDefault();
        this.props.history.push("/searchvisitlogservice");
    }

    render() {
        return (
            <div>
                <button className="btn btn-default btn-return mb-20" onClick={(e) => this.handleReturnSelection(e)}>
                    <i className="fas fa-angle-double-left"></i> Return to Visit Log Search Service
                </button>
                <div className="row">
                    <div className="col-md-4">
                        <div className="panel-group">
                            <div className="panel panel-border detail-group">
                                <div className="card-header"><strong>Patient Information</strong></div>
                                <div className="panel-body">
                                    {this.props.visitLogDetail.patient !== undefined ?
                                        <div>
                                            <p><strong> ID: </strong>
                                                {this.props.visitLogDetail.patient.id !== undefined ? this.props.visitLogDetail.patient.id : "No record"}
                                            </p>
                                            <p><strong> Name: </strong>
                                                {this.props.visitLogDetail.patient.name !== undefined ? this.props.visitLogDetail.patient.name : "No record"}
                                            </p>
                                            <p><strong> Gender: </strong>
                                                {this.props.visitLogDetail.patient.gender !== undefined ? this.props.visitLogDetail.patient.gender : "No record"}
                                            </p>
                                            <p><strong> Birthdate: </strong>
                                                {this.props.visitLogDetail.patient.dob !== undefined && this.props.visitLogDetail.patient.dob !== "" ?
                                                    `${this.props.visitLogDetail.patient.dob.substring(8, 10)}-${this.props.visitLogDetail.patient.dob.substring(5, 7)}-${this.props.visitLogDetail.patient.dob.substring(0, 4)}`
                                                    : "No record"}
                                            </p>
                                        </div>
                                        : "No record"}
                                </div>
                            </div>
                            <div className="panel panel-border detail-group">
                                <div className="card-header"><strong>Visit Date & Time</strong></div>
                                <div className="panel-body">
                                    <p><strong>Visit Date: </strong>
                                        {this.props.visitLogDetail.visitDate !== undefined && this.props.visitLogDetail.visitDate !== null ?
                                            `${this.props.visitLogDetail.visitDate.substring(8, 10)}-${this.props.visitLogDetail.visitDate.substring(5, 7)}-${this.props.visitLogDetail.visitDate.substring(0, 4)}`
                                            : "No record"}</p>
                                    <p><strong>Visit Time: </strong>
                                        {this.props.visitLogDetail.visitTime !== undefined && this.props.visitLogDetail.visitTime !== null ?
                                            this.props.visitLogDetail.visitTime : "No record"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="panel-group">
                            <div className="panel panel-border detail-group">
                                <div className="card-header"><strong>Problems</strong></div>
                                <div className="panel-body">
                                    {this.props.visitLogDetail.problems == undefined ? "No record" :
                                        this.props.visitLogDetail.problems.length === 0 ? "No record" :

                                            this.props.visitLogDetail.problems.map((p, index) =>
                                                <p key={index}><strong>Problem {index + 1}: </strong> {p.problem}</p>)}
                                </div>
                            </div>

                            <div className="panel panel-border detail-group">
                                <div className="card-header"><strong>Diagnosed Diseases</strong></div>
                                <div className="panel-body">
                                    {this.props.visitLogDetail.diagnosedDiseases == undefined ? "No record" :
                                        this.props.visitLogDetail.diagnosedDiseases.length === 0 ? "No record" :
                                            <div className="table table-responsive">
                                                <table className="table table-bordered table-hover">
                                                    <thead className="table-header">
                                                        <tr>
                                                            <th>ICD</th>
                                                            <th>Disease Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.props.visitLogDetail.diagnosedDiseases.map((dd, index) =>
                                                            <tr key={index}>
                                                                <td>{dd.disease.icd}</td>
                                                                <td>{dd.disease.diseaseName}</td>
                                                            </tr>)}
                                                    </tbody>

                                                </table>
                                            </div>}
                                </div>
                            </div>

                            <div className="panel panel-border detail-group">
                                <div className="card-header"><strong>Prescriptions</strong></div>
                                <div className="panel-body">
                                    {this.props.visitLogDetail.prescriptions == undefined ? "No record" :
                                        this.props.visitLogDetail.prescriptions.length === 0 ? "No record" :
                                            this.props.visitLogDetail.prescriptions.map((p, i) =>
                                                <div className="table table-responsive" key={i}>
                                                    <table className="table table-bordered table-hover">
                                                        <thead className="table-header">
                                                            <tr>
                                                                <th>Drug Name</th>
                                                                <th>Quantity</th>
                                                                <th>Dose</th>
                                                                <th>How to Use</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {p.prescribedDrugs.map((pd, index) =>
                                                                <tr key={index}>
                                                                    <td>{pd.drug.drugName}</td>
                                                                    <td>{pd.quantity}</td>
                                                                    <td>{pd.dose}</td>
                                                                    <td>{pd.howToUse}</td>
                                                                </tr>)}
                                                        </tbody>

                                                    </table>
                                                </div>
                                            )}
                                </div>
                            </div>

                            <div className="panel panel-border detail-group">
                                <div className="card-header"><strong>Lab Tests</strong></div>
                                <div className="panel-body">
                                    {this.props.visitLogDetail.labTests == undefined ? "No record" :
                                        this.props.visitLogDetail.labTests.length === 0 ? "No record" :
                                            this.props.visitLogDetail.labTests.map((lt, i) =>
                                                <div className="table table-responsive" key={i}>
                                                    <table className="table table-bordered table-hover">
                                                        <thead className="table-header">
                                                            <tr>
                                                                <th>Date</th>
                                                                <th>Time</th>
                                                                <th>Medical Service Name</th>
                                                                <th>Result</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {lt.labMedicals.map((lm, index) =>
                                                                <tr key={index}>
                                                                    <td>
                                                                        {lt.date !== null ?
                                                                            `${lt.date.substring(8, 10)}-${lt.date.substring(5, 7)}-${lt.date.substring(0, 4)}`
                                                                            : null}
                                                                    </td>
                                                                    <td>{lt.time}</td>
                                                                    <td>{lm.medicalService.name}</td>
                                                                    <td>{lm.result}</td>
                                                                </tr>)}
                                                        </tbody>

                                                    </table>
                                                </div>
                                            )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        )
    }
}