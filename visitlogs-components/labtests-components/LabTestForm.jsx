import React from 'react';
import MedicalServiceSearchBar from '../medicalservices-components/MedicalServiceSearchBar.jsx';
import MedicalServiceSearchList from '../medicalservices-components/MedicalServiceSearchList.jsx';


export default class LabTestForm extends React.Component {
    constructor() {
        super();
        this.state = {
            labTestsPerVisit: []
        }
    }

    componentDidMount() {
        if (this.props.visitLogID !== "") {
            this.props.getAllLabTestPerVisit(this.props.visitLogID);
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ labTestsPerVisit: props.labTestsPerVisit });
    }

    handleEdit(e, labMedicalID) {
        e.preventDefault;
        this.props.findEditLabMedicalByID(labMedicalID);
        this.props.openLabTestEditForm();
    }

    render() {
        return (
            <div>
                <h3>Lab Tests</h3>
                {this.state.labTestsPerVisit.length === 0 ?
                    <div>

                        <MedicalServiceSearchBar
                            medicalServiceSearchError={this.props.medicalServiceSearchError}
                            fetchMedicalServices={this.props.fetchMedicalServices}
                            findMedicalServiceByID={this.props.findMedicalServiceByID}
                            findMedicalServiceByName={this.props.findMedicalServiceByName} />

                        <MedicalServiceSearchList
                            visitLogID={this.props.visitLogID}
                            fetchMedicalServices={this.props.fetchMedicalServices}
                            getLabTest={this.props.getLabTest}
                            addLabTestsForAVisit={this.props.addLabTestsForAVisit}
                            saveLabTestsState={this.props.saveLabTestsState}
                            savedLabTests={this.props.savedLabTests}
                            medicalServices={this.props.medicalServices} />

                    </div>

                    :
                    <div>
                        {this.props.labTestsPerVisit.map((lt, i) =>
                            <div className="table table-responsive" key={i}>
                                <table className="table table-striped table-hover">
                                    <thead className="table-header">
                                        <tr>
                                            <th className="text-center">Date</th>
                                            <th className="text-center">Time</th>
                                            <th className="text-center">Medical Service Name</th>
                                            <th className="text-center">Result</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lt.labMedicals.map((lm, index) =>
                                            <tr className="text-center" key={index}>
                                                <td>
                                                    {lt.date !== null ?
                                                        `${lt.date.substring(8, 10)}-${lt.date.substring(5, 7)}-${lt.date.substring(0, 4)}`
                                                        : null}
                                                </td>
                                                <td>{lt.time}</td>
                                                <td>{lm.medicalService.name}</td>
                                                <td>{lm.result}</td>
                                                <td>
                                                    <button type="button" className="btn btn-default"
                                                        onClick={(e) => this.handleEdit(e, lm.id)}>
                                                        <span className="far fa-edit"></span> Edit
                                                    </button>

                                                </td>

                                            </tr>)}
                                    </tbody>

                                </table>
                            </div>
                        )}
                    </div>

                }
            </div>
        )
    }
}

