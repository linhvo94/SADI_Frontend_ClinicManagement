import React from 'react';

export default class PatientForm extends React.Component {
    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            gender: "",
            dob: "",
            address: "",
            error_name: "",
            error_gender: "",
            error_dob: "",
            error_address: "",
        }
    }

    componentWillReceiveProps(props) {
        this.setState({id: props.editPatient.id,
             name: props.editPatient.name, 
             gender: props.editPatient.gender,
             dob: props.editPatient.dob,
             address: props.editPatient.address
        });
    }

    handleChange(e) {
        let changes = {};
        changes[e.target.name] = e.target.value;
        this.setState(changes);
    }

    checkValid() {
        var valid = true;
        if (this.state.name === "" || this.state.name === undefined) {
            this.setState({ error_name: "Name cannot be empty." });
            valid = false;

        } else { this.setState({ error_name: "" }) }

        if (this.state.gender === "" || this.state.gender === undefined) {
            this.setState({ error_gender: "Gender cannot be empty." })
            valid = false;
        } else { this.setState({ error_gender: "" }) }

        if (this.state.dob === "" || this.state.dob === undefined) {
            this.setState({ error_dob: "Birthdate cannot be empty." })
            valid = false;

        } else { this.setState({ error_dob: "" }) }

        if (this.state.address === "" || this.state.address === undefined) {
            this.setState({ error_address: "Address cannot be empty." })
            valid = false;
        } else { this.setState({ error_address: "" }) }

        return valid;
    }

    handleSave(e) {
        e.preventDefault();
        if (this.state.id === "" || this.state.id === undefined) {
            var valid = this.checkValid();

            if (valid) {
                this.props.addPatient({ name: this.state.name, gender: this.state.gender, dob: this.state.dob, address: this.state.address });
                this.props.resetPatient();
                this.props.closeForm();
            }
        } else {
            e.preventDefault();
            var valid = this.checkValid();
            if (valid) {
                this.props.updatePatient({ id: this.state.id, name: this.state.name, gender: this.state.gender, dob: this.state.dob, address: this.state.address });
                this.props.resetPatient();
                this.props.closeForm();
            }
        }
    }

    handleReset(e) {
        e.preventDefault();
        this.props.resetPatient();

    }

    render() {
        return (
            <div className="card panel-border">
                <div className="card-header card-header text-center">
                    {!this.state.id ? <strong>Add Patient</strong> : <strong>Edit Patient</strong>}
                    <button className="float-right btn-closeForm" onClick={this.props.closeForm.bind(this)}><i className='fa fa-times text-white'></i></button>
                </div>

                <div className="card-body">
                    {this.state.id !== "" ?
                        <div className="form-group">
                            <label><strong>ID:</strong></label>
                            <input type="text" name="id" className="form-control" readOnly
                                placeholder="Patient ID"
                                value={this.state.id} />

                        </div> : null}

                    <div className="form-group">
                        <label><strong>Name:</strong></label>
                        {this.state.error_name !== "" ? <div style={{ color: "red" }}>
                            <i><strong>Warning!</strong> {this.state.error_name}</i>
                        </div> : null}

                        <input type="text" name="name" className="form-control"
                            placeholder="Patient Name"
                            value={this.state.name} onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className='form-group'>
                        <label><strong>Gender:</strong></label>
                        {this.state.error_gender !== "" ? <div style={{ color: "red" }}>
                            <i><strong>Warning!</strong> {this.state.error_gender}</i>
                        </div> : null}

                        <div className='form-check inline'>
                            <span className="mr-40">
                                <label className='form-check-label'>
                                    <input className='form-check-input' type='radio' name='gender' value='Male'
                                        checked={this.state.gender === 'Male'} required onChange={this.handleChange.bind(this)} />
                                    <span></span> Male
                            </label>
                            </span>
                            <span>
                                <label className='form-check-label'>
                                    <input className='form-check-input' type='radio' name='gender' value='Female'
                                        checked={this.state.gender === 'Female'} onChange={this.handleChange.bind(this)} />
                                    <span></span> Female
                            </label>
                            </span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label><strong>Birthdate:</strong></label>
                        {this.state.error_dob !== "" ?
                            <div style={{ color: "red" }}>
                                <strong>Warning!</strong> {this.state.error_dob}
                            </div> : null}
                        <input type="date" name="dob" className="form-control"
                            min="1899-01-01" max="2018-12-31"
                            value={this.state.dob} onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="form-group">
                        <label><strong>Address:</strong></label>
                        {this.state.error_address !== "" ?
                            <div style={{ color: "red" }}>
                                <strong>Warning!</strong> {this.state.error_address}
                            </div> : null}
                        <input type="text" name="address" className="form-control" placeholder="Patient Address"
                            value={this.state.address} onChange={this.handleChange.bind(this)} />
                    </div>

                    <button className="btn btn-form float-right ml-3" onClick={this.handleSave.bind(this)} > Save </button>
                    <button className='btn btn-form float-right' onClick={this.handleReset.bind(this)}> Reset Form </button>

                </div>

            </div>
        )
    }
}