import React from 'react';



export default class MedicalServiceSearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            keyword: "",
            searchName: "Search Medical Service By",
            error_message: "",
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ error_message: props.medicalServiceSearchError })
    }

    handleChange(e) {
        let changes = {};
        changes[e.target.name] = e.target.value;
        this.setState(changes);
    }


    handleSearchMedicalServiceID() {
        this.setState({ searchName: "Medical Service ID" })
    }

    handleSearchMedicalServiceName() {
        this.setState({ searchName: "Medical Service Name" })
    }


    handleSearchMedicalService(e) {
        if (this.state.keyword === "") {
            e.preventDefault();
            this.setState({ error_message: "Input cannot be empty" });
        } else {
            e.preventDefault();
            this.setState({ error_message: "" });
            if (this.state.searchName === "Medical Service Name") {
                e.preventDefault();
                this.setState({ error_message: "" });
                this.props.findMedicalServiceByName(this.state.keyword);
            } else if (this.state.searchName === "Medical Service ID") {
                if (isNaN(this.state.keyword)) {
                    e.preventDefault();
                    this.setState({ error_message: "ID should be a number." })
                } else {
                    e.preventDefault();
                    this.setState({ error_message: "" });
                    this.props.findMedicalServiceByID(this.state.keyword);
                }
            } else if (this.state.searchName === "Search Medical Service By") {
                e.preventDefault();
                this.setState({ error_message: "Select Search Type" })
            }
        }

    }

    render() {
        return (
            <div>
                <div>
                    <form className="form-inline mb-3">
                        <div className="form-group mr-3">
                            <div className="dropdown">
                                <button type="button" className="btn btn-default btn-searchmedicalservice dropdown-toggle" data-toggle="dropdown">
                                    {this.state.searchName}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><a role="button" className="dropdown-item" onClick={this.handleSearchMedicalServiceID.bind(this)}>  Medical Service ID </a></li>
                                    <div className="dropdown-divider"></div>
                                    <li><a role="button" className="dropdown-item" onClick={this.handleSearchMedicalServiceName.bind(this)}> Medical Service Name </a></li>
                                </ul>
                            </div>
                            <button type="button" className="btn btn-default btn-viewall ml-2" onClick={() => this.props.fetchMedicalServices()}>
                                View All
                                </button>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <input type="text" name="keyword" className="form-control"
                                    value={this.state.keyword} onChange={this.handleChange.bind(this)} />
                                <span className="input-group-btn">
                                    <button className="btn btn-default btn-searchpatient ml-2"
                                        onClick={this.handleSearchMedicalService.bind(this)}>
                                        <i className="fas fa-search"></i>
                                    </button>
                                </span>
                            </div>
                            <div>
                            </div>
                        </div>
                    </form>
                    {this.state.error_message !== "" ?
                        <div style={{ color: "red" }}>
                            <i><strong>Warning!</strong> {this.state.error_message}</i>
                        </div> : null}
                </div>
            </div>
        )
    }

}