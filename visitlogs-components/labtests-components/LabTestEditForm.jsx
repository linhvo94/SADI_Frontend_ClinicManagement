import React from 'react';

export default class LabTestEditForm extends React.Component {
    constructor() {
        super();
        this.state = {
            id: "",
            result: "",
            medicalService: "",
            error_message: ""
        }
    }

    componentWillReceiveProps(props) {
        var currentState = this.state;
        currentState.id = props.editLabMedical.id;
        currentState.medicalService = props.editLabMedical.medicalService;
        if (props.editLabMedical.result === null) {
            currentState.result = ""
        } else {
            currentState.result = props.editLabMedical.result
        }
        this.setState(currentState);
    }

    handleChange(e) {
        let changes = {};
        changes[e.target.name] = e.target.value;
        this.setState(changes);

    }


    handleUpdate(e) {
        e.preventDefault();
        if (this.state.result === "" || this.state.result === undefined) {
            this.setState({ error_message: "Result cannot be empty." });
        } else {
            e.preventDefault()
            this.props.updateLabMedical({
                id: this.state.id,
                result: this.state.result,
                medicalService: this.state.medicalService
            }, this.props.visitLogID);
            this.setState({ id: "", result: "", medicalService: "" });
            this.props.closeLabTestForm();
        }
    }

    handleReset(e) {
        e.preventDefault();
        this.setState({ result: "" });
    }

    render() {
        return (
            <div className="card panel-border">
                <div className="card-header text-center">
                    <strong>Edit Lab Test</strong>
                    <button className="float-right btn-closeForm" onClick={this.props.closeLabTestForm.bind(this)}><i className='fa fa-times text-white'></i></button>
                </div>

                <div className="card-body">
                    <div className="form-group">
                        <label>ID:</label>
                        <input type="text" name="id" className="form-control" readOnly
                            value={this.state.id} />
                    </div>

                    <div className="form-group">
                        <label>Result</label>
                        {this.state.error_message !== "" ?
                            <div className="alert alert-warning">
                                <strong>Warning!</strong> {this.state.error_message}
                            </div> : null}

                        <input type="text" name="result" className="form-control"
                            value={this.state.result} onChange={this.handleChange.bind(this)} />
                    </div>

                    <button className="btn btn-form float-right ml-2" onClick={this.handleUpdate.bind(this)} > Update </button>
                    <button className='btn btn-form float-right' onClick={this.handleReset.bind(this)}> Reset Form </button>

                </div>

            </div>
        )
    }
}