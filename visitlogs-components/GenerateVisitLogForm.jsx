import React from 'react';

export default class GenerateVisitLogForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visitDate: "",
            visitTime: "",

            newPatient: "true",
            newPatientName: "",
            newPatientGender: "",
            newPatientDob: "",
            newPatientAddress: "",


            existingPatient: { id: "" },
            isSelectionDisabled: false,
            keyword: "",
            error_keyword: "",
            error_time: "",
            error_date: "",
        }
    }

    componentWillReceiveProps(props) {
        if (props.visitLogID !== "") {
            this.props.history.push(`/visitlogform/${props.visitLogID}`);
        }
    }

    handleChange(e) {
        let changes = {};
        changes[e.target.name] = e.target.value;
        this.setState(changes);
    }

    checkValid() {
        var hour, minute;
        if (this.state.visitDate === "") {
            this.setState({ error_date: "Date must not be empty" });
            return false
        } else {
            this.setState({error_date: ""})
        }

        if (this.state.visitTime === "") {
            this.setState({ error_time: "Time must not be empty" });
            return false
        } else {
            this.setState({error_time: ""})
        }

        if (this.state.visitTime.length === 5 && this.state.visitTime[2] === ":") {
            hour = parseInt(this.state.visitTime.substring(0, 2));
            minute = parseInt(this.state.visitTime.substring(3, 5));

            if (isNaN(hour) || hour > 23 || hour < 0) {
                this.setState({ error_time: "Hour should be between 0 and 23" })
                return false;
            }

            if (isNaN(minute) || minute > 59 || minute < 0) {
                this.setState({ error_time: "Minute should be between 0 and 59" })
                return false;
            }

            this.setState({ error_time: "" })
            return true;

        } else {
            this.setState({ error_time: "Time should be in format 'hh:mm'" })
            return false;
        }
    }


    handleSearchPatient(e) {
        if (this.state.keyword === "") {
            e.preventDefault();
            this.setState({ error_keyword: "Input cannot be empty" });

        } else {
            if (isNaN(this.state.keyword)) {
                e.preventDefault();
                this.setState({ error_keyword: "ID should be a number." });

            } else {
                e.preventDefault();
                this.setState({ error_keyword: "" });
                this.props.findPatientByID(this.state.keyword);
            }
        }
    }

    handlePatientSelect(patientID) {
        let existingPatient = Object.assign({}, this.state.existingPatient);
        existingPatient.id = parseInt(patientID)
        this.setState({ existingPatient: existingPatient, isSelectionDisabled: true });
    }

    handlePatientUnSelect() {
        let existingPatient = Object.assign({}, this.state.existingPatient);
        existingPatient.id = ""
        this.setState({ existingPatient: existingPatient, isSelectionDisabled: false });
    }

    handleSave(e) {
        e.preventDefault();
        if (this.checkValid() && this.state.newPatient === "true") {
            this.props.createNewVisitLogWithNewPatient({
                visitDate: this.state.visitDate,
                visitTime: this.state.visitTime,
                patient: {
                    name: this.state.newPatientName,
                    gender: this.state.newPatientGender,
                    dob: this.state.newPatientDob,
                    address: this.state.newPatientAddress
                }
            });
            this.handleResetForm(e);
        } else if (this.checkValid() && this.state.newPatient == "false") {
            this.props.createNewVisitLogWithExistingPatient({
                visitDate: this.state.visitDate,
                visitTime: this.state.visitTime,
                patient: this.state.existingPatient
            });
            this.handleResetForm(e);
        }
    }

    handleResetForm(e) {
        e.preventDefault();
        if (this.state.newPatient === "true") {
            this.setState({
                visitDate: "",
                visitTime: "",
                newPatientName: "",
                newPatientGender: "",
                newPatientDob: "",
                newPatientAddress: ""
            })
        } else if (this.state.newPatient === "false") {
            this.setState({
                visitDate: "",
                visitTime: "",
                keyword: ""
            })
        }
    }

    handleReturnSelection(e) {
        e.preventDefault();
        this.props.history.push("/visitlogform")
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <button className="btn btn-default btn-return mb-20" onClick={(e) => this.handleReturnSelection(e)}>
                        <i className="fas fa-angle-double-left"></i> Return to Selection
                </button>
                    <div className="card panel-border">
                        <div className="card-body">
                            <div className="mb-30">
                                <div className='form-group'>
                                    <h3 className="mb-20">Patient Information</h3>
                                    <div className='form-check inline'>
                                        <span className="mr-40">
                                            <label className='form-check-label'>
                                                <input className='form-check-input' type='radio' name='newPatient' value="true"
                                                    defaultChecked onChange={this.handleChange.bind(this)} />
                                                <span></span> New Patient
                                    </label>
                                        </span>
                                        <label className='form-check-label'>
                                            <input className='form-check-input' type='radio' name='newPatient' value="false"
                                                onChange={this.handleChange.bind(this)} />
                                            <span></span> Existing Patient
    
                                    </label>

                                    </div>
                                </div>

                                {this.state.newPatient === "true" ?
                                    //New Patient Form
                                    <div>
                                        <div className="form-group">
                                            <label><strong>Name:</strong></label>
                                            <input type="text" name="newPatientName" className="form-control"
                                                placeholder="Patient Name"
                                                value={this.state.newPatientName} onChange={this.handleChange.bind(this)} />
                                        </div>
                                        <div className='form-group'>
                                            <label><strong>Gender:</strong></label>
                                            <div className='form-check inline'>
                                                <span className="mr-40">
                                                    <label className='form-check-label'>
                                                        <input className='form-check-input' type='radio' name='newPatientGender' value='Male'
                                                            checked={this.state.newPatientGender === 'Male'} onChange={this.handleChange.bind(this)} />
                                                        <span></span> Male
                                            </label>
                                                </span>
                                                <label className='form-check-label'>
                                                    <input className='form-check-input' type='radio' name='newPatientGender' value='Female'
                                                        checked={this.state.newPatientGender === 'Female'} onChange={this.handleChange.bind(this)} />
                                                    <span></span> Female
                                                        </label>

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label><strong>Birthdate:</strong></label>
                                            <input type="date" name="newPatientDob" className="form-control"
                                                min="1899-01-01" max="2018-12-31"
                                                value={this.state.newPatientDob} onChange={this.handleChange.bind(this)} />
                                        </div>

                                        <div className="form-group">
                                            <label><strong>Address:</strong></label>
                                            <input type="text" name="newPatientAddress" className="form-control" placeholder="Patient Address"
                                                value={this.state.newPatientAddress} onChange={this.handleChange.bind(this)} />
                                        </div>

                                    </div>

                                    :
                                    //Existing Patient
                                    <div>
                                        <div>
                                            <div className="form-group form-inline">
                                                <label className="mr-2"><strong>Enter Patient ID:</strong></label>
                                                <input type="text" name="keyword" className="form-control mr-2"
                                                    placeholder="Patient ID"
                                                    value={this.state.keyword} onChange={this.handleChange.bind(this)} />

                                                <button type="button" className="btn btn-default btn-searchpatient inline" disabled={this.state.isSelectionDisabled}
                                                    onClick={this.handleSearchPatient.bind(this)}>
                                                    <i className="fas fa-search"></i>
                                                </button>
                                            </div>
                                            <div>
                                                {this.state.isSelectionDisabled === true ? <div style={{ color: "black" }}>
                                                    <i><strong>***Note:</strong> To find another patient, please unselect the current patient.</i>
                                                </div> : null}
                                                {this.state.error_keyword !== "" ?
                                                    <div style={{ color: "red" }}>
                                                        <i><strong>Warning!</strong> {this.state.error_keyword}</i>
                                                    </div> : null}
                                                {this.props.patientSearchError !== "" ?
                                                    <div style={{ color: "red" }}>
                                                        <i><strong>Warning!</strong> {this.props.patientSearchError}</i>
                                                    </div> : null}
                                            </div>

                                        </div>

                                        {this.props.searchAPatient !== "" && this.props.patientSearchError === "" && this.state.error_keyword === "" ?
                                            <div className="table table-responsive">
                                                <table className="table table-striped table-hover">
                                                    <thead className="table-header">
                                                        <tr>
                                                            <th className="text-center">ID</th>
                                                            <th className="text-center">Name</th>
                                                            <th className="text-center">Gender</th>
                                                            <th className="text-center">DOB</th>
                                                            <th className="text-center">Address</th>
                                                            <th></th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="text-center">
                                                            <td>{this.props.searchAPatient.id}</td>
                                                            <td>{this.props.searchAPatient.name}</td>
                                                            <td>{this.props.searchAPatient.gender}</td>
                                                            <td>{this.props.searchAPatient.dob !== undefined && this.props.searchAPatient.dob !== null ? `${this.props.searchAPatient.dob.substring(8, 10)}-${this.props.searchAPatient.dob.substring(5, 7)}-${this.props.searchAPatient.dob.substring(0, 4)}` : null}</td>
                                                            <td>{this.props.searchAPatient.address}</td>
                                                            <td>
                                                                <button className="btn btn-danger" disabled={!this.state.isSelectionDisabled}
                                                                    onClick={() => this.handlePatientUnSelect()}>
                                                                    <span className="fas fa-undo"></span> Unselect
                                                    </button>
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-success" disabled={this.state.isSelectionDisabled}
                                                                    onClick={() => this.handlePatientSelect(this.props.searchAPatient.id)}>
                                                                    <span className="fas fa-check"></span> Select
                                                    </button>
                                                            </td>
                                                        </tr>

                                                    </tbody>

                                                </table>
                                            </div>
                                            : null}
                                    </div>


                                }
                            </div>
                            <hr />

                            <div className="form-group">
                                <h3>Date & Time</h3>
                                <label><strong>Visit Date:</strong></label>
                                {this.state.error_date !== "" ?
                                    <div style={{ color: "red" }}>
                                        <i><strong>Warning!</strong> {this.state.error_date}</i>
                                    </div> : null}
                                <input type="date" name="visitDate" className="form-control"
                                    min="2018-01-01" max="2018-12-31"
                                    value={this.state.visitDate} onChange={this.handleChange.bind(this)} />
                            </div>

                            <div className="form-group">
                                <label><strong>Visit Time:</strong></label>
                                {this.state.error_time !== "" ?
                                    <div style={{ color: "red" }}>
                                        <i><strong>Warning!</strong> {this.state.error_time}</i>
                                    </div> : null}
                                <input type="text" name="visitTime" className="form-control" placeholder="hh:mm"
                                    value={this.state.visitTime} onChange={this.handleChange.bind(this)} />
                            </div>

                            <button className="btn btn-form float-right ml-2 mt-10 mb-10" onClick={this.handleSave.bind(this)} > Initialize Visit Log </button>
                            <button className="btn btn-form float-right ml-2 mt-10 mb-10" onClick={this.handleResetForm.bind(this)} > Reset Form </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-1"></div>
            </div>
        )
    }
}