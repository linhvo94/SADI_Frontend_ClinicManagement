import React from 'react';
import DrugSearchBar from '../drugs-components/DrugSearchBar.jsx';
import DrugSearchList from '../drugs-components/DrugSearchList.jsx';

export default class PrescriptionsForm extends React.Component {
    constructor() {
        super();
        this.state = {
            prescriptionsPerVisit: []
        }
    }

    componentDidMount() {
        if (this.props.visitLogID !== "") {
            this.props.getAllPrescriptionsPerVisit(this.props.visitLogID);
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ prescriptionsPerVisit: props.prescriptionsPerVisit });
    }

    render() {
        return (
            <div>
                <h3>Prescription Form</h3>
                {this.state.prescriptionsPerVisit.length === 0 ?
                    <div>
                        <DrugSearchBar
                            drugSearchError={this.props.drugSearchError}
                            fetchDrugs={this.props.fetchDrugs}
                            findDrugByID={this.props.findDrugByID}
                            findDrugByName={this.props.findDrugByName} />

                        <DrugSearchList
                            visitLogID={this.props.visitLogID}
                            fetchDrugs={this.props.fetchDrugs}
                            drugs={this.props.drugs}
                            addPrescriptionsForAVisit={this.props.addPrescriptionsForAVisit}
                            getPrescription={this.props.getPrescription}
                            savedPrescriptions={this.props.savedPrescriptions}
                            savePrescriptionsState={this.props.savePrescriptionsState} 
                            resetPrescription={this.props.resetPrescription} />
                    </div>
                    :
                    <div>
                        {this.props.prescriptionsPerVisit.map((p, i) =>
                            <div className="table table-responsive" key={i}>
                                <table className="table table-striped table-hover">
                                    <thead className="table-header">
                                        <tr>
                                            <th className="text-center">ID</th>
                                            <th className="text-center">Drug Name</th>
                                            <th className="text-center">Quantity</th>
                                            <th className="text-center">Dose</th>
                                            <th className="text-center">How to Use</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {p.prescribedDrugs.map((pd, index) =>
                                            <tr className="text-center" key={index}>
                                                <td>{pd.id}</td>
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

                }
            </div>
        )
    }
}