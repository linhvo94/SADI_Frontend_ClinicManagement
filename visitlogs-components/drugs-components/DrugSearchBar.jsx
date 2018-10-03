import React from 'react';


export default class DrugSearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            keyword: "",
            searchName: "Search Drug By",
            error_message: "",
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ error_message: props.drugSearchError })
    }

    handleChange(e) {
        let changes = {};
        changes[e.target.name] = e.target.value;
        this.setState(changes);
    }


    handleSearchDrugID() {
        this.setState({ searchName: "Drug ID" })
    }

    handleSearchDrugName() {
        this.setState({ searchName: "Drug Name" })
    }


    handleSearchDrug(e) {
        if (this.state.keyword === "") {
            e.preventDefault();
            this.setState({ error_message: "Input cannot be empty" });
        } else {
            e.preventDefault();
            this.setState({ error_message: "" });
            if (this.state.searchName === "Drug Name") {
                e.preventDefault();
                this.setState({ error_message: "" });
                this.props.findDrugByName(this.state.keyword);
            } else if (this.state.searchName === "Drug ID") {
                if (isNaN(this.state.keyword)) {
                    e.preventDefault();
                    this.setState({ error_message: "ID should be a number." })
                } else {
                    e.preventDefault();
                    this.setState({ error_message: "" });
                    this.props.findDrugByID(this.state.keyword);
                }
            } else if (this.state.searchName === "Search Drug By") {
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
                                <button type="button" className="btn btn-default btn-searchdisease dropdown-toggle" data-toggle="dropdown">
                                    {this.state.searchName}
                                </button>
                                <ul className="dropdown-menu" role="menu">
                                    <li><a role="button" className="dropdown-item" onClick={this.handleSearchDrugID.bind(this)}>  Drug ID </a></li>
                                    <div className="dropdown-divider"></div>
                                    <li><a role="button" className="dropdown-item" onClick={this.handleSearchDrugName.bind(this)}> Drug Name </a></li>

                                </ul>
                            </div>
                            <button type="button" className="btn btn-default btn-viewall ml-2" onClick={() => this.props.fetchDrugs()}>
                                View All
                                </button>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <input type="text" name="keyword" className="form-control"
                                    value={this.state.keyword} onChange={this.handleChange.bind(this)} />
                                <span className="input-group-btn">
                                    <button className="btn btn-default btn-searchpatient ml-2"
                                        onClick={this.handleSearchDrug.bind(this)}>
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