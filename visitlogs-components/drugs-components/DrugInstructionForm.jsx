import React from 'react';

export default class DrugInstructionForm extends React.Component {
    constructor() {
        super();
        this.state = {
            prescribedDrugs: [],
            error_message: "",
            prescriptions: [],
            savedPreviousPrescriptions: []
        }
    }

    componentDidMount() {
        this.props.getPrescription();

        var newList = []
        for (var i = 0; i < this.props.prescribedDrugs.length; i++) {
            var additionalProperties = {};
            additionalProperties["quantity"] = "";
            additionalProperties["dose"] = "";
            additionalProperties["howToUse"] = "";
            var newPrescribedDrug = Object.assign({}, this.props.prescribedDrugs[i], additionalProperties);
            newList.push(newPrescribedDrug);
        }
        this.setState({ prescribedDrugs: newList })
    }

    componentWillReceiveProps(props) {
        var newList = []
        for (var i = 0; i < props.prescribedDrugs.length; i++) {
            var additionalProperties = {};
            additionalProperties["quantity"] = "";
            additionalProperties["dose"] = "";
            additionalProperties["howToUse"] = "";
            var newPrescribedDrug = Object.assign({}, this.props.prescribedDrugs[i], additionalProperties);
            newList.push(newPrescribedDrug);
        }
        this.setState({ prescribedDrugs: newList });
    }

    handleChange(e, index) {
        let changes = {};
        changes[e.target.name] = e.target.value;
        var currentState = this.state;

        var newPrescribedDrug = Object.assign({}, this.state.prescribedDrugs[index], changes);
        currentState.prescribedDrugs[index] = newPrescribedDrug;

        this.setState(currentState);

    }

    handleReset(e) {
        e.preventDefault();
        var currentState = this.state;
        for (var i = 0; i < currentState.prescribedDrugs.length; i++) {
            currentState.prescribedDrugs[i].quantity = "";
            currentState.prescribedDrugs[i].dose = "";
            currentState.prescribedDrugs[i].howToUse = "";
        }
        this.setState(currentState);
    }

    handleSave(e) {
        e.preventDefault();
        var valid = true;
        for (var i = 0; i < this.state.prescribedDrugs.length; i++) {
            if (this.state.prescribedDrugs[i].quantity === "") {
                this.setState({ error_message: "Quantity should not be empty." });
                valid = false;
                break;
            } else if (isNaN(this.state.prescribedDrugs[i].quantity)) {
                this.setState({ error_message: "ID should be a number." });
                valid = false;
                break
            }
        }

        if (valid) {
            e.preventDefault();
            var currentState = this.state;
            let singlePrescription = {}
            singlePrescription["prescribedDrugs"] = this.state.prescribedDrugs;
            currentState.prescriptions.push(singlePrescription);
            currentState.prescribedDrugs = [];
            this.setState(currentState);

            var finalPrescriptions = [...this.props.savedPrescriptions, ...currentState.prescriptions]
            this.props.addPrescriptionsForAVisit(finalPrescriptions, this.props.visitLogID);

            this.props.handleFinishDrugSelection(e, true);
        }
    }

    handleContinue(e) {
        e.preventDefault();
        var valid = true;
        for (var i = 0; i < this.state.prescribedDrugs.length; i++) {
            if (this.state.prescribedDrugs[i].quantity === "") {
                this.setState({ error_message: "Quantity should not be empty." });
                valid = false;
                break;
            } else if (isNaN(this.state.prescribedDrugs[i].quantity)) {
                this.setState({ error_message: "ID should be a number." });
                valid = false;
                break
            }
        }

        if (valid) {
            e.preventDefault();
            var currentState = this.state;
            let singlePrescription = {}
            singlePrescription["prescribedDrugs"] = this.state.prescribedDrugs;
            this.props.savePrescriptionsState(singlePrescription);
            currentState.prescriptions.push(singlePrescription);
            currentState.prescribedDrugs = [];
            this.setState(currentState);
            this.props.handleFinishDrugSelection(e, false);
            this.props.getPrescription();
        }
    }

    render() {
        return (
            <div>
                {this.state.prescribedDrugs.length > 0 ?
                    <div className="card panel-border">
                        <div className="card-header text-center">
                            <strong>Instructions</strong>
                        </div>

                        <div className="card-body">
                            <div>

                                {this.state.prescribedDrugs.map((pd, index) =>
                                    <div key={index}>
                                        <h4><strong>{pd.drug.drugName}</strong></h4>

                                        <div className="form-group">
                                            <label>Quantity:</label>
                                            <input type="text" name="quantity" className="form-control"
                                                value={this.state.prescribedDrugs[index].quantity} onChange={(e) => this.handleChange(e, index)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Dose:</label>
                                            <input type="text" name="dose" className="form-control"
                                                value={this.state.prescribedDrugs[index].dose} onChange={(e) => this.handleChange(e, index)} />
                                        </div>
                                        <div className="form-group">
                                            <label>How To Use:</label>
                                            <input type="text" name="howToUse" className="form-control"
                                                value={this.state.prescribedDrugs[index].howToUse} onChange={(e) => this.handleChange(e, index)} />
                                        </div>
                                        <hr />
                                    </div>

                                )}

                                <div>
                                    {this.state.error_message !== "" ?
                                        <div style={{ color: "red" }}>
                                            <i><strong>Warning!</strong> {this.state.error_message}</i>
                                        </div> : null}
                                </div>

                                <button className="btn btn-form float-right ml-2 mt-10 mb-10" onClick={this.handleSave.bind(this)} > Save & Submit </button>
                                <button className="btn btn-form float-right ml-2 mt-10 mb-10" onClick={this.handleContinue.bind(this)} > Done & Create Another Prescription </button>
                                <button className='btn btn-form float-right ml-2 mt-10 mb-10' onClick={this.handleReset.bind(this)}> Reset </button>
                            </div>
                        </div>
                    </div>
                    : null}

            </div>
        )
    }
}