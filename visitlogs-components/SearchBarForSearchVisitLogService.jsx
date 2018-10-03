import React from 'react';

export default class SearchBarForSearchVisitLogService extends React.Component {
    constructor() {
        super();
        this.state = {
            keyword: "",
            searchName: "Search By",
            error_message: "",
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ error_message: props.visitLogSearchError })
    }

    handleChange(e) {
        let changes = {};
        changes[e.target.name] = e.target.value;
        this.setState(changes);
    }


    handleSearchIDTitle() {
        this.setState({ searchName: "Visit Log ID" })
    }

    handleSearchByPatientIDTitle() {
        this.setState({ searchName: "Patient ID" })
    }

    handleSearchDateTitle() {
        this.setState({ searchName: "Visit Log Date" })
    }

    handleSearchVisitLog(e) {
        if (this.state.keyword === "") {
            e.preventDefault();
            this.setState({ error_message: "Input cannot be empty" });
        } else {
            e.preventDefault();
            this.setState({ error_message: "" });
            if (this.state.searchName === "Visit Log ID") {
                if (isNaN(this.state.keyword)) {
                    e.preventDefault();
                    this.setState({ error_message: "Visit Log ID should be a number." })
                } else {
                    e.preventDefault();
                    this.setState({ error_message: "" });
                    this.props.findVisitLogByID(this.state.keyword);
                }
            } else if (this.state.searchName === "Patient ID") {
                if (isNaN(this.state.keyword)) {
                    e.preventDefault();
                    this.setState({ error_message: "ID should be a number." })
                } else {
                    e.preventDefault();
                    this.setState({ error_message: "" });
                    this.props.findVisitLogByPatientID(this.state.keyword);
                }

            } else if (this.state.searchName === "Visit Log Date") {
                var visitDateCheck = this.state.keyword;
                if (visitDateCheck.length == 10
                    && !(isNaN(visitDateCheck.substring(0, 2)))
                    && !(isNaN(visitDateCheck.substring(3, 5)))
                    && !(isNaN(visitDateCheck.substring(6, 10)))
                    && ((visitDateCheck[2] == "-" && visitDateCheck[5] == "-") || (visitDateCheck[2] == "/" && visitDateCheck[5] == "/"))) {
                    e.preventDefault();
                    var year = this.state.keyword.substring(6, 10);
                    var month = this.state.keyword.substring(3, 5);
                    var day = this.state.keyword.substring(0, 2);

                    var visitDate = `${year}-${month}-${day}`;
                    this.props.findVisitLogByDate(visitDate);
                    this.setState({ error_message: "" });
                } else {
                    e.preventDefault();
                    this.setState({ error_message: "Date should be in format 'dd-mm-yyyy' or 'dd/mm/yyyy." })
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
                        <div style={{ color: "red" }}>
                            <i><strong>Warning!</strong> {this.state.error_message}</i>
                        </div> : null}
                    <br clear="all" />
                </div>
                <div>
                    <form className="form-inline">
                        <div className="form-group mr-2">
                            <button type="button" className="btn btn-default btn-viewall mr-2" onClick={() => this.props.fetchVisitLogs()}>
                                View All
                                </button>
                            <div className="form-group mr-2">
                                <div className="dropdown">
                                    <button type="button" className="btn btn-default btn-visitLogForm dropdown-toggle" data-toggle="dropdown">
                                        {this.state.searchName}
                                    </button>
                                    <ul className="dropdown-menu" role="menu">
                                        <a role="button" className="dropdown-item" onClick={this.handleSearchIDTitle.bind(this)}> Visit Log ID </a>
                                        <div className="dropdown-divider"></div>
                                        <a role="button" className="dropdown-item" onClick={this.handleSearchByPatientIDTitle.bind(this)}> Patient ID </a>
                                        <div className="dropdown-divider"></div>
                                        <a role="button" className="dropdown-item" onClick={this.handleSearchDateTitle.bind(this)}> Visit Log Date </a>
                                    </ul>

                                </div>
                            </div>
                            <div className="form-group">
                                <input type="text" name="keyword" className="form-control"
                                    placeholder={this.state.searchName === "Visit Log Date" ? "dd-mm-yyy or dd/mm/yyyy" : "Type keyword"}
                                    value={this.state.keyword} onChange={this.handleChange.bind(this)} />
                            </div>

                            <button className="btn btn-default btn-searchpatient ml-2"
                                onClick={this.handleSearchVisitLog.bind(this)}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}