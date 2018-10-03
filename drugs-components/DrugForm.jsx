import React from 'react';

export default class DrugForm extends React.Component {
    constructor() {
        super();
        this.state = {
            id: "",
            drugName: "",
            error_name: ""
        }
    }

    componentWillReceiveProps(props) {
        this.setState({id: props.editDrug.id, drugName: props.editDrug.drugName});
    }

    handleChange(e) {
        let changes = {};
        changes[e.target.name] = e.target.value;
        this.setState(changes);
    }

    checkValid() {
        var valid = true;
        if (this.state.drugName === "" || this.state.drugName === undefined) {
            this.setState({ error_name: "Drug name cannot be empty." });
            valid = false;

        } else { this.setState({ error_name: "" }) }

        return valid;
    }

    handleSave(e) {
        e.preventDefault();
        if (this.state.id === "" || this.state.id === undefined) {
            var valid = this.checkValid();

            if (valid) {
                this.props.addDrug({ drugName: this.state.drugName });
                this.props.resetDrug();
                this.props.closeForm();
            }
        } else {
            e.preventDefault();
            var valid = this.checkValid();
            if (valid) {
                this.props.updateDrug({ id: this.state.id, drugName: this.state.drugName });
                this.props.resetDrug();
                this.props.closeForm();
            }
        }
    }

    handleReset(e) {
        e.preventDefault();
        this.props.resetDrug();

    }

    render() {
        return (
            <div className="card panel-border">
                <div className="card-header text-center">
                    {!this.state.id ? <strong>Add Drug</strong> : <strong>Edit Drug</strong>}
                    <button className="float-right btn-closeForm" onClick={this.props.closeForm.bind(this)}><i className='fa fa-times text-white'></i></button>
                </div>

                <div className="card-body">
                    {this.state.id !== "" ?
                        <div className="form-group">
                            <label>ID:</label>
                            <input type="text" name="id" className="form-control" readOnly
                                placeholder="Drug ID"
                                value={this.state.id} />

                        </div> : null}

                    <div className="form-group">
                        <label><strong>Drug Name:</strong></label>
                        {this.state.error_name !== "" ? <div style={{ color: "red" }}>
                            <i><strong>Warning!</strong> {this.state.error_name}</i>
                        </div> : null}

                        <input type="text" name="drugName" className="form-control"
                            placeholder="Drug Name"
                            value={this.state.drugName} onChange={this.handleChange.bind(this)} />
                    </div>

                    <button className="btn btn-form float-right ml-2" onClick={this.handleSave.bind(this)} > Save </button>
                    <button className='btn btn-form float-right' onClick={this.handleReset.bind(this)}> Reset Form </button>

                </div>

            </div>
        )
    }
}