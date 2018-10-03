import React from 'react';


export default class PatientAddButtonAndSearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            keyword: "",
            searchName: "Search By",
            error_message: "",
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ error_message: props.patientSearchError })
    }

    handleChange(e) {
        let changes = {};
        changes[e.target.name] = e.target.value;
        this.setState(changes);
    }

    onAddPatient() {
        this.props.toggleForm();
        this.props.resetPatient();
    }

    handleSearchIDTitle() {
        this.setState({ searchName: "Patient ID" })
    }

    handleSearchNameTitle() {
        this.setState({ searchName: "Patient Name" })
    }

    handleSearchDOBTitle() {
        this.setState({ searchName: "Patient Birthdate" })
    }

    handleSearchPatient(e) {
        if (this.state.keyword === "") {
            e.preventDefault();
            this.setState({ error_message: "Input cannot be empty" });
        } else {
            e.preventDefault();
            if (this.state.searchName === "Patient Name") {
                e.preventDefault();
                this.props.findPatientByName(this.state.keyword);

            } else if (this.state.searchName === "Patient ID") {
                if (isNaN(this.state.keyword)) {
                    e.preventDefault();
                    this.setState({ error_message: "ID should be a number." })
                } else {
                    e.preventDefault();
                    this.props.findPatientByID(this.state.keyword);
                }

            } else if (this.state.searchName === "Patient Birthdate") {
                var dobCheck = this.state.keyword;
                if (dobCheck.length == 10
                    && !(isNaN(dobCheck.substring(0, 2)))
                    && !(isNaN(dobCheck.substring(3, 5)))
                    && !(isNaN(dobCheck.substring(6, 10)))
                    && ((dobCheck[2] == "-" && dobCheck[5] == "-") || (dobCheck[2] == "/" && dobCheck[5] == "/"))) {
                    e.preventDefault();
                    var year = this.state.keyword.substring(6, 10);
                    var month = this.state.keyword.substring(3, 5);
                    var day = this.state.keyword.substring(0, 2);

                    var dob = `${year}-${month}-${day}`;
                    this.props.findPatientByDOB(dob);
                } else {
                    e.preventDefault();
                    this.setState({ error_message: "Birthdate should be in format 'dd-mm-yyyy' or 'dd/mm/yyyy." })
                }
            } else if (this.state.searchName === "Search By") {
                e.preventDefault();
                this.setState({ error_message: "Select Search Type" })
            }
        }
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.error_message !== "" ?
                        <div style={{ color: "red" }} className="float-right">
                            <i><strong>Warning!</strong> {this.state.error_message}</i>
                        </div> : null}
                    <br clear="all" />
                </div>
                <div>
                    <form className="form-inline mb-10">
                        <div className="form-group mr-2">
                            <button type="button" className="btn btn-add" onClick={() => this.onAddPatient()}>
                                <span className="fas fa-user-plus"></span> <strong>Add</strong>
                            </button>
                        </div>


                        <div className="form-group mr-2">
                            <button type="button" className="btn btn-default btn-viewall" onClick={() => this.props.fetchPatients()}>
                                View All
                            </button>
                        </div>

                        <div className="form-group mr-2 float-right">
                            <div className="dropdown">
                                <button className="btn btn-default dropdown-toggle btn-searchpatient" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.state.searchName}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a role="button" className="dropdown-item" onClick={this.handleSearchIDTitle.bind(this)}> Patient ID </a>
                                    <div className="dropdown-divider"></div>
                                    <a role="button" className="dropdown-item" onClick={this.handleSearchNameTitle.bind(this)}> Patient Name </a>
                                    <div className="dropdown-divider"></div>
                                    <a role="button" className="dropdown-item" onClick={this.handleSearchDOBTitle.bind(this)}> Patient Birthdate </a>
                                </div>
                            </div>
                        </div>

                        <div className="form-group float-right mr-2">
                            <input type="text" name="keyword" className="form-control"
                                placeholder={this.state.searchName === "Patient Birthdate" ? "dd-mm-yyy or dd/mm/yyyy" : "Type keyword"}
                                value={this.state.keyword} onChange={this.handleChange.bind(this)} />
                        </div>

                        <button className="btn btn-default btn-searchpatient float-right"
                            onClick={this.handleSearchPatient.bind(this)}>
                            <i className="fas fa-search"></i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }

}